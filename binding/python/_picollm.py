#
# Copyright 2024 Picovoice Inc.
#
# You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
# file accompanying this source.
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
#

import os

from ctypes import (
    cdll,
    CFUNCTYPE,
    POINTER,
    RTLD_LOCAL,
    Structure,
    byref,
    c_bool,
    c_char_p,
    c_float,
    c_int32,
    c_void_p,
)
from dataclasses import dataclass
from enum import Enum
from typing import (
    Any,
    Callable,
    Dict,
    Optional,
    Sequence,
    Set,
    Type,
    Union,
)


class Dialog(object):
    """
    Dialog is a helper class that stores a chat dialog and formats it according to an instruction-tuned LLM's chat
    template. Dialog is the base class. Each supported instruction-tuned LLM has an accompanying concrete subclass.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        """
        Constructor.

        :param history: History refers to the number of latest back-and-forths to include in the prompt. Setting history
        to `None` will embed the entire dialog in the prompt.
        :param system: System instruction to embed in the prompt for configuring the model's responses.
        """

        if history is not None and history < 0:
            raise ValueError("History should be either `None` or a non-negative integer.")

        self._history = history
        self._system = system

        self._human = list()
        self._llm = list()

    def add_human_request(self, content: str) -> None:
        """
        Adds human's request to the dialog.

        :param content: Human's request.
        """

        if len(self._human) > len(self._llm):
            raise RuntimeError("Entering a human request without entering the last LLM response is invalid.")

        self._human.append(content)

    def add_llm_response(self, content: str) -> None:
        """
        Adds LLM's response to the dialog.

        :param content: LLM's response.
        """

        if len(self._human) == len(self._llm):
            raise RuntimeError("Entering an LLM response without entering the human request is invalid.")

        self._llm.append(content)

    def prompt(self) -> str:
        """
        Creates a prompt string given parameters passed the constructor and dialog's content.

        :return: Formatted prompt.
        """

        raise NotImplementedError()


class GemmaChatDialog(Dialog):
    """
    Dialog helper for `gemma-2b-it` and `gemma-7b-it`.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(history=history, system=system)

    def prompt(self) -> str:
        if len(self._human) == len(self._llm):
            raise RuntimeError("Cannot create a prompt without an outstanding human request")

        human = self._human if self._history is None else self._human[-(self._history + 1):]
        llm = (list() if self._history == 0 else self._llm[-self._history:]) if self._history is not None else self._llm

        res = list()
        for h, l in zip(human, llm):
            res.append(f"<start_of_turn>user\n{h}<end_of_turn>\n")
            res.append(f"<start_of_turn>model\n{l}<end_of_turn>\n")
        res.append(f"<start_of_turn>user\n{human[-1]}<end_of_turn>\n<start_of_turn>model")

        return ''.join(res)


class Llama2ChatDialog(Dialog):
    """
    Dialog helper for `llama-2-7b-chat`, `llama-2-13b-chat`, and `llama-2-70b-chat`.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(history=history, system=system)

    def prompt(self) -> str:
        if len(self._human) == len(self._llm):
            raise RuntimeError("Cannot create a prompt without an outstanding human request")

        human = self._human if self._history is None else self._human[-(self._history + 1):]
        llm = (list() if self._history == 0 else self._llm[-self._history:]) if self._history is not None else self._llm

        res = list()
        for i, (user_message, assistant_message) in enumerate(zip(human, llm)):
            instruction = user_message.strip()
            if self._system is not None and i == 0:
                instruction = f"<<SYS>>\n{self._system.strip()}\n<</SYS>>\n\n{instruction}"

            res.append(f"<s>[INST] {instruction} [/INST] {assistant_message.strip()} </s>")

        instruction = human[-1].strip()
        if self._system is not None and len(human) == 1:
            instruction = f"<<SYS>>\n{self._system.strip()}\n<</SYS>>\n\n{instruction}"
        res.append(f"<s>[INST] {instruction} [/INST]")

        return ''.join(res)


class Llama3ChatDialog(Dialog):
    """
    Dialog helper for `llama-3-8b-instruct` and `llama-3-70b-instruct`.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(history=history, system=system)

    def prompt(self) -> str:
        if len(self._human) == len(self._llm):
            raise RuntimeError("Cannot create a prompt without an outstanding human request")

        human = self._human if self._history is None else self._human[-(self._history + 1):]
        llm = (list() if self._history == 0 else self._llm[-self._history:]) if self._history is not None else self._llm

        res = ["<|begin_of_text|>"]
        for h, l in zip(human, llm):
            res.append(f"<|start_header_id|>user<|end_header_id|>\n\n{h.strip()}<|eot_id|>")
            res.append(f"<|start_header_id|>assistant<|end_header_id|>\n\n{l.strip()}<|eot_id|>")
        res.append(f"<|start_header_id|>user<|end_header_id|>\n\n{human[-1].strip()}<|eot_id|>")
        res.append("<|start_header_id|>assistant<|end_header_id|>\n\n")

        return ''.join(res)


