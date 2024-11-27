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
import shutil

import setuptools

os.system('git clean -dfx')

package_folder = os.path.join(os.path.dirname(__file__), 'picollm')
os.mkdir(package_folder)

shutil.copy(os.path.join(os.path.dirname(__file__), '../../LICENSE'), package_folder)

shutil.copy(os.path.join(os.path.dirname(__file__), '__init__.py'), os.path.join(package_folder, '__init__.py'))
shutil.copy(os.path.join(os.path.dirname(__file__), '_factory.py'), os.path.join(package_folder, '_factory.py'))
shutil.copy(os.path.join(os.path.dirname(__file__), '_picollm.py'), os.path.join(package_folder, '_picollm.py'))
shutil.copy(os.path.join(os.path.dirname(__file__), '_util.py'), os.path.join(package_folder, '_util.py'))

os.mkdir(os.path.join(package_folder, 'lib'))
for platform in ('linux', 'mac', 'windows', 'raspberry-pi'):
    shutil.copytree(
        os.path.join(os.path.dirname(__file__), '../../lib', platform),
        os.path.join(package_folder, 'lib', platform))

MANIFEST_IN = """
include picollm/LICENSE
include picollm/__init__.py
include picollm/_factory.py
include picollm/_picollm.py
include picollm/_util.py
include picollm/lib/linux/x86_64/libpv_picollm.so
include picollm/lib/mac/arm64/*.dylib
include picollm/lib/mac/x86_64/*.dylib
include picollm/lib/raspberry-pi/**/*.so
include picollm/lib/windows/amd64/*.dll
"""

with open(os.path.join(os.path.dirname(__file__), 'MANIFEST.in'), 'w') as f:
    f.write(MANIFEST_IN.strip('\n '))

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as f:
    long_description = f.read()

setuptools.setup(
    name="picollm",
    version="1.2.1",
    author="Picovoice",
    author_email="hello@picovoice.ai",
    description="picoLLM Inference Engine",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Picovoice/picollm",
    packages=["picollm"],
    include_package_data=True,
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    python_requires='>=3.8',
    keywords="Large Language Model, LLM, Generative AI, GenAI, Llama, Mistral, Mixtral, Gemma, Phi",
)
