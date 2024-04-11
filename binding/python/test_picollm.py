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

import sys
import unittest

from _picollm import PicoLLM, PicoLLMError
from _util import *


class PicollmTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls._access_key = sys.argv[1]
        cls._model_path = sys.argv[2]

    def setUp(self):
        self._picollm = PicoLLM(
            access_key=self._access_key,
            model_path=self._model_path,
            device_string="cpu:8",
            library_path=pv_library_path('../..'))

    def tearDown(self):
        self._picollm.release()

    def test_generate(self):
        expected_completions = [
            " John and I am a student at XYZ school"
        ]

        result = self._picollm.generate("Hello my name is", completion_token_limit=10)

        self.assertTrue(result.completion in expected_completions)

    def test_version(self):
        self.assertIsInstance(self._picollm.version, str)

    def test_message_stack(self):
        relative_path = '../..'

        error = None
        try:
            c = PicoLLM(
                access_key=self._access_key,
                model_path=self._model_path,
                device_string="invalid",
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
                device_string="invalid",
                library_path=pv_library_path(relative_path))
            self.assertIsNone(c)
        except PicoLLMError as e:
            self.assertEqual(len(error), len(e.message_stack))
            self.assertListEqual(list(error), list(e.message_stack))


if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("usage: test_picollm.py ${AccessKey} ${ModelFile}")
        exit(1)

    unittest.main(argv=sys.argv[:1])