class MistralChatDialog(Dialog):
    """
    Dialog helper for `mistral-7b-instruct-v0.1` and `mistral-7b-instruct-v0.2`.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(history=history, system=system)

    def prompt(self) -> str:
        if len(self._human) == len(self._llm):
            raise RuntimeError("Cannot create a prompt without an outstanding human request")

        human = self._human if self._history is None else self._human[-(self._history + 1):]
        llm = (list() if self._history == 0 else self._llm[-self._history:]) if self._history is not None else self._llm

        res = list()
        for prompt, answer in zip(human, llm):
            res.append(f"[INST] {prompt} [/INST] {answer}</s>")
        res.append(f"[INST] {human[-1]} [/INST]")

        return ''.join(res)


class MixtralChatDialog(MistralChatDialog):
    """
    Dialog helper for `mixtral-8x7b-instruct-v0.1`.
    """
    pass


class Phi2Dialog(Dialog):
    """
    Dialog helper for `phi-2`. This is a base class, use one of the mode-specific subclasses.
    """

    def __init__(
            self,
            human_tag: str,
            llm_tag: str,
            history: Optional[int] = None,
            system: Optional[str] = None) -> None:
        super().__init__(history=history, system=system)

        self._ht = human_tag
        self._lt = llm_tag

    def prompt(self) -> str:
        if len(self._human) == len(self._llm):
            raise RuntimeError("Cannot create a prompt without an outstanding human request")

        human = self._human if self._history is None else self._human[-(self._history + 1):]
        llm = (list() if self._history == 0 else self._llm[-self._history:]) if self._history is not None else self._llm
        ht = self._ht
        lt = self._lt

        return ''.join([f"{ht}: {h}\n{lt}: {l}\n" for h, l in zip(human, llm)]) + f"{ht}: {human[-1]}\n{lt}:"


class Phi2QADialog(Phi2Dialog):
    """
    Dialog helper for `phi-2` `qa` mode.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(human_tag='Instruct', llm_tag='Output', history=history, system=system)


class Phi2ChatDialog(Phi2Dialog):
    """
    Dialog helper for `phi-2` `chat` mode.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(human_tag='Human', llm_tag='AI', history=history, system=system)


class Phi3Dialog(Dialog):
    """
    Dialog helper for `phi3`.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(history=history, system=system)

    def prompt(self) -> str:
        if len(self._human) == len(self._llm):
            raise RuntimeError("Cannot create a prompt without an outstanding human request")

        human = self._human if self._history is None else self._human[-(self._history + 1):]
        llm = (list() if self._history == 0 else self._llm[-self._history:]) if self._history is not None else self._llm

        res = list()
        if self._system is not None:
            res.append(f"<|system|>\n{self._system}<|end|>\n")

        for h, l in zip(human, llm):
            res.append(f"<|user|>\n{h.strip()}<|end|>\n")
            res.append(f"<|assistant|>\n{l.strip()}<|end|>\n")
        res.append(f"<|user|>\n{human[-1].strip()}<|end|>\n")
        res.append("<|assistant|>\n")

        return ''.join(res)


class Phi35Dialog(Phi3Dialog):
    """
    Dialog helper for `phi3.5`.
    """

    def __init__(self, history: Optional[int] = None, system: Optional[str] = None) -> None:
        super().__init__(history=history, system=system)


