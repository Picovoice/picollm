/*
  Copyright 2024 Picovoice Inc.

  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

/* eslint camelcase: 0 */

import { PicoLLMModel } from './types';
import * as PicoLLMErrors from './picollm_errors';

import { open } from '@picovoice/web-utils';

const BACKOFF_CAP_MILLISECONDS = 5000;
const BACKOFF_START_MILLISECONDS = 2;

async function getModelFileStream(
  modelFile: File | Blob
): Promise<ReadableStreamDefaultReader<Uint8Array>> {
  try {
    return modelFile.stream().getReader();
  } catch (e) {
    throw new PicoLLMErrors.PicoLLMInvalidArgumentError(
      `Unable to read model from ${modelFile}`
    );
  }
}

async function fetchModelStream(
  modelUrl: string,
  numFetchRetries: number
): Promise<ReadableStreamDefaultReader<Uint8Array>> {
  if (numFetchRetries < 0) {
    throw Error('numFetchRetries must be a positive number');
  }

  let waitTimeMilliseconds = BACKOFF_START_MILLISECONDS;
  const delay = (delayMilliseconds: number): Promise<void> =>
    new Promise(resolve => {
      setTimeout(resolve, delayMilliseconds);
    });

  let numAttemptsLeft: number = numFetchRetries + 1;
  let error: Error | null = null;
  while (numAttemptsLeft > 0) {
    error = null;
    try {
      const res = await fetch(modelUrl, {
        cache: 'no-cache',
      });
      if (res.ok && res.body) {
        return res.body.getReader();
      }
      error = new PicoLLMErrors.PicoLLMInvalidArgumentError(
        `Unable to get model from '${modelUrl}'`
      );
    } catch (e: any) {
      error = new PicoLLMErrors.PicoLLMIOError(
        `Failed to fetch model from '${modelUrl}': ${e.message}`
      );
    }

    numAttemptsLeft--;
    await delay(waitTimeMilliseconds);
    waitTimeMilliseconds = Math.min(
      BACKOFF_CAP_MILLISECONDS,
      waitTimeMilliseconds * BACKOFF_START_MILLISECONDS
    );
  }

  if (error !== null) {
    throw error;
  } else {
    throw new PicoLLMErrors.PicoLLMIOError(
      `Unexpected error encountered while fetching model from '${modelUrl}'`
    );
  }
}

export async function loadModel(model: PicoLLMModel): Promise<string> {
  if (model === undefined || model === null) {
    throw new PicoLLMErrors.PicoLLMInvalidArgumentError(
      'The model is undefined / empty'
    );
  }

  const {
    modelFile,
    cacheFilePath = 'picollm_model',
    cacheFileVersion = 0,
    cacheFileOverwrite = false,
    numFetchRetries = 0,
  } = model;

  const pvFile = await open(cacheFilePath, 'w');
  if (
    cacheFileOverwrite ||
    pvFile.meta === undefined ||
    cacheFileVersion > pvFile.meta.version! ||
    (pvFile.meta.pageSize !== pvFile.pageSize)
  ) {
    const modelChunks = Array.isArray(modelFile) ? modelFile : [modelFile];
    for (const modelChunk of modelChunks) {
      const reader =
        typeof modelChunk === 'string'
          ? await fetchModelStream(modelChunk as string, numFetchRetries)
          : await getModelFileStream(modelChunk as File | Blob);

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        if (value) {
          await pvFile.write(value);
        }
      }
    }

    pvFile.close();
  }

  return cacheFilePath;
}
