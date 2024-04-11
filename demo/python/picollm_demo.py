#
# Copyright 2023 Picovoice Inc.
#
# You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
# file accompanying this source.
#
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.
#

from argparse import ArgumentParser
import numpy as np

import pvpicollm


def main():
    parser = ArgumentParser()
    parser.add_argument('--access_key', required=True)
    parser.add_argument('--model_path', required=True)
    parser.add_argument('--device', default="cpu:8")
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--generate', nargs='+', default=None)
    group.add_argument('--forward', type=int, default=None)
    parser.add_argument('--temperature', type=float, default=0.)
    parser.add_argument('--completion_token_limit', type=int, default=128)
    args = parser.parse_args()

    access_key = args.access_key
    model_path = args.model_path
    device_string = args.device
    o = pvpicollm.create(
        access_key=access_key,
        model_path=model_path,
        device_string=device_string)
    print(o.version)

    if args.generate is not None:
        o.generate(
            prompt=' '.join(args.generate),
            temperature=args.temperature,
            completion_token_limit=args.completion_token_limit,
            stream_callback=lambda x: print(x, end=''))
        print('\n')
    elif args.forward is not None:
        logits = o.forward(token=args.forward)
        res = np.argmax(logits)
        print(res, end=' ', flush=True)
        for i in range(args.completion_token_limit - 1):
            logits = o.forward(res)
            res = np.argmax(logits)
            print(res, end=' ', flush=True)
        print()
    else:
        raise ValueError()

    o.release()


if __name__ == '__main__':
    main()
