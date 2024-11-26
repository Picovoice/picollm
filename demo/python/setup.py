import os
import shutil

import setuptools

os.system('git clean -dfx')

package_folder = os.path.join(os.path.dirname(__file__), 'picollmdemo')
os.mkdir(package_folder)

shutil.copy(os.path.join(os.path.dirname(__file__), '../../LICENSE'), package_folder)

shutil.copy(
    os.path.join(os.path.dirname(__file__), 'picollm_demo_chat.py'),
    os.path.join(package_folder, 'picollm_demo_chat.py'))
shutil.copy(
    os.path.join(os.path.dirname(__file__), 'picollm_demo_completion.py'),
    os.path.join(package_folder, 'picollm_demo_completion.py'))

with open(os.path.join(os.path.dirname(__file__), 'MANIFEST.in'), 'w') as f:
    f.write('include picollmdemo/LICENSE\n')
    f.write('include picollmdemo/picollm_demo_chat.py\n')
    f.write('include picollmdemo/picollm_demo_completion.py\n')

with open(os.path.join(os.path.dirname(__file__), 'README.md')) as f:
    long_description = f.read()

setuptools.setup(
    name="picollmdemo",
    version="1.2.1",
    author="Picovoice",
    author_email="hello@picovoice.ai",
    description="picoLLM Inference Engine demos",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/Picovoice/picollm",
    packages=["picollmdemo"],
    install_requires=["picollm==1.2.1"],
    include_package_data=True,
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Topic :: Scientific/Engineering :: Artificial Intelligence",
    ],
    entry_points=dict(
        console_scripts=[
            'picollm_demo_chat=picollmdemo.picollm_demo_chat:main',
            'picollm_demo_completion=picollmdemo.picollm_demo_completion:main',
        ],
    ),
    python_requires='>=3.8',
    keywords="Large Language Model, LLM, Generative AI, GenAI, Llama, Mistral, Mixtral, Gemma, Phi",
)
