#
# Copyright 2024-2026 Picovoice Inc.
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
        cls._vlm_model_path = sys.argv[3]
        cls._ocr_model_path = sys.argv[4]
        cls._embedding_model_path = sys.argv[5]
        cls._device = sys.argv[6]

    def test_picollm_generate(self):
        args = [
            os.path.join(os.path.dirname(__file__), "../build/picollm_demo_completion"),
            "-a", self._access_key,
            "-l", pv_library_path("../../.."),
            "-m", self._model_path,
            "-y", self._device,
            "-p", "Instruct: Where is the capital city of British Columbia?\nOutput:",
            "-e", "777"
        ]
        process = subprocess.Popen(args, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        stdout, stderr = process.communicate()
        self.assertEqual(process.poll(), 0)
        self.assertEqual(stderr.decode('utf-8'), '')
        completion = stdout.decode('utf-8').strip()
        if self._device != "gpu":
            self.assertIn("British Columbia", completion)

    def test_picollm_generate_with_image(self):
        args = [
            os.path.join(os.path.dirname(__file__), "../build/picollm_demo_completion"),
            "-a", self._access_key,
            "-l", pv_library_path("../../.."),
            "-m", self._vlm_model_path,
            "-y", self._device,
            "-i", os.path.join(os.path.dirname(__file__), "../../../resources/.test/images/test_image.png"),
            "-p", "Describe this image.",
            "-n", "7",
            "-e", "777"
        ]
        process = subprocess.Popen(args, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        stdout, stderr = process.communicate()
        self.assertEqual(process.poll(), 0)
        self.assertEqual(stderr.decode('utf-8'), '')
        completion = stdout.decode('utf-8').strip()
        self.assertIn("This image is a screenshot", completion)

    def test_picollm_generate_ocr(self):
        args = [
            os.path.join(os.path.dirname(__file__), "../build/picollm_demo_ocr"),
            "-a", self._access_key,
            "-l", pv_library_path("../../.."),
            "-m", self._ocr_model_path,
            "-y", self._device,
            "-i", os.path.join(os.path.dirname(__file__), "../../../resources/.test/images/test_image.png"),
            "-n", "7"
        ]
        process = subprocess.Popen(args, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        stdout, stderr = process.communicate()
        self.assertEqual(process.poll(), 0)
        self.assertEqual(stderr.decode('utf-8'), '')
        completion = stdout.decode('utf-8').strip()
        self.assertIn("# In the news", completion)

    def test_picollm_generate_embeddings(self):
        args = [
            os.path.join(os.path.dirname(__file__), "../build/picollm_demo_similarity"),
            "-a", self._access_key,
            "-l", pv_library_path("../../.."),
            "-m", self._embedding_model_path,
            "-y", self._device,
            "-p", "His name is Tom",
            "-d", "I am Tom"
        ]
        process = subprocess.Popen(args, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        stdout, stderr = process.communicate()
        self.assertEqual(process.poll(), 0)
        self.assertEqual(stderr.decode('utf-8'), '')
        similarity = stdout.decode('utf-8').strip()
        self.assertIn("is 0.614", similarity)



if __name__ == '__main__':
    if len(sys.argv) != 7:
        print("usage: test_picollm.py ${AccessKey} ${TextModelFile} " +
              "${VlmModelFile} ${OcrModelFile} ${EmbeddingModelFile} ${Device}")
        exit(1)
    unittest.main(argv=sys.argv[:1])
