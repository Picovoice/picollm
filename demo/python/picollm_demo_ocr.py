#
# Copyright 2026 Picovoice Inc.
#
# You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
# file accompanying this source.
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
#

import os
import signal
import time

from argparse import ArgumentParser
from PIL import Image

import picollm


def main():
    parser = ArgumentParser()
    parser.add_argument(
        '--access_key',
        help='`AccessKey` obtained from `Picovoice Console` (https://console.picovoice.ai/).')
    parser.add_argument(
        '--model_path',
        help='Absolute path to the file containing LLM parameters.')
    parser.add_argument('--image_path', help="Image to run OCR on.")
    parser.add_argument(
        '--device',
        help="String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`, picoLLM "
             "picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device. To "
             "select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index "
             "of the target GPU. If set to `cpu`, the engine will run on the CPU with the default number of threads. "
             "To specify the number of threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is "
             "the desired number of threads.")
    parser.add_argument(
        '--completion_token_limit',
        type=int,
        default=128,
        help="Maximum number of tokens in the completion. Set to `None` to impose no limit.")
    parser.add_argument(
        '--verbose',
        action='store_true',
        help="Enable verbose logging.")
    parser.add_argument(
        '--show_available_devices',
        action='store_true',
        help="Show the list of available devices for LLM inference.")
    parser.add_argument(
        '--library_path',
        help="Absolute path to picoLLM's dynamic library.")

    args = parser.parse_args()
    access_key = args.access_key
    image_path = args.image_path
    model_path = args.model_path
    device = args.device
    completion_token_limit = args.completion_token_limit
    verbose = args.verbose
    show_available_devices = args.show_available_devices
    library_path = args.library_path

    if show_available_devices:
        print('\n'.join(picollm.available_devices(library_path=library_path)))
        exit(0)
    else:
        if access_key is None:
            print("`--access_key` is a required argument")
            exit(1)
        if model_path is None:
            print("`--model_path` is a required argument")
            exit(1)
        if image_path is None:
            print("`--image_path` is a required argument")
            exit(1)

    if not os.path.exists(image_path):
        raise IOError(f"No image file found at given path `{image_path}`")
    image = Image.open(image_path).convert("RGB")

    o = picollm.create(
        access_key=access_key,
        model_path=model_path,
        device=device,
        library_path=library_path)
    print(f"picoLLM `{o.version}`")
    print(f"Loaded `{o.model}`")
    print("Generating... (press Ctrl+C to interrupt)\n")

    start_sec = [0.]
    is_interrupt = [False]

    def interrupt_generate(_, __):
        is_interrupt[0] = True
        print("\n\nInterrupting generate...")
        o.interrupt()

    def stream_callback(token: str):
        if start_sec[0] == 0.:
            start_sec[0] = time.time()

        if not is_interrupt[0]:
            print(token, flush=True, end='')

    def prompt_progress_callback(progress: float):
        if not is_interrupt[0]:
            bar_width = 50
            filled_len = int((progress / 100.0) * bar_width)

            if progress < 100.0:
                bar = '#' * filled_len + ' ' * (bar_width - filled_len)
                print(f"\rProcessing prompt [{bar}] {progress:.1f}%", end="", flush=True)
            else:
                print("\r" + " " * (bar_width + 30), end="\r", flush=True)
    signal.signal(signal.SIGINT, interrupt_generate)

    try:
        completion = o.generate_ocr(
            image_width=image.width,
            image_height=image.height,
            image=image.tobytes(),
            completion_token_limit=completion_token_limit,
            stream_callback=stream_callback,
            prompt_progress_callback=prompt_progress_callback)

        print('\n')

        if verbose:
            print(completion)

    finally:
        o.release()


if __name__ == '__main__':
    main()
