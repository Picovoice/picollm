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

import os.path
import subprocess
import sys
import unittest

from test_util import pv_library_path


class PicoLLMCTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls._access_key = sys.argv[1]
        cls._model_path = sys.argv[2]
        cls._device = sys.argv[3]

    def test_picollm(self):
        args = [
            os.path.join(os.path.dirname(__file__), "../build/picollm_demo_completion"),
            "-a", self._access_key,
            "-l", pv_library_path("../../.."),
            "-m", self._model_path,
            "-d", self._device,
            "-p", "Instruct: Where is the capital city of British Columbia?\nOutput:",
        ]
        process = subprocess.Popen(args, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        stdout, stderr = process.communicate()
        self.assertEqual(process.poll(), 0)
        self.assertEqual(stderr.decode('utf-8'), '')
        completion = stdout.decode('utf-8').strip()
        if self._device != "gpu":
            self.assertIn("British Columbia", completion)


if __name__ == '__main__':
    if len(sys.argv) != 4:
        print("usage: test_picollm.py ${AccessKey} ${ModelFile} ${device}")
        exit(1)
    unittest.main(argv=sys.argv[:1])
