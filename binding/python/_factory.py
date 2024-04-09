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

from typing import Optional

from ._picollm import *
from ._util import *


def create(
        device_string: Optional[str] = None,
        library_path: Optional[str] = None) -> Picollm:
    """
    Factory method for Picollm.

    :param device_string: String to select runtime device.
    :param library_path: Absolute path to Picollm's dynamic library. If not set it will be set to the default
    :return: An instance of Picollm.
    """

    pass

    # if device_string is None:
    #     device_string = "best:0"

    # if library_path is None:
    #     library_path = pv_library_path('')

    # return Picollm(device_string=device_string, library_path=library_path)


__all__ = [
    'create',
]
