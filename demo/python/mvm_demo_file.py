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

import argparse
import struct
import wave

import pvmvm


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        '--input_weight_file',
        help='Absolute path to input weight file.',
        required=True)

    parser.add_argument(
        '--iterations',
        help='Number of iterations to compute.',
        default=10)

    parser.add_argument(
        '--library_path',
        help='Absolute path to dynamic library. Default: using the library provided by `pvmvm`')

    args = parser.parse_args()

    try:
        mvm = pvmvm.create(library_path=args.library_path)
        mvm.load_model_file(args.input_weight_file)
    except pvmvm.MvmInvalidArgumentError as e:
        print(e)
        raise e
    except pvmvm.MvmError as e:
        print("Failed to initialize Mvm")
        raise e

    print("Mvm version: %s" % mvm.version)

    _, matrix_n = mvm.matrix_dimensions()
    vector = [1.0] * matrix_n

    result_vector = mvm.chain_multiply(vector, iterations=args.iterations)
    print("Results:", result_vector[0:4], "...")

    mvm.delete()


if __name__ == '__main__':
    main()
