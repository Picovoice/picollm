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

import json
import math
import os
import sys
import unittest
from dataclasses import dataclass
from typing import (
    Any,
    Dict,
    Sequence,
    Tuple,
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

        path = os.path.join(os.path.dirname(__file__), '../../resources/.test/test_data.json')
        with open(path, encoding='utf-8') as f:
            cls.data = json.load(f)["picollm"]

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

    @staticmethod
    def _parse_expectations(expectations: Sequence[Dict[str, Any]]) -> Sequence[CompletionExpectation]:
        def _parse_endpoint(ep: str) -> PicoLLMEndpoints:
            return {
                "END_OF_SENTENCE": PicoLLMEndpoints.END_OF_SENTENCE,
                "COMPLETION_TOKEN_LIMIT_REACHED": PicoLLMEndpoints.COMPLETION_TOKEN_LIMIT_REACHED,
                "STOP_PHRASE_ENCOUNTERED": PicoLLMEndpoints.STOP_PHRASE_ENCOUNTERED
            }[ep]

        return [
            CompletionExpectation(
                num_prompt_tokens=x["num-prompt-tokens"],
                num_completion_tokens=x["num-completion-tokens"],
                endpoint=_parse_endpoint(x["endpoint"]),
                num_top_choices=x["num-top-choices"],
                completion=x["completion"])
            for x in expectations
        ]

    def test_generate_default(self) -> None:
        data = self.data["default"]
        prompt = data["prompt"]
        expectations = self._parse_expectations(data["expectations"])

        self._verify_completion(res=self._picollm.generate(prompt=prompt), expectations=expectations)

    def test_generate_with_completion_token_limit(self) -> None:
        data = self.data["with-completion-token-limit"]
        prompt = data["prompt"]
        completion_token_limit = data["parameters"]["completion-token-limit"]
        expectations = self._parse_expectations(data["expectations"])

        self._verify_completion(
            res=self._picollm.generate(prompt=prompt, completion_token_limit=completion_token_limit),
            expectations=expectations)

    def test_generate_with_stop_phrases(self) -> None:
        data = self.data["with-stop-phrases"]
        prompt = data["prompt"]
        stop_phrases = set(data["parameters"]["stop-phrases"])
        expectations = self._parse_expectations(data["expectations"])

        self._verify_completion(
            res=self._picollm.generate(prompt=prompt, stop_phrases=stop_phrases),
            expectations=expectations)

    def test_generate_with_presence_penalty(self) -> None:
        data = self.data["with-presence-penalty"]
        prompt = data["prompt"]
        presence_penalty = data["parameters"]["presence-penalty"]
        expectations = self._parse_expectations(data["expectations"])

        self._verify_completion(
            res=self._picollm.generate(prompt=prompt, presence_penalty=presence_penalty),
            expectations=expectations)

    def test_generate_with_frequency_penalty(self) -> None:
        data = self.data["with-frequency-penalty"]
        prompt = data["prompt"]
        frequency_penalty = data["parameters"]["frequency-penalty"]
        expectations = self._parse_expectations(data["expectations"])

        self._verify_completion(
            res=self._picollm.generate(prompt=prompt, frequency_penalty=frequency_penalty),
            expectations=expectations)

    def test_generate_with_temperature(self) -> None:
        data = self.data["with-temperature"]
        prompt = data["prompt"]
        completion_token_limit = data["parameters"]["completion-token-limit"]
        seeds = data["parameters"]["seeds"]
        temperature = data["parameters"]["temperature"]

        num_prompt_tokens = len(self._picollm.tokenize(prompt, bos=True, eos=False))

        res = self._picollm.generate(
            prompt=prompt,
            completion_token_limit=completion_token_limit,
            seed=seeds[0],
            temperature=temperature)

        res2 = self._picollm.generate(
            prompt=prompt,
            completion_token_limit=completion_token_limit,
            seed=seeds[1],
            temperature=temperature)

        self._verify_completion(
            res=res,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=num_prompt_tokens,
                    num_completion_tokens=res.usage.completion_tokens,
                    endpoint=res.endpoint,
                    num_top_choices=0,
                    completion=res.completion)
            ])

        self._verify_completion(
            res=res2,
            expectations=[
                CompletionExpectation(
                    num_prompt_tokens=num_prompt_tokens,
                    num_completion_tokens=res2.usage.completion_tokens,
                    endpoint=res2.endpoint,
                    num_top_choices=0,
                    completion=res2.completion)
            ])

        self.assertNotEqual(res.completion, res2.completion)

    def test_generate_with_temperature_and_identical_seeds(self) -> None:
        if 'gpu' not in self._device:
            data = self.data["with-temperature-and-identical-seeds"]
            prompt = data["prompt"]
            completion_token_limit = data["parameters"]["completion-token-limit"]
            seed = data["parameters"]["seed"]
            temperature = data["parameters"]["temperature"]

            num_prompt_tokens = len(self._picollm.tokenize(prompt, bos=True, eos=False))

            res = self._picollm.generate(
                prompt=prompt,
                completion_token_limit=completion_token_limit,
                seed=seed,
                temperature=temperature)

            res2 = self._picollm.generate(
                prompt=prompt,
                completion_token_limit=completion_token_limit,
                seed=seed,
                temperature=temperature)

            self._verify_completion(
                res=res,
                expectations=[
                    CompletionExpectation(
                        num_prompt_tokens=num_prompt_tokens,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=res.completion),
                ])

            self._verify_completion(
                res=res2,
                expectations=[
                    CompletionExpectation(
                        num_prompt_tokens=num_prompt_tokens,
                        num_completion_tokens=res2.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=res2.completion),
                ])

            self.assertEqual(res.completion, res2.completion)

    def test_generate_with_temperature_and_top_p(self) -> None:
        if 'gpu' not in self._device:
            data = self.data["with-temperature-and-top-p"]
            prompt = data["prompt"]
            completion_token_limit = data["parameters"]["completion-token-limit"]
            seed = data["parameters"]["seed"]
            temperature = data["parameters"]["temperature"]
            top_p = data["parameters"]["top-p"]
            expectations = data["expectations"]

            num_prompt_tokens = len(self._picollm.tokenize(prompt, bos=True, eos=False))

            res = self._picollm.generate(
                prompt=prompt,
                completion_token_limit=completion_token_limit,
                seed=seed,
                temperature=temperature,
                top_p=top_p)

            self._verify_completion(
                res=res,
                expectations=[
                    CompletionExpectation(
                        num_prompt_tokens=num_prompt_tokens,
                        num_completion_tokens=res.usage.completion_tokens,
                        endpoint=res.endpoint,
                        num_top_choices=0,
                        completion=x
                    ) for x in expectations
                ])

    def test_generate_with_top_choices(self) -> None:
        data = self.data["with-top-choices"]
        prompt = data["prompt"]
        num_top_choices = data["parameters"]["num-top-choices"]
        expectations = self._parse_expectations(data["expectations"])

        self._verify_completion(
            res=self._picollm.generate(prompt=prompt, num_top_choices=num_top_choices),
            expectations=expectations)

    def test_generate_with_stream_callback(self) -> None:
        data = self.data["default"]
        prompt = data["prompt"]
        expectations = self._parse_expectations(data["expectations"])

        pieces = list()

        def stream_callback(x: str) -> None:
            pieces.append(x)

        self._verify_completion(
            res=self._picollm.generate(prompt=prompt, stream_callback=stream_callback),
            expectations=expectations)

        self.assertEqual(''.join(pieces), expectations[0].completion)

    def test_tokenize(self) -> None:
        text = self.data["tokenize"]["text"]
        expected_tokens = self.data["tokenize"]["tokens"]

        tokens = self._picollm.tokenize(text, bos=True, eos=False)
        self.assertListEqual(list(tokens), expected_tokens)

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
    @classmethod
    def setUpClass(cls) -> None:
        dialog_classes = {
            "gemma-chat-dialog": GemmaChatDialog,
            "llama-2-chat-dialog": Llama2ChatDialog,
            "llama-3-chat-dialog": Llama3ChatDialog,
            "mistral-chat-dialog": MistralChatDialog,
            "phi2-chat-dialog": Phi2ChatDialog,
            "phi2-qa-dialog": Phi2QADialog,
        }

        path = os.path.join(os.path.dirname(__file__), '../../resources/.test/test_data.json')
        with open(path, encoding='utf-8') as f:
            data = json.load(f)['dialog']
            cls.system: str = data['system']
            cls.conversation: Sequence[Tuple[str, str]] = [(x[0], x[1]) for x in data['conversation']]
            cls.expected_prompts: Dict[Type[Dialog], str] = \
                dict((dialog_classes[k], v) for k, v in data['prompts'].items())
            cls.expected_prompts_with_system = \
                dict((dialog_classes[k], v) for k, v in data['prompts-with-system'].items())
            cls.expected_prompts_with_history = \
                dict((dialog_classes[k], v) for k, v in data['prompts-with-history'].items())
            cls.expected_prompts_with_system_and_history = \
                dict((dialog_classes[k], v) for k, v in data['prompts-with-system-and-history'].items())

    def _test_prompt(self, expectations: Dict[Type[Dialog], str], kwargs: Dict[str, Any]) -> None:
        for dialog_class, prompt in expectations.items():
            o = dialog_class(**kwargs)
            for human, llm in self.conversation[:-1]:
                o.add_human_request(human)
                o.add_llm_response(llm)
            o.add_human_request(self.conversation[-1][0])
            self.assertEqual(o.prompt(), prompt)

    def test_prompt(self) -> None:
        self._test_prompt(expectations=self.expected_prompts, kwargs=dict())

    def test_prompt_with_system(self) -> None:
        self._test_prompt(expectations=self.expected_prompts_with_system, kwargs=dict(system=self.system))

    def test_prompt_with_history(self) -> None:
        self._test_prompt(expectations=self.expected_prompts_with_history, kwargs=dict(history=0))

    def test_prompt_with_system_history(self) -> None:
        self._test_prompt(
            expectations=self.expected_prompts_with_system_and_history,
            kwargs=dict(system=self.system, history=0))


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
