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
    CFUNCTYPE,
    POINTER,
    Structure,
    byref,
    c_bool,
    c_char_p,
    c_float,
    c_int32,
    cdll,
)
from enum import Enum
from typing import (
    Callable,
    Optional,
    Sequence,
    Set,
)
from dataclasses import dataclass


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


class CPicoLLMToken(Structure):
    _fields_ = [
        ("token", c_char_p),
        ("log_prob", c_float),
    ]


class PicoLLMEndpoints(Enum):
    END_OF_SENTENCE = 0
    COMPLETION_TOKEN_LIMIT_REACHED = 1
    STOP_PHRASE_ENCOUNTERED = 2

    def __str__(self) -> str:
        return {
            self.END_OF_SENTENCE: 'END_OF_SENTENCE',
            self.COMPLETION_TOKEN_LIMIT_REACHED: 'COMPLETION_TOKEN_LIMIT_REACHED',
            self.STOP_PHRASE_ENCOUNTERED: 'STOP_PHRASE_ENCOUNTERED',
        }[self]


@dataclass
class PicoLLMUsage:
    prompt_tokens: int
    completion_tokens: int


@dataclass
class PicoLLMToken:
    token: str
    log_prob: float


@dataclass
class PicoLLMCompletionToken:
    token: PicoLLMToken
    top_choices: Sequence[PicoLLMToken]


@dataclass
class PicoLLMCompletion:
    usage: PicoLLMUsage
    endpoint: PicoLLMEndpoints
    completion_tokens: Sequence[PicoLLMCompletionToken]
    completion: str


class PicoLLM(object):
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

    _PICOVOICE_STATUS_TO_EXCEPTION = {
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
            device_string: str = "cpu:8",
            library_path: Optional[str] = None) -> None:
        if library_path is None:
            library_path = \
                os.path.join(os.path.dirname(__file__), '../../../../build/release/x86_64/src/picollm/libpv_picollm.so')
        library = cdll.LoadLibrary(library_path)

        self._get_error_stack_func = library.pv_get_error_stack
        self._get_error_stack_func.argtypes = [POINTER(POINTER(c_char_p)), POINTER(c_int32)]
        self._get_error_stack_func.restype = self.PicovoiceStatuses

        self._free_error_stack_func = library.pv_free_error_stack
        self._free_error_stack_func.argtypes = [POINTER(c_char_p)]
        self._free_error_stack_func.restype = None

        init_func = library.pv_picollm_init
        init_func.argtypes = [c_char_p, c_char_p, c_char_p, POINTER(POINTER(self.CPicoLLM))]
        init_func.restype = self.PicovoiceStatuses

        self._handle = POINTER(self.CPicoLLM)()
        status = init_func(
            access_key.encode('utf-8'),
            model_path.encode('utf-8'),
            device_string.encode('utf-8'),
            byref(self._handle))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status](
                message='`pv_picollm_init` failed.',
                message_stack=self._get_error_stack_func()
            )

        self._delete_func = library.pv_picollm_delete
        self._delete_func.argtypes = [POINTER(self.CPicoLLM)]
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
            CFUNCTYPE(None, c_char_p),
            POINTER(self.CPicoLLMUsage),
            POINTER(c_int32),
            POINTER(POINTER(self.CPicoLLMCompletionToken)),
            POINTER(c_int32),
            POINTER(c_char_p),
        ]
        self._generate_func.restype = self.PicovoiceStatuses

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
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status]()
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
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status]()
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
        completion_token_limit = -1 if completion_token_limit is None else completion_token_limit
        stop_phrases = list() if stop_phrases is None else stop_phrases
        seed = -1 if seed is None else seed

        def callback(x: bytes) -> None:
            if stream_callback is not None:
                stream_callback(x.decode('utf-8'))

        c_usage = self.CPicoLLMUsage()
        c_endpoint = c_int32()
        c_num_completion_tokens = c_int32()
        c_completion_tokens = POINTER(self.CPicoLLMCompletionToken)()
        c_completion = c_char_p()

        status = self._generate_func(
            self._handle,
            prompt.encode('utf-8'),
            completion_token_limit,
            (c_char_p * len(stop_phrases))(*stop_phrases) if len(stop_phrases) > 0 else None,
            len(stop_phrases),
            seed,
            presence_penalty,
            frequency_penalty,
            temperature,
            top_p,
            num_top_choices,
            CFUNCTYPE(None, c_char_p)(callback),
            byref(c_usage),
            byref(c_endpoint),
            byref(c_completion_tokens),
            byref(c_num_completion_tokens),
            byref(c_completion),
        )
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status](
                message='`pv_picollm_generate` failed.',
                message_stack=self._get_error_stack()
            )

        usage = PicoLLMUsage(prompt_tokens=c_usage.prompt_tokens, completion_tokens=c_usage.completion_tokens)
        endpoint = PicoLLMEndpoints(c_endpoint.value)
        completion_tokens = list()
        for i in range(c_num_completion_tokens.value):
            c_token = c_completion_tokens[i].token
            token = PicoLLMToken(token=c_token.token.decode('utf-8'), log_prob=c_token.log_prob)
            top_choices = list()
            for j in range(c_completion_tokens[i].num_top_choices):
                c_top_choice = c_completion_tokens[i].top_choices[j]
                top_choice = PicoLLMToken(
                    token=c_top_choice.token.decode('utf-8'),
                    log_prob=c_top_choice.log_prob)
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

    def tokenize(self, text, bos: bool, eos: bool) -> Sequence[int]:
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
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status]()

        tokens = [c_tokens[i] for i in range(c_num_tokens.value)]
        self._delete_tokens_func(c_tokens)

        return tokens

    def forward(self, token: int) -> Sequence[float]:
        c_logits = POINTER(c_float)()
        c_num_logits = c_int32()
        status = self._forward_func(
            self._handle,
            token,
            byref(c_num_logits),
            byref(c_logits))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status]()

        logits = [c_logits[i] for i in range(c_num_logits.value)]
        self._delete_logits(c_logits)

        return logits

    def reset(self) -> None:
        status = self._reset_func(self._handle)
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status]()

    def release(self) -> None:
        self._delete_func(self._handle)

    @property
    def model(self) -> str:
        return self._model

    @property
    def context_length(self) -> int:
        return self._context_length

    @property
    def version(self) -> str:
        return self._version

    @property
    def max_top_choices(self) -> int:
        return self._max_top_choices

    def _get_error_stack(self) -> Sequence[str]:
        message_stack_ref = POINTER(c_char_p)()
        message_stack_depth = c_int32()
        status = self._get_error_stack_func(byref(message_stack_ref), byref(message_stack_depth))
        if status is not self.PicovoiceStatuses.SUCCESS:
            raise self._PICOVOICE_STATUS_TO_EXCEPTION[status](message='Unable to get PicoLLM error state')

        message_stack = list()
        for i in range(message_stack_depth.value):
            message_stack.append(message_stack_ref[i].decode('utf-8'))

        self._free_error_stack_func(message_stack_ref)

        return message_stack


__all__ = [
    'PicoLLM',
    'PicoLLMActivationError',
    'PicoLLMActivationLimitError',
    'PicoLLMActivationRefusedError',
    'PicoLLMActivationThrottledError',
    'PicoLLMError',
    'PicoLLMIOError',
    'PicoLLMInvalidArgumentError',
    'PicoLLMInvalidStateError',
    'PicoLLMKeyError',
    'PicoLLMMemoryError',
    'PicoLLMRuntimeError',
    'PicoLLMStopIterationError',
]
