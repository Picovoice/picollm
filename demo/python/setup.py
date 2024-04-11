import os
import shutil

import setuptools

os.system('git clean -dfx')

package_folder = os.path.join(os.path.dirname(__file__), 'pvpicollmdemo')
os.mkdir(package_folder)

shutil.copy(os.path.join(os.path.dirname(__file__), '../../LICENSE'), package_folder)

shutil.copy(
    os.path.join(os.path.dirname(__file__), 'picollm_demo.py'),
    os.path.join(package_folder, 'picollm_demo.py'))

with open(os.path.join(os.path.dirname(__file__), 'MANIFEST.in'), 'w') as f:
    f.write('include pvpicollmdemo/LICENSE\n')
    f.write('include pvpicollmdemo/picollm_demo.py\n')

with open(os.path.join(os.path.dirname(__file__), 'README.md'), 'r') as f:
    long_description = f.read()

setuptools.setup(
    name="pvpicollmdemo",
    version="1.0.0",
    author="Picovoice",
    author_email="hello@picovoice.ai",
    description="Mvm",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Picovoice/picollm",
    packages=["pvpicollmdemo"],
    install_requires=["pvpicollm==0.1.0"],
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
            'picollm_demo=pvpicollmdemo.picollm_demo:main',
        ],
    ),
    python_requires='>=3.7',
    keywords="",
)
