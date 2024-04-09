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
import platform
import subprocess


def _is_64bit():
    return '64bit' in platform.architecture()[0]


def _pv_linux_machine(machine):
    if machine == 'x86_64':
        return machine
    else:
        raise NotImplementedError("Unsupported CPU architecture: `%s`" % machine)


def _pv_platform():
    pv_system = platform.system()
    if pv_system not in {'Darwin', 'Linux', 'Windows'}:
        raise ValueError("Unsupported system '%s'." % pv_system)

    if pv_system == 'Linux':
        pv_machine = _pv_linux_machine(platform.machine())
    else:
        pv_machine = platform.machine()

    return pv_system, pv_machine


_PV_SYSTEM, _PV_MACHINE = _pv_platform()


def pv_library_path(relative):
    if _PV_SYSTEM == 'Darwin':
        if _PV_MACHINE == 'x86_64':
            return os.path.join(os.path.dirname(__file__), relative, 'lib/mac/x86_64/libpv_picollm.dylib')
        elif _PV_MACHINE == "arm64":
            return os.path.join(os.path.dirname(__file__), relative, 'lib/mac/arm64/libpv_picollm.dylib')
    elif _PV_SYSTEM == 'Linux':
        if _PV_MACHINE == 'x86_64':
            return os.path.join(os.path.dirname(__file__), relative, 'lib/linux/x86_64/libpv_picollm.so')
    elif _PV_SYSTEM == 'Windows':
        library_file = os.path.join(os.path.dirname(__file__), relative, 'lib/windows/amd64/libpv_picollm.dll')
        os.environ["PATH"] += os.pathsep + os.path.join(os.path.dirname(library_file))
        return library_file

    raise NotImplementedError('Unsupported platform.')
