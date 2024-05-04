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

import math
import sys
import unittest
from dataclasses import dataclass
from typing import (
    Any,
    Dict,
    Sequence,
    Type,
)

from ._factory import (
    available_devices,
    create,
)
from ._picollm import (
    Dialog,
    GemmaChatDialog,
    Llama2ChatDialog,
    Llama3ChatDialog,
    MistralChatDialog,
    Phi2ChatDialog,
    Phi2QADialog,
    PicoLLM,
    PicoLLMCompletion,
    PicoLLMEndpoints,
    PicoLLMError,
    PicoLLMIOError,
    PicoLLMInvalidArgumentError,
)
from ._util import pv_library_path


@dataclass
class CompletionExpectation:
    num_prompt_tokens: int
    num_completion_tokens: int
    endpoint: PicoLLMEndpoints
    num_top_choices: int
    completion: str


class PicollmTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls._access_key = sys.argv[1]
        cls._model_path = sys.argv[2]
        cls._device = sys.argv[3]

    def setUp(self):
        self._picollm = PicoLLM(
            access_key=self._access_key,
            model_path=self._model_path,
            device=self._device,
            library_path=pv_library_path('../..'))

    def tearDown(self):
        self._picollm.release()

    def test_init_with_invalid_access_key(self) -> None:
        if 'raspberry-pi' not in pv_library_path('../..'):
            with self.assertRaises(PicoLLMInvalidArgumentError):
                PicoLLM(
                    access_key='invalid==',
                    model_path=self._model_path,
                    device=self._device,
                    library_path=pv_library_path('../..'))

    def test_init_with_invalid_model_path(self) -> None:
        with self.assertRaises(PicoLLMIOError):
            PicoLLM(
                access_key=self._access_key,
                model_path="/invalid.pllm",
                device=self._device,
                library_path=pv_library_path('../..'))

    @unittest.skip("wait for zoo-dev fix")
    def test_init_with_invalid_device(self) -> None:
        with self.assertRaises(PicoLLMInvalidArgumentError):
            PicoLLM(
                access_key=self._access_key,
                model_path=self._model_path,
                device='cpu:nan',
                library_path=pv_library_path('../..'))

    def test_init_with_invalid_library_path(self) -> None:
        with self.assertRaises(OSError):
            PicoLLM(
                access_key=self._access_key,
                model_path=self._model_path,
                device=self._device,
                library_path="/invalid.so")

    @staticmethod
    def _verify_completion_helper(res: PicoLLMCompletion, expectation: CompletionExpectation) -> bool:
        if res.usage.prompt_tokens != expectation.num_prompt_tokens:
            return False
        if res.usage.completion_tokens != expectation.num_completion_tokens:
            return False

        if res.endpoint is not expectation.endpoint:
            return False

        for completion_token in res.completion_tokens:
            if len(completion_token.token.token) == 0:
                return False

            if completion_token.token.log_prob > 0.:
                return False

            if len(completion_token.top_choices) != expectation.num_top_choices:
                return False

            for top_choice in completion_token.top_choices:
                if len(top_choice.token) == 0:
                    return False

                if top_choice.log_prob > 0.:
                    return False

            if len(completion_token.top_choices) > 0:
                if sum([math.exp(x.log_prob) for x in completion_token.top_choices]) > 1.:
                    return False

        if not any('\\x' in x.token.token for x in res.completion_tokens):
            if ''.join(x.token.token for x in res.completion_tokens) != expectation.completion:
                return False

        if res.completion != expectation.completion:
            return False

        return True

    def _verify_completion(
            self,
            res: PicoLLMCompletion,
            expectations: Sequence[CompletionExpectation]):
        self.assertTrue(
            any(self._verify_completion_helper(res, expectation) for expectation in expectations),
            msg=str(res))

    def test_generate_default(self) -> None:
        res = self._picollm.generate(prompt="Instruct: Where is the capital city of British Columbia?\nOutput:")

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=14,
                    num_completion_tokens=11,
                    endpoint=PicoLLMEndpoints.END_OF_SENTENCE,
                    num_top_choices=0,
                    completion=" The capital city of British Columbia is Victoria.\n<|endoftext|>"),
            ])

    def test_generate_with_completion_token_limit(self) -> None:
        res = self._picollm.generate(
            prompt="Instruct: Where is the capital city of British Columbia?\nOutput:",
            completion_token_limit=10)

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=14,
                    num_completion_tokens=10,
                    endpoint=PicoLLMEndpoints.COMPLETION_TOKEN_LIMIT_REACHED,
                    num_top_choices=0,
                    completion=" The capital city of British Columbia is Victoria.\n"),
            ])

    def test_generate_with_stop_phrases(self) -> None:
        res = self._picollm.generate(
            prompt="Instruct: Where is the capital city of British Columbia?\nOutput:",
            stop_phrases={'Vancouver', 'Victoria'})

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=14,
                    num_completion_tokens=8,
                    endpoint=PicoLLMEndpoints.STOP_PHRASE_ENCOUNTERED,
                    num_top_choices=0,
                    completion=" The capital city of British Columbia is Victoria"),
            ])

    def test_generate_with_presence_penalty(self) -> None:
        res = self._picollm.generate(
            prompt="Instruct: Say cheese 5 times.\nOutput:",
            presence_penalty=1.5)

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=10,
                    num_completion_tokens=4,
                    endpoint=PicoLLMEndpoints.END_OF_SENTENCE,
                    num_top_choices=0,
                    completion=' Cheese.\n<|endoftext|>'),
            ])

    def test_generate_with_frequency_penalty(self) -> None:
        res = self._picollm.generate(
            prompt="Instruct: Say cheese 5 times.\nOutput:",
            frequency_penalty=.6)

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=10,
                    num_completion_tokens=12,
                    endpoint=PicoLLMEndpoints.END_OF_SENTENCE,
                    num_top_choices=0,
                    completion=' Cheese. Cheese. Cheese. Cheese. Cheese.\n<|endoftext|>'),
                CompletionExpectation(
                    num_prompt_tokens=10,
                    num_completion_tokens=14,
                    endpoint=PicoLLMEndpoints.END_OF_SENTENCE,
                    num_top_choices=0,
                    completion=' Cheese. Cheese. Cheese. Cheese. Cheese. Cheese!\n<|endoftext|>'),
            ])

    def test_generate_with_temperature(self) -> None:
        res = self._picollm.generate(
            prompt="Here is a song about banana",
            completion_token_limit=17,
            seed=1234,
            temperature=1.)

        res2 = self._picollm.generate(
            prompt="Here is a song about banana",
            completion_token_limit=17,
            seed=4321,
            temperature=1.)

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=6,
                    num_completion_tokens=res.usage.completion_tokens,
                    endpoint=res.endpoint,
                    num_top_choices=0,
                    completion=res.completion)
            ])

        self._verify_completion(
            res=res2,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=6,
                    num_completion_tokens=res2.usage.completion_tokens,
                    endpoint=res2.endpoint,
                    num_top_choices=0,
                    completion=res2.completion)
            ])

        self.assertNotEqual(res.completion, res2.completion)

    def test_generate_with_temperature_and_identical_seeds(self) -> None:
        if 'gpu' not in self._device:
            res = self._picollm.generate(
                prompt="Here is a song about banana",
                completion_token_limit=17,
                seed=1234,
                temperature=1.)

            res2 = self._picollm.generate(
                prompt="Here is a song about banana",
                completion_token_limit=17,
                seed=1234,
                temperature=1.)

            self._verify_completion(
                res=res,
                expectations=[
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=res.completion),
                ])

            self._verify_completion(
                res=res2,
                expectations=[
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res2.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=res2.completion),
                ])

            self.assertEqual(res.completion, res2.completion)

    def test_generate_with_temperature_and_top_p(self) -> None:
        if 'gpu' not in self._device:
            res = self._picollm.generate(
                prompt="Here is a song about banana",
                completion_token_limit=17,
                seed=1234,
                temperature=.7,
                top_p=.6)

            self._verify_completion(
                res=res,
                expectations=[
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=" bread.\n\nThe song is a parody of the song \"The Banana Song\"."
                    ),
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion="uddin'\n\n\nThe song is from a long time ago, and it's"
                    ),
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion="!\n\n\nIt's a song about a banana, a fruit that is yellow"
                    ),
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=" bread.\n\nThe song is called \"Banana Bread Song\" and it was"
                    ),
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=" bread.\n\n\"Banana bread is the best thing in the world.\"\n"
                    ),
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=" bread.\n\nBanana bread is a delicious treat,\nThat's perfect for"
                    ),
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=" bread.\n\nBanana bread is a delicious treat that is made with bananas,"
                    ),
                    CompletionExpectation(
                        num_prompt_tokens=6,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion="!\n\n\n...\n\nThe song:\n\n...\n\nThe song"
                    ),
                ])

    def test_generate_with_top_choices(self) -> None:
        res = self._picollm.generate(
            prompt="Instruct: Where is the capital city of British Columbia?\nOutput:",
            num_top_choices=10)

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=14,
                    num_completion_tokens=11,
                    endpoint=PicoLLMEndpoints.END_OF_SENTENCE,
                    num_top_choices=10,
                    completion=" The capital city of British Columbia is Victoria.\n<|endoftext|>"
                ),
            ])

    def test_generate_with_stream_callback(self) -> None:
        pieces = list()

        def stream_callback(x: str) -> None:
            pieces.append(x)

        res = self._picollm.generate(
            prompt="Instruct: Where is the capital city of British Columbia?\nOutput:",
            stream_callback=stream_callback)

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=14,
                    num_completion_tokens=11,
                    endpoint=PicoLLMEndpoints.END_OF_SENTENCE,
                    num_top_choices=0,
                    completion=" The capital city of British Columbia is Victoria.\n<|endoftext|>"),
            ])

        self.assertEqual(''.join(pieces), " The capital city of British Columbia is Victoria.\n<|endoftext|>")

    def test_tokenize(self) -> None:
        tokens = self._picollm.tokenize('picoLLM is 🔥!', bos=True, eos=False)
        self.assertListEqual(list(tokens), [79, 3713, 3069, 44, 318, 12520, 242, 98, 0])

    def test_forward(self) -> None:
        logits = self._picollm.forward(79)
        self.assertGreater(len(logits), 0)
        for x in logits:
            self.assertIsInstance(x, float)

        self.assertAlmostEqual(sum([math.exp(x) for x in logits]) / sum(math.exp(x) for x in logits), 1.)

    def test_reset(self) -> None:
        logits = self._picollm.forward(79)
        self._picollm.reset()

        if 'gpu' in self._device:
            for x, y in zip(logits, self._picollm.forward(79)):
                self.assertAlmostEqual(x, y, delta=0.01)
        else:
            self.assertListEqual(list(logits), list(self._picollm.forward(79)))

    def test_model(self) -> None:
        self.assertEqual(self._picollm.model, 'phi2 [2.90 v1]')

    def test_context_length(self) -> None:
        self.assertEqual(self._picollm.context_length, 2048)

    def test_max_top_choices(self) -> None:
        self.assertIsInstance(self._picollm.max_top_choices, int)
        self.assertGreater(self._picollm.max_top_choices, 0)

    def test_get_dialog(self) -> None:
        self.assertIsInstance(self._picollm.get_dialog(), Dialog)
        self.assertIsInstance(self._picollm.get_dialog(mode='chat'), Dialog)

    def test_version(self):
        self.assertIsInstance(self._picollm.version, str)

    def test_message_stack(self):
        relative_path = '../..'

        error = None
        try:
            c = PicoLLM(
                access_key=self._access_key,
                model_path=self._model_path,
                device="invalid",
                library_path=pv_library_path(relative_path))
            self.assertIsNone(c)
        except PicoLLMError as e:
            error = e.message_stack

        self.assertIsNotNone(error)
        self.assertGreater(len(error), 0)

        try:
            c = PicoLLM(
                access_key=self._access_key,
                model_path=self._model_path,
                device="invalid",
                library_path=pv_library_path(relative_path))
            self.assertIsNone(c)
        except PicoLLMError as e:
            self.assertEqual(len(error), len(e.message_stack))
            self.assertListEqual(list(error), list(e.message_stack))