class PicoLLMError(Exception):
    def __init__(self, message: str = '', message_stack: Optional[Sequence[str]] = None) -> None:
        super().__init__(message)

        self._message = message
        self._message_stack = list() if message_stack is None else message_stack

    def __str__(self) -> str:
        message = self._message
        if len(self._message_stack) > 0:
            message += ':'
            for i in range(len(self._message_stack)):
                message += '\n  [%d] %s' % (i, self._message_stack[i])
        return message

    @property
    def message(self) -> str:
        return self._message

    @property
    def message_stack(self) -> Sequence[str]:
        return self._message_stack


class PicoLLMMemoryError(PicoLLMError):
    pass


class PicoLLMIOError(PicoLLMError):
    pass


class PicoLLMInvalidArgumentError(PicoLLMError):
    pass


class PicoLLMStopIterationError(PicoLLMError):
    pass


class PicoLLMKeyError(PicoLLMError):
    pass


class PicoLLMInvalidStateError(PicoLLMError):
    pass


class PicoLLMRuntimeError(PicoLLMError):
    pass


class PicoLLMActivationError(PicoLLMError):
    pass


class PicoLLMActivationLimitError(PicoLLMError):
    pass


class PicoLLMActivationThrottledError(PicoLLMError):
    pass


class PicoLLMActivationRefusedError(PicoLLMError):
    pass


@dataclass
class PicoLLMUsage:
    """Usage information."""

    """Number of tokens in the prompt."""
    prompt_tokens: int
    """Number of tokens in the completion."""
    completion_tokens: int

    def __str__(self) -> str:
        return f"""usage: {{
    prompt: {self.prompt_tokens},
    completion: {self.completion_tokens},
}}"""


class PicoLLMEndpoints(Enum):
    """Reasons for ending the generation process."""

    END_OF_SENTENCE = 0
    COMPLETION_TOKEN_LIMIT_REACHED = 1
    STOP_PHRASE_ENCOUNTERED = 2
    INTERRUPTED = 3

    def __str__(self) -> str:
        return {
            self.END_OF_SENTENCE: 'END_OF_SENTENCE',
            self.COMPLETION_TOKEN_LIMIT_REACHED: 'COMPLETION_TOKEN_LIMIT_REACHED',
            self.STOP_PHRASE_ENCOUNTERED: 'STOP_PHRASE_ENCOUNTERED',
            self.INTERRUPTED: 'INTERRUPTED',
        }[self]


@dataclass
class PicoLLMToken:
    """Generated token and its log probability."""

    """Token."""
    token: str
    """Log probability."""
    log_prob: float


@dataclass
class PicoLLMCompletionToken:
    """Generated token within completion and top alternative tokens."""

    """Token."""
    token: PicoLLMToken
    """Top choices."""
    top_choices: Sequence[PicoLLMToken]

    def __str__(self) -> str:
        if len(self.top_choices) == 0:
            return f"""{{
    token: {repr(self.token.token)},
    log-prob: {self.token.log_prob:.2f},
}}"""
        else:
            tcs = list()
            for x in self.top_choices:
                tc = f"""        {{
            token: {repr(x.token)},
            log-prob: {x.log_prob:.2f},
        }}"""
                tcs.append(tc)
            tcs = ',\n'.join(tcs)

            return f"""{{
    token: {repr(self.token.token)},
    log-prob: {self.token.log_prob:.2f},
    top-choices: [
{tcs}
    ]
}}"""


@dataclass
class PicoLLMCompletion:
    """LLM completion result."""

    """Usage information."""
    usage: PicoLLMUsage
    """Reason for ending the generation process."""
    endpoint: PicoLLMEndpoints
    """Generated tokens within completion and top alternative tokens."""
    completion_tokens: Sequence[PicoLLMCompletionToken]
    """Completion string."""
    completion: str

    def __str__(self) -> str:
        def shift_right(s: str, n: int) -> str:
            space = ' ' * n
            return '\n'.join(f'{space}{x}' for x in s.split('\n'))

        cts = ',\n'.join('\n'.join(f"        {x}" for x in str(ct).split('\n')) for ct in self.completion_tokens)

        return f"""{{
{shift_right(str(self.usage), 4)},
    endpoint: {str(self.endpoint)},
    completion-tokens: [
{cts}
    ],
    completion: {repr(self.completion)}
}}"""


