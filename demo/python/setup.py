import os
import shutil

import setuptools

os.system('git clean -dfx')

package_folder = os.path.join(os.path.dirname(__file__), 'pvmvmdemo')
os.mkdir(package_folder)

shutil.copy(os.path.join(os.path.dirname(__file__), '../../LICENSE'), package_folder)

shutil.copy(
    os.path.join(os.path.dirname(__file__), 'mvm_demo_file.py'),
    os.path.join(package_folder, 'mvm_demo_file.py'))

with open(os.path.join(os.path.dirname(__file__), 'MANIFEST.in'), 'w') as f:
    f.write('include pvmvmdemo/LICENSE\n')
    f.write('include pvmvmdemo/mvm_demo_file.py\n')

with open(os.path.join(os.path.dirname(__file__), 'README.md'), 'r') as f:
    long_description = f.read()

setuptools.setup(
    name="pvmvmdemo",
    version="1.0.0",
    author="Picovoice",
    author_email="hello@picovoice.ai",
    description="Mvm",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Picovoice/mvm",
    packages=["pvmvmdemo"],
    install_requires=["pvmvm==0.1.0"],
    include_package_data=True,
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Topic :: Multimedia :: Sound/Audio :: Speech"
    ],
    entry_points=dict(
        console_scripts=[
            'mvm_demo_file=pvmvmdemo.mvm_demo_file:main',
        ],
    ),
    python_requires='>=3.7',
    keywords="",
)