class DialogTestCase(unittest.TestCase):
    SYSTEM = 'respond with ❤️ and 🫡'

    CONVERSATION = [
        ('Hi', 'Hey'),
        ('Hola', '¡Oye!'),
        ('Salut', None),
    ]

    EXPECTED = {
        GemmaChatDialog: """<start_of_turn>user
Hi<end_of_turn>
<start_of_turn>model
Hey<end_of_turn>
<start_of_turn>user
Hola<end_of_turn>
<start_of_turn>model
¡Oye!<end_of_turn>
<start_of_turn>user
Salut<end_of_turn>
<start_of_turn>model""",

        Llama2ChatDialog: """<s>[INST] Hi [/INST] Hey </s><s>[INST] Hola [/INST] ¡Oye! </s><s>[INST] Salut [/INST]""",

        Llama3ChatDialog: """<|begin_of_text|><|start_header_id|>user<|end_header_id|>

Hi<|eot_id|><|start_header_id|>assistant<|end_header_id|>

Hey<|eot_id|><|start_header_id|>user<|end_header_id|>

Hola<|eot_id|><|start_header_id|>assistant<|end_header_id|>

¡Oye!<|eot_id|><|start_header_id|>user<|end_header_id|>

Salut<|eot_id|><|start_header_id|>assistant<|end_header_id|>

""",

        MistralChatDialog: """[INST] Hi [/INST] Hey</s>[INST] Hola [/INST] ¡Oye!</s>[INST] Salut [/INST]""",

        Phi2ChatDialog: """Human: Hi
AI: Hey
Human: Hola
AI: ¡Oye!
Human: Salut
AI:""",

        Phi2QADialog: """Instruct: Hi
Output: Hey
Instruct: Hola
Output: ¡Oye!
Instruct: Salut
Output:""",
    }

    EXPECTED_WITH_SYSTEM = {
        GemmaChatDialog: """<start_of_turn>user
Hi<end_of_turn>
<start_of_turn>model
Hey<end_of_turn>
<start_of_turn>user
Hola<end_of_turn>
<start_of_turn>model
¡Oye!<end_of_turn>
<start_of_turn>user
Salut<end_of_turn>
<start_of_turn>model""",

        Llama2ChatDialog: """<s>[INST] <<SYS>>
respond with ❤️ and 🫡
<</SYS>>

Hi [/INST] Hey </s><s>[INST] Hola [/INST] ¡Oye! </s><s>[INST] Salut [/INST]""",

        Llama3ChatDialog: """<|begin_of_text|><|start_header_id|>user<|end_header_id|>

Hi<|eot_id|><|start_header_id|>assistant<|end_header_id|>

Hey<|eot_id|><|start_header_id|>user<|end_header_id|>

Hola<|eot_id|><|start_header_id|>assistant<|end_header_id|>

¡Oye!<|eot_id|><|start_header_id|>user<|end_header_id|>

Salut<|eot_id|><|start_header_id|>assistant<|end_header_id|>

""",

        MistralChatDialog: """[INST] Hi [/INST] Hey</s>[INST] Hola [/INST] ¡Oye!</s>[INST] Salut [/INST]""",

        Phi2ChatDialog: """Human: Hi
AI: Hey
Human: Hola
AI: ¡Oye!
Human: Salut
AI:""",

        Phi2QADialog: """Instruct: Hi
Output: Hey
Instruct: Hola
Output: ¡Oye!
Instruct: Salut
Output:""",
    }

    EXPECTED_WITH_HISTORY = {
        GemmaChatDialog: """<start_of_turn>user
Salut<end_of_turn>
<start_of_turn>model""",

        Llama2ChatDialog: """<s>[INST] Salut [/INST]""",

        Llama3ChatDialog: """<|begin_of_text|><|start_header_id|>user<|end_header_id|>

Salut<|eot_id|><|start_header_id|>assistant<|end_header_id|>

""",

        MistralChatDialog: """[INST] Salut [/INST]""",

        Phi2ChatDialog: """Human: Salut
AI:""",

        Phi2QADialog: """Instruct: Salut
Output:""",
    }

    EXPECTED_WITH_SYSTEM_AND_HISTORY = {
        GemmaChatDialog: """<start_of_turn>user
Salut<end_of_turn>
<start_of_turn>model""",

        Llama2ChatDialog: """<s>[INST] <<SYS>>
respond with ❤️ and 🫡
<</SYS>>

Salut [/INST]""",

        Llama3ChatDialog: """<|begin_of_text|><|start_header_id|>user<|end_header_id|>

Salut<|eot_id|><|start_header_id|>assistant<|end_header_id|>

""",

        MistralChatDialog: """[INST] Salut [/INST]""",

        Phi2ChatDialog: """Human: Salut
AI:""",

        Phi2QADialog: """Instruct: Salut
Output:""",
    }

    def _test_prompt(self, expectations: Dict[Type[Dialog], str], kwargs: Dict[str, Any]) -> None:
        for dialog_class, prompt in expectations.items():
            o = dialog_class(**kwargs)
            for human, llm in self.CONVERSATION[:-1]:
                o.human(human)
                o.llm(llm)
            o.human(self.CONVERSATION[-1][0])
            self.assertEqual(o.prompt(), prompt)

    def test_prompt(self) -> None:
        self._test_prompt(expectations=self.EXPECTED, kwargs=dict())

    def test_prompt_with_system(self) -> None:
        self._test_prompt(expectations=self.EXPECTED_WITH_SYSTEM, kwargs=dict(system=self.SYSTEM))

    def test_prompt_with_history(self) -> None:
        self._test_prompt(expectations=self.EXPECTED_WITH_HISTORY, kwargs=dict(history=0))

    def test_prompt_with_system_history(self) -> None:
        self._test_prompt(
            expectations=self.EXPECTED_WITH_SYSTEM_AND_HISTORY,
            kwargs=dict(system=self.SYSTEM, history=0))


class CreateTestCase(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls._access_key = sys.argv[1]
        cls._model_path = sys.argv[2]

    def test_create(self) -> None:
        o = create(access_key=self._access_key, model_path=self._model_path, library_path=pv_library_path('../..'))
        self.assertIsInstance(o, PicoLLM)


class AvailableDevicesTestCase(unittest.TestCase):
    def test_available_devices(self) -> None:
        res = available_devices(library_path=pv_library_path('../..'))
        self.assertGreater(len(res), 0)
        for x in res:
            self.assertIsInstance(x, str)
            self.assertGreater(len(x), 0)


if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("usage: test_picollm.py ${AccessKey} ${ModelFile} ${device}")
        exit(1)

    unittest.main(argv=sys.argv[:1])
