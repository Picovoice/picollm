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

import numpy as np

from _picollm import Picollm, PicollmError
from _util import *


class PicollmTestCase(unittest.TestCase):

    def setUp(self):
        self._picollm = Picollm(device_string="best:0", library_path=pv_library_path('../..'))

    def tearDown(self):
        self._picollm.delete()

    def test_load_chunk(self):
        with open(sys.argv[1], 'rb') as model_file:
            model_loaded = False
            while not model_loaded:
                data = model_file.read(self._picollm.max_chunk_size)
                if not data:
                    break
                model_loaded = self._picollm.load_model_chunk(data)
            self.assertTrue(model_loaded)

    def test_chain_multiply(self):
        self._picollm.load_model_file(sys.argv[1])

        _, matrix_n = self._picollm.matrix_dimensions()
        vector = [1.0] * matrix_n

        result_vector = self._picollm.chain_multiply(vector)

        self.assertEqual(len(vector), len(result_vector))

    def test_version(self):
        self.assertIsInstance(self._picollm.version, str)

    def test_message_stack(self):
        relative_path = '../..'

        error = None
        try:
            c = Picollm(device_string="invalid", library_path=pv_library_path(relative_path))
            self.assertIsNone(c)
        except PicollmError as e:
            error = e.message_stack

        self.assertIsNotNone(error)
        self.assertGreater(len(error), 0)

        try:
            c = Picollm(device_string="invalid", library_path=pv_library_path(relative_path))
            self.assertIsNone(c)
        except PicollmError as e:
            self.assertEqual(len(error), len(e.message_stack))
            self.assertListEqual(list(error), list(e.message_stack))


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("usage: test_picollm.py ${WeightFile}")
        exit(1)

    unittest.main(argv=sys.argv[:1])
