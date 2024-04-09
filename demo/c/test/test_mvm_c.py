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

from test_util import *


class MvmCTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls._weight_file = sys.argv[1]
        cls._platform = sys.argv[2]
        cls._arch = "" if len(sys.argv) != 4 else sys.argv[3]
        cls._root_dir = os.path.join(os.path.dirname(__file__), "../../..")

    def _get_library_file(self):
        return os.path.join(
            self._root_dir,
            "lib",
            self._platform,
            self._arch,
            "libpv_mvm." + get_lib_ext(self._platform)
        )

    def test_mvm(self):
        args = [
            os.path.join(os.path.dirname(__file__), "../build/mvm_demo_file"),
            "-l", self._get_library_file(),
            "-w", self._weight_file,
            "-d", "best:0"
        ]

        os.environ["PATH"] += os.pathsep + os.path.dirname(self._get_library_file())

        print(" ".join(args))
        process = subprocess.Popen(args, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
        stdout, stderr = process.communicate()
        print(stdout, stderr)
        self.assertEqual(process.poll(), 0)
        self.assertEqual(stderr.decode('utf-8'), '')


if __name__ == '__main__':
    if len(sys.argv) < 3 or len(sys.argv) > 4:
        print("usage: test_mvm_c.py ${WeightFile} ${Platform} [${Arch}]")
        exit(1)
    unittest.main(argv=sys.argv[:1])