class CPicoLLMToken(Structure):
    _fields_ = [
        ("token", c_char_p),
        ("log_prob", c_float),
    ]


class PicoLLM(object):
    """
    Python binding for picoLLM inference engine.
    """

    class PicovoiceStatuses(Enum):
        SUCCESS = 0
        OUT_OF_MEMORY = 1
        IO_ERROR = 2
        INVALID_ARGUMENT = 3
        STOP_ITERATION = 4
        KEY_ERROR = 5
        INVALID_STATE = 6
        RUNTIME_ERROR = 7
        ACTIVATION_ERROR = 8
        ACTIVATION_LIMIT_REACHED = 9
        ACTIVATION_THROTTLED = 10
        ACTIVATION_REFUSED = 11

    PICOVOICE_STATUS_TO_EXCEPTION = {
        PicovoiceStatuses.OUT_OF_MEMORY: PicoLLMMemoryError,
        PicovoiceStatuses.IO_ERROR: PicoLLMIOError,
        PicovoiceStatuses.INVALID_ARGUMENT: PicoLLMInvalidArgumentError,
        PicovoiceStatuses.STOP_ITERATION: PicoLLMStopIterationError,
        PicovoiceStatuses.KEY_ERROR: PicoLLMKeyError,
        PicovoiceStatuses.INVALID_STATE: PicoLLMInvalidStateError,
        PicovoiceStatuses.RUNTIME_ERROR: PicoLLMRuntimeError,
        PicovoiceStatuses.ACTIVATION_ERROR: PicoLLMActivationError,
        PicovoiceStatuses.ACTIVATION_LIMIT_REACHED: PicoLLMActivationLimitError,
        PicovoiceStatuses.ACTIVATION_THROTTLED: PicoLLMActivationThrottledError,
        PicovoiceStatuses.ACTIVATION_REFUSED: PicoLLMActivationRefusedError
    }

    class CPicoLLM(Structure):
        pass

    class CPicoLLMUsage(Structure):
        _fields_ = [
            ("prompt_tokens", c_int32),
            ("completion_tokens", c_int32),
        ]

    class CPicoLLMCompletionToken(Structure):
        _fields_ = [
            ("token", CPicoLLMToken),
            ("num_top_choices", c_int32),
            ("top_choices", POINTER(CPicoLLMToken))
        ]

    def __init__(
            self,
            access_key: str,
            model_path: str,
            device: str,
            library_path: str) -> None:
        """
        Constructor.

        :param access_key: AccessKey obtained from Picovoice Console (https://console.picovoice.ai/)
        :param model_path: Absolute path to the file containing LLM parameters.
        :param device: String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`,
        picoLLM picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device. To
        select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index of the
        target GPU. If set to `cpu`, the engine will run on the CPU with the default number of threads. To specify the
        number of threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of
        threads.
        :param library_path: Absolute path to picoLLM's dynamic library.
        """

        dll_dir_obj = None
        if hasattr(os, "add_dll_directory"):
            dll_dir_obj = os.add_dll_directory(os.path.dirname(library_path))

        library = cdll.LoadLibrary(library_path)

        if dll_dir_obj is not None:
            dll_dir_obj.close()

        set_sdk_func = library.pv_set_sdk
        set_sdk_func.argtypes = [c_char_p]
        set_sdk_func.restype = None

        set_sdk_func('python'.encode())

        self._get_error_stack_func = library.pv_get_error_stack
        self._get_error_stack_func.argtypes = [POINTER(POINTER(c_char_p)), POINTER(c_int32)]
        self._get_error_stack_func.restype = self.PicovoiceStatuses

        self._free_error_stack_func = library.pv_free_error_stack
        self._free_error_stack_func.argtypes = [POINTER(c_char_p)]
        self._free_error_stack_func.restype = None

        init_func = library.pv_picollm_init
        init_func.argtypes = [
            c_char_p,
            c_char_p,
            c_char_p,
            POINTER(POINTER(self.CPicoLLM))
        ]
        init_func.restype = self.PicovoiceStatuses

        self._handle = POINTER(self.CPicoLLM)()
        status = init_func(
            access_key.encode(),
            model_path.encode(),
            device.encode(),
            byref(self._handle))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message='`pv_picollm_init` failed.',
                message_stack=self.get_error_stack()
            )

        self._delete_func = library.pv_picollm_delete
        self._delete_func.argtypes = [
            POINTER(self.CPicoLLM)
        ]
        self._delete_func.restype = None

        self._generate_func = library.pv_picollm_generate
        self._generate_func.argtypes = [
            POINTER(self.CPicoLLM),
            c_char_p,
            c_int32,
            POINTER(c_char_p),
            c_int32,
            c_int32,
            c_float,
            c_float,
            c_float,
            c_float,
            c_int32,
            CFUNCTYPE(None, c_char_p, c_void_p),
            c_void_p,
            POINTER(self.CPicoLLMUsage),
            POINTER(c_int32),
            POINTER(POINTER(self.CPicoLLMCompletionToken)),
            POINTER(c_int32),
            POINTER(c_char_p),
        ]
        self._generate_func.restype = self.PicovoiceStatuses

        self._interrupt_func = library.pv_picollm_interrupt
        self._interrupt_func.argtypes = [
            POINTER(self.CPicoLLM),
        ]
        self._interrupt_func.restype = self.PicovoiceStatuses

        self._delete_completion_tokens_func = library.pv_picollm_delete_completion_tokens
        self._delete_completion_tokens_func.argtypes = [
            POINTER(self.CPicoLLMCompletionToken),
            c_int32,
        ]
        self._delete_completion_tokens_func.restype = None

        self._delete_completion_func = library.pv_picollm_delete_completion
        self._delete_completion_func.argtypes = [
            c_char_p,
        ]
        self._delete_completion_func.restype = None

        self._tokenize_func = library.pv_picollm_tokenize
        self._tokenize_func.argtypes = [
            POINTER(self.CPicoLLM),
            c_char_p,
            c_bool,
            c_bool,
            POINTER(c_int32),
            POINTER(POINTER(c_int32)),
        ]
        self._tokenize_func.restype = self.PicovoiceStatuses

        self._delete_tokens_func = library.pv_picollm_delete_tokens
        self._delete_tokens_func.argtypes = [
            POINTER(c_int32),
        ]
        self._delete_tokens_func.restype = None

        self._forward_func = library.pv_picollm_forward
        self._forward_func.argtypes = [
            POINTER(self.CPicoLLM),
            c_int32,
            POINTER(c_int32),
            POINTER(POINTER(c_float)),
        ]
        self._forward_func.restype = self.PicovoiceStatuses

        self._delete_logits = library.pv_picollm_delete_logits
        self._delete_logits.argtypes = [
            POINTER(c_float),
        ]
        self._delete_logits.restype = None

        self._reset_func = library.pv_picollm_reset
        self._reset_func.argtypes = [
            POINTER(self.CPicoLLM),
        ]
        self._reset_func.restype = self.PicovoiceStatuses

        model_func = library.pv_picollm_model
        model_func.argtypes = [
            POINTER(self.CPicoLLM),
            POINTER(c_char_p),
        ]
        model_func.restype = self.PicovoiceStatuses
        c_model = c_char_p()
        status = model_func(self._handle, byref(c_model))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message='`pv_picollm_model` failed.',
                message_stack=self.get_error_stack()
            )
        self._model = c_model.value.decode('utf-8')

        context_length_func = library.pv_picollm_context_length
        context_length_func.argtypes = [
            POINTER(self.CPicoLLM),
            POINTER(c_int32),
        ]
        context_length_func.restype = self.PicovoiceStatuses

        c_context_length = c_int32()
        status = context_length_func(self._handle, byref(c_context_length))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message='`pv_picollm_context_length` failed.',
                message_stack=self.get_error_stack()
            )
        self._context_length = c_context_length.value

        version_func = library.pv_picollm_version
        version_func.argtypes = []
        version_func.restype = c_char_p
        self._version = version_func().decode('utf-8')

        max_top_choices_func = library.pv_picollm_max_top_choices
        max_top_choices_func.argtypes = []
        max_top_choices_func.restype = c_int32
        self._max_top_choices = max_top_choices_func()

    def generate(
            self,
            prompt: str,
            completion_token_limit: Optional[int] = None,
            stop_phrases: Optional[Set[str]] = None,
            seed: Optional[int] = None,
            presence_penalty: float = 0.,
            frequency_penalty: float = 0.,
            temperature: float = 0.,
            top_p: float = 1.,
            num_top_choices: int = 0,
            stream_callback: Callable[[str], None] = None) -> PicoLLMCompletion:
        """
        Given a text prompt and a set of generation parameters, creates a completion text and relevant metadata.

        :param prompt: Prompt.
        :param completion_token_limit: Maximum number of tokens in the completion. If the generation process stops due
        to reaching this limit, the `.endpoint` parameter in `PicoLLMCompletion` output will be
        `PicoLLMEndpoints.COMPLETION_TOKEN_LIMIT_REACHED`. Set to `None` to impose no limit.
        :param stop_phrases: The generation process stops when it encounters any of these phrases in the completion. The
        already generated completion, including the encountered stop phrase, will be returned. The `endpoint` parameter
        in `PicoLLMCompletion` output will be `PicoLLMEndpoints.STOP_PHRASE_ENCOUNTERED`. Set to `None` to turn off this
        feature.
        :param seed: The internal random number generator uses it as its seed if set to a positive integer value.
        Seeding enforces deterministic outputs. Set to `None` for randomized outputs for a given prompt.
        :param presence_penalty: It penalizes logits already appearing in the partial completion if set to a positive
        value. If set to `0.0`, it has no effect.
        :param frequency_penalty: If set to a positive floating-point value, it penalizes logits proportional to the
        frequency of their appearance in the partial completion. If set to `0.0`, it has no effect.
        :param temperature: Sampling temperature. Temperature is a non-negative floating-point value that controls the
        randomness of the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. In
        contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to `0` selects
        the maximum logit during sampling.
        :param top_p: A positive floating-point number within 0, and 1. It restricts the sampler's choices to
        high-probability logits that form the `top_p` portion of the probability mass. Hence, it avoids randomly
        selecting unlikely logits. A value of `1.` enables the sampler to pick any token with non-zero probability,
        turning off the feature.
        :param num_top_choices: If set to a positive value, picoLLM returns the list of the highest probability tokens
        for any generated token. Set to `0` to turn off the feature. The maximum number of top choices is
        `.max_top_choices`.
        :param stream_callback: If not set to `None`, picoLLM executes this callback every time a new piece of
        completion string becomes available.

        :return: Completion result.
        """

        completion_token_limit = -1 if completion_token_limit is None else completion_token_limit
        stop_phrases = list() if stop_phrases is None else stop_phrases
        seed = -1 if seed is None else seed

        def callback(x: bytes, _: Any) -> None:
            if stream_callback is not None:
                stream_callback(x.decode())

        c_usage = self.CPicoLLMUsage()
        c_endpoint = c_int32()
        c_num_completion_tokens = c_int32()
        c_completion_tokens = POINTER(self.CPicoLLMCompletionToken)()
        c_completion = c_char_p()

        # noinspection PyCallingNonCallable,PyTypeChecker
        status = self._generate_func(
            self._handle,
            prompt.encode(),
            completion_token_limit,
            (c_char_p * len(stop_phrases))(*[x.encode() for x in stop_phrases]) if len(stop_phrases) > 0 else None,
            len(stop_phrases),
            seed,
            presence_penalty,
            frequency_penalty,
            temperature,
            top_p,
            num_top_choices,
            CFUNCTYPE(None, c_char_p, c_void_p)(callback),
            None,
            byref(c_usage),
            byref(c_endpoint),
            byref(c_completion_tokens),
            byref(c_num_completion_tokens),
            byref(c_completion),
        )
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message='`pv_picollm_generate` failed.',
                message_stack=self.get_error_stack()
            )

        usage = PicoLLMUsage(prompt_tokens=c_usage.prompt_tokens, completion_tokens=c_usage.completion_tokens)
        endpoint = PicoLLMEndpoints(c_endpoint.value)
        completion_tokens = list()
        for i in range(c_num_completion_tokens.value):
            c_token = c_completion_tokens[i].token

            try:
                tt = c_token.token.decode('utf-8')
            except UnicodeDecodeError:
                tt_hex = c_token.token.hex().upper()
                tt = ''.join(f"\\x{tt_hex[j:(j + 2)]}" for j in range(0, len(tt_hex), 2))

            token = PicoLLMToken(token=tt, log_prob=c_token.log_prob)

            top_choices = list()
            for j in range(c_completion_tokens[i].num_top_choices):
                c_top_choice = c_completion_tokens[i].top_choices[j]

                try:
                    tt = c_top_choice.token.decode('utf-8')
                except UnicodeDecodeError:
                    tt_hex = c_top_choice.token.hex().upper()
                    tt = ''.join(f"\\x{tt_hex[j:(j + 2)]}" for j in range(0, len(tt_hex), 2))

                top_choice = PicoLLMToken(token=tt, log_prob=c_top_choice.log_prob)
                top_choices.append(top_choice)
            completion_token = PicoLLMCompletionToken(token=token, top_choices=top_choices)
            completion_tokens.append(completion_token)
        completion = c_completion.value.decode('utf-8')

        self._delete_completion_tokens_func(c_completion_tokens, c_num_completion_tokens.value)
        self._delete_completion_func(c_completion)

        return PicoLLMCompletion(
            usage=usage,
            endpoint=endpoint,
            completion_tokens=completion_tokens,
            completion=completion
        )

    def interrupt(self) -> None:
        """
        Interrupts `generate()` if generation is in progress. Otherwise, it has no effect.
        """

        status = self._interrupt_func(self._handle)
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message="`pv_picollm_interrupt` failed.",
                message_stack=self.get_error_stack()
            )

    def tokenize(self, text, bos: bool, eos: bool) -> Sequence[int]:
        """
        Tokenizes a given text using the model's tokenizer. This is a low-level function meant for benchmarking and
        advanced usage. `.generate()` should be used when possible.

        :param text: Text.
        :param bos: If set to `True`, the tokenizer prepends the beginning of the sentence token to the result.
        :param eos: If set to `True`, the tokenizer appends the end of the sentence token to the result.

        :return: Tokens representing the input text.
        """

        c_num_tokens = c_int32()
        c_tokens = POINTER(c_int32)()
        status = self._tokenize_func(
            self._handle,
            text.encode('utf-8'),
            bos,
            eos,
            byref(c_num_tokens),
            byref(c_tokens))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message="`pv_picollm_tokenize` failed.",
                message_stack=self.get_error_stack()
            )

        tokens = [c_tokens[i] for i in range(c_num_tokens.value)]
        self._delete_tokens_func(c_tokens)

        return tokens

    def forward(self, token: int) -> Sequence[float]:
        """
        Performs a single forward pass given a token and returns the logits. This is a low-level function for
        benchmarking and advanced usage. `.generate()` should be used when possible.

        :param token: Input token.
        :return: Logits.
        """

        c_logits = POINTER(c_float)()
        c_num_logits = c_int32()
        status = self._forward_func(
            self._handle,
            token,
            byref(c_num_logits),
            byref(c_logits))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message="`pv_picollm_forward` failed.",
                message_stack=self.get_error_stack()
            )

        logits = [c_logits[i] for i in range(c_num_logits.value)]
        self._delete_logits(c_logits)

        return logits

    def reset(self) -> None:
        """
        Resets the internal state of LLM. It should be called in conjunction with `.forward()` when processing a new
        sequence of tokens. This is a low-level function for benchmarking and advanced usage. `.generate()` should be
        used when possible.
        """

        status = self._reset_func(self._handle)
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](
                message="`pv_picollm_reset` failed.",
                message_stack=self.get_error_stack()
            )

    def release(self) -> None:
        """Releases resources acquired by picoLLM."""

        self._delete_func(self._handle)

    @property
    def model(self) -> str:
        """Getter for model's name."""

        return self._model

    @property
    def context_length(self) -> int:
        """Getter for model's context length."""

        return self._context_length

    @property
    def version(self) -> str:
        """Getter for version."""

        return self._version

    @property
    def max_top_choices(self) -> int:
        """Getter for maximum number of top choices for `.generate()`."""

        return self._max_top_choices

    def get_error_stack(self) -> Sequence[str]:
        message_stack_ref = POINTER(c_char_p)()
        message_stack_depth = c_int32()
        status = self._get_error_stack_func(byref(message_stack_ref), byref(message_stack_depth))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self.PICOVOICE_STATUS_TO_EXCEPTION[status](message='Unable to get picoLLM error state')

        message_stack = list()
        for i in range(message_stack_depth.value):
            message_stack.append(message_stack_ref[i].decode('utf-8'))

        self._free_error_stack_func(message_stack_ref)

        return message_stack

    _DIALOGS: Dict[str, Union[Type[Dialog], Dict[str, Type[Dialog]]]] = {
        'gemma-2b-it': GemmaChatDialog,
        'gemma-7b-it': GemmaChatDialog,
        'llama-2-7b-chat': Llama2ChatDialog,
        'llama-2-13b-chat': Llama2ChatDialog,
        'llama-2-70b-chat': Llama2ChatDialog,
        'llama-3-8b-instruct': Llama3ChatDialog,
        'llama-3-70b-instruct': Llama3ChatDialog,
        'mistral-7b-instruct-v0.1': MistralChatDialog,
        'mistral-7b-instruct-v0.2': MistralChatDialog,
        'mixtral-8x7b-instruct-v0.1': MixtralChatDialog,
        'phi2': {
            'default': Phi2QADialog,
            'qa': Phi2QADialog,
            'chat': Phi2ChatDialog,
        },
        'phi3': Phi3Dialog,
        'phi3.5': Phi35Dialog
    }

    def get_dialog(
            self,
            mode: Optional[str] = None,
            history: Optional[int] = 0,
            system: Optional[str] = None) -> Dialog:
        """
        Return the Dialog object corresponding to the loaded model. The model needs to be instruction-tuned and have a
        specific chat template.

        :param mode: Some models (e.g., `phi-2`) define multiple chat template models. For example, `phi-2` allows both
        `qa` and `chat` templates.
        :param history: History refers to the number of latest back-and-forths to include in the prompt. Setting history
        to `None` will embed the entire dialog in the prompt.
        :param system: System instruction to embed in the prompt for configuring the model's responses.

        :return: Constructed dialog object.
        """

        model = self.model.split()[0].lower()
        if model not in self._DIALOGS:
            raise NotImplementedError(
                f" `{self._model}` does not have a corresponding dialog implementation or is not instruction-tuned")

        if isinstance(self._DIALOGS[model], dict):
            if mode is None:
                if 'default' not in self._DIALOGS[model]:
                    raise ValueError(
                        f"`{self._model}` does require a `mode`. Available modes are: "
                        f"`{', '.join(sorted(self._DIALOGS[model].keys()))}`")
                return self._DIALOGS[model]['default'](history=history, system=system)
            else:
                if mode not in self._DIALOGS[model]:
                    raise ValueError(
                        f"`{self._model}` doesn't have a `{mode}` model. Available modes are: "
                        f"`{', '.join(sorted(self._DIALOGS[model].keys()))}`")
                return self._DIALOGS[model][mode](history=history, system=system)
        else:
            if mode is not None:
                raise ValueError(f"`{self._model}` doesn't accept a `mode` parameter, set it to `None`.")
            return self._DIALOGS[model](history=history, system=system)


__all__ = [
    'Dialog',
    'GemmaChatDialog',
    'Llama2ChatDialog',
    'Llama3ChatDialog',
    'MistralChatDialog',
    'MixtralChatDialog',
    'Phi2ChatDialog',
    'Phi2Dialog',
    'Phi2QADialog',
    'Phi3Dialog',
    'Phi35Dialog',
    'PicoLLM',
    'PicoLLMActivationError',
    'PicoLLMActivationLimitError',
    'PicoLLMActivationRefusedError',
    'PicoLLMActivationThrottledError',
    'PicoLLMCompletion',
    'PicoLLMEndpoints',
    'PicoLLMError',
    'PicoLLMIOError',
    'PicoLLMInvalidArgumentError',
    'PicoLLMInvalidStateError',
    'PicoLLMKeyError',
    'PicoLLMMemoryError',
    'PicoLLMRuntimeError',
    'PicoLLMStopIterationError',
    'PicoLLMUsage',
]
