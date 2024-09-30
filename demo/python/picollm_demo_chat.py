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

import signal
import sys
from argparse import ArgumentParser

import picollm


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument(
        '--access_key',
        help='`AccessKey` obtained from `Picovoice Console` (https://console.picovoice.ai/).')
    parser.add_argument(
        '--model_path',
        help='Absolute path to the file containing LLM parameters.')
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
        '--stop_phrases',
        nargs='+',
        help="The generation process stops when it encounters any of these phrases in the completion. The already "
             "generated completion, including the encountered stop phrase, will be returned.")
    parser.add_argument(
        '--seed',
        type=int,
        help="The internal random number generator uses it as its seed if set to a positive integer value. Seeding "
             "enforces deterministic outputs. Set to `None` for randomized responses.")
    parser.add_argument(
        '--presence_penalty',
        type=float,
        default=0.,
        help="It penalizes logits already appearing in the partial completion if set to a positive value. If set to "
             "`0.0`, it has no effect.")
    parser.add_argument(
        '--frequency_penalty',
        type=float,
        default=0.,
        help="If set to a positive floating-point value, it penalizes logits proportional to the frequency of their "
             "appearance in the partial completion. If set to `0.0`, it has no effect.")
    parser.add_argument(
        '--temperature',
        type=float,
        default=0.,
        help="Sampling temperature. Temperature is a non-negative floating-point value that controls the randomness of "
             "the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. In "
             "contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to "
             "`0` selects the maximum logit during sampling.")
    parser.add_argument(
        '--top_p',
        type=float,
        default=1.,
        help="A positive floating-point number within (0, 1]. It restricts the sampler's choices to high-probability "
             "logits that form the `top_p` portion of the probability mass. Hence, it avoids randomly selecting "
             "unlikely logits. A value of `1.` enables the sampler to pick any token with non-zero probability, "
             "turning off the feature.")
    parser.add_argument(
        '--dialog_mode',
        help="Some instruction-tuned models provide multiple instruction modes. For example, `phi2` has `qa` and "
             "`chat` modes.")
    parser.add_argument(
        '--system_instruction',
        help="Some instruction-tuned models, such as `llama-2-70b-chat` accept a system-level instruction that can "
             "change the model's behavior or tone throughout the entire dialog.")
    parser.add_argument(
        '--history',
        type=int,
        default=0,
        help="All models have limited context. Hence, when going back and forth for a long time, we need to limit the "
             "scope of previous conversations we pass to the model as a prompt to generate a response. The History "
             "parameter controls how many of the latest back-and-forths should be serialized in each prompt. Set to "
             "`None` to impose no limit.")
    parser.add_argument(
        '--show_available_devices',
        action='store_true',
        help="Show the list of available devices for LLM inference.")
    parser.add_argument(
        '--library_path',
        help="Absolute path to picoLLM's dynamic library.")

    args = parser.parse_args()
    access_key = args.access_key
    model_path = args.model_path
    device = args.device
    completion_token_limit = args.completion_token_limit
    stop_phrases = args.stop_phrases
    seed = args.seed
    presence_penalty = args.presence_penalty
    frequency_penalty = args.frequency_penalty
    temperature = args.temperature
    top_p = args.top_p
    dialog_mode = args.dialog_mode
    system_instruction = args.system_instruction
    history = args.history
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

    o = picollm.create(
        access_key=access_key,
        model_path=model_path,
        device=device,
        library_path=library_path)
    print(f"picoLLM `{o.version}`")
    print(f"Loaded `{o.model}`")
    print("Enter a prompt to start chatting (press Ctrl+C to interrupt the LLM)")

    dialog = o.get_dialog(mode=dialog_mode, history=history, system=system_instruction)

    is_interrupt = [False]

    def interrupt_generate(_, __):
        is_interrupt[0] = True
        print("\n\nInterrupting generate...")
        o.interrupt()

    def chat_exit(_, __):
        sys.exit(0)

    def stream_callback(token: str):
        if not is_interrupt[0]:
            print(token, flush=True, end='')

    try:
        while True:
            signal.signal(signal.SIGINT, chat_exit)
            prompt = input(">>> ")
            dialog.add_human_request(prompt)

            signal.signal(signal.SIGINT, interrupt_generate)
            res = o.generate(
                prompt=dialog.prompt(),
                completion_token_limit=completion_token_limit,
                stop_phrases=stop_phrases,
                seed=seed,
                presence_penalty=presence_penalty,
                frequency_penalty=frequency_penalty,
                temperature=temperature,
                top_p=top_p,
                stream_callback=stream_callback)
            print()
            dialog.add_llm_response(res.completion)
    finally:
        o.release()


if __name__ == '__main__':
    main()
