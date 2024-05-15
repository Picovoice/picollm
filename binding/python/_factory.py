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
    POINTER,
    RTLD_LOCAL,
    byref,
    c_char_p,
    c_int32,
)
from typing import (
    Optional,
    Sequence,
)

from ._picollm import PicoLLM
from ._util import pv_library_path


def create(
        access_key: str,
        model_path: str,
        device: Optional[str] = None,
        library_path: Optional[str] = None) -> PicoLLM:
    """
    Factory method for picoLLM inference engine.

    :param access_key: AccessKey obtained from Picovoice Console (https://console.picovoice.ai/)
    :param model_path: Absolute path to the file containing LLM parameters.
    :param device: String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`,
    picoLLM picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device. To select a
    specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index of the target GPU.
    If set to `cpu`, the engine will run on the CPU with the default number of threads. To specify the number of
    threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of threads. If set
    to `None`, `best` device will be used.
    :param library_path: Absolute path to picoLLM's dynamic library. If not set it will be set to the default location.

    :return: An instance of picoLLM inference engine.
    """

    if device is None:
        device = 'best'

    if library_path is None:
        library_path = pv_library_path('')

    return PicoLLM(
        access_key=access_key,
        model_path=model_path,
        device=device,
        library_path=library_path)


def available_devices(library_path: Optional[str] = None) -> Sequence[str]:
    """
    Lists all available devices that picoLLM can use for inference. Each entry in the list can be the `device` argument
    of `.create` factory method or `PicoLLM` constructor.

    :param library_path: Absolute path to picoLLM's dynamic library. If not set it will be set to the default location.

    :return: List of all available devices that picoLLM can use for inference.
    """

    if library_path is None:
        library_path = pv_library_path('')

    dll_dir_obj = None
    if hasattr(os, "add_dll_directory"):
        dll_dir_obj = os.add_dll_directory(os.path.dirname(library_path))

    library = cdll.LoadLibrary(library_path)

    if dll_dir_obj is not None:
        dll_dir_obj.close()

    list_hardware_devices_func = library.pv_picollm_list_hardware_devices
    list_hardware_devices_func.argtypes = [POINTER(POINTER(c_char_p)), POINTER(c_int32)]
    list_hardware_devices_func.restype = PicoLLM.PicovoiceStatuses
    c_hardware_devices = POINTER(c_char_p)()
    c_num_hardware_devices = c_int32()
    status = list_hardware_devices_func(byref(c_hardware_devices), byref(c_num_hardware_devices))
    if status is not PicoLLM.PicovoiceStatuses.SUCCESS:
        raise PicoLLM.PICOVOICE_STATUS_TO_EXCEPTION[status](message='`pv_picollm_list_hardware_devices` failed.')
    res = [c_hardware_devices[i].decode() for i in range(c_num_hardware_devices.value)]

    free_hardware_devices_func = library.pv_picollm_free_hardware_devices
    free_hardware_devices_func.argtypes = [POINTER(c_char_p), c_int32]
    free_hardware_devices_func.restype = None
    free_hardware_devices_func(c_hardware_devices, c_num_hardware_devices.value)

    return res


__all__ = [
    'available_devices',
    'create',
]
