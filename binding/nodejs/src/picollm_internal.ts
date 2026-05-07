//
// Copyright 2026 Picovoice Inc.
//
// You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
// file accompanying this source.
//
// Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
// an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
// specific language governing permissions and limitations under the License.
//

import * as fs from 'fs';

import PvStatus from './pv_status_t';

import {
  PicoLLMCompletion,
  PicoLLMGenerateOCROptions,
  PicoLLMGenerateOptions,
  PicoLLMGenerateWithImageOptions,
  PicoLLMImage,
  PicoLLMOptions,
} from './types';

import { getSystemLibraryPath } from './platforms';

export class PicoLLMErrorInternal extends Error {
  private readonly _status: PvStatus;
  private readonly _message: string;
  private readonly _messageStack: string[];

  constructor(status: PvStatus, message: string, messageStack: string[] = []) {
    super();
    this._status = status;
    this._message = message;
    this._messageStack = messageStack;
  }

  get status(): PvStatus {
    return this._status;
  }

  get message(): string {
    return this._message;
  }

  get messageStack(): string[] {
    return this._messageStack;
  }
}

export class PicoLLMOutOfMemoryError extends PicoLLMErrorInternal {}
export class PicoLLMIOError extends PicoLLMErrorInternal {}
export class PicoLLMInvalidArgumentError extends PicoLLMErrorInternal {}
export class PicoLLMStopIterationError extends PicoLLMErrorInternal {}
export class PicoLLMKeyError extends PicoLLMErrorInternal {}
export class PicoLLMInvalidStateError extends PicoLLMErrorInternal {}
export class PicoLLMRuntimeError extends PicoLLMErrorInternal {}
export class PicoLLMActivationError extends PicoLLMErrorInternal {}
export class PicoLLMActivationLimitReachedError extends PicoLLMErrorInternal {}
export class PicoLLMActivationThrottledError extends PicoLLMErrorInternal {}
export class PicoLLMActivationRefusedError extends PicoLLMErrorInternal {}

export function pvStatusToException(
  pvStatus: PvStatus | string,
  errorMessage: string,
  messageStack: string[] = []
): PicoLLMErrorInternal {
  const status = (typeof pvStatus === "string") ? PvStatus[pvStatus as any] : pvStatus;

  switch (status) {
    case PvStatus.OUT_OF_MEMORY:
      return new PicoLLMOutOfMemoryError(status, errorMessage, messageStack);
    case PvStatus.IO_ERROR:
      return new PicoLLMIOError(status, errorMessage, messageStack);
    case PvStatus.INVALID_ARGUMENT:
      return new PicoLLMInvalidArgumentError(status, errorMessage, messageStack);
    case PvStatus.STOP_ITERATION:
      return new PicoLLMStopIterationError(status, errorMessage, messageStack);
    case PvStatus.KEY_ERROR:
      return new PicoLLMKeyError(status, errorMessage, messageStack);
    case PvStatus.INVALID_STATE:
      return new PicoLLMInvalidStateError(status, errorMessage, messageStack);
    case PvStatus.RUNTIME_ERROR:
      return new PicoLLMRuntimeError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_ERROR:
      return new PicoLLMActivationError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_LIMIT_REACHED:
      return new PicoLLMActivationLimitReachedError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_THROTTLED:
      return new PicoLLMActivationThrottledError(status, errorMessage, messageStack);
    case PvStatus.ACTIVATION_REFUSED:
      return new PicoLLMActivationRefusedError(status, errorMessage, messageStack);
    default:
      // eslint-disable-next-line no-console
      console.warn(`Unmapped error code: ${status}`);
      return new PicoLLMErrorInternal(PvStatus.RUNTIME_ERROR, errorMessage);
  }
}

type PicoLLMInitResult = {
  handle: any;
  status: PvStatus;
};
type PicoLLMGenerateResult = {
  completion: {
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
    };
    endpoint: number;
    completion_tokens: {
      token: {
        token: string;
        log_prob: number;
      }
      top_choices: {
        token: string;
        log_prob: number;
      }[];
    }[] | null;
    completion: string;
  };
  status: PvStatus;
  errorStack: string[];
};
type PicoLLMGenerateOCRResult = {
  completion: {
    endpoint: number;
    completion: string;
  };
  status: PvStatus;
  errorStack: string[];
};
type PicoLLMGenerateEmbeddingsResult = {
  embeddings: Float32Array;
  status: PvStatus;
};
type PicoLLMTokenizeResult = {
  tokens: number[];
  status: PvStatus;
};
type PicoLLMForwardResult = {
  logits: number[];
  status: PvStatus;
};
type PicoLLMModelResult = {
  model: string;
  status: PvStatus;
};
type PicoLLMContextLengthResult = {
  context_length: number;
  status: PvStatus;
};
type PicoLLMResult = {
  status: PvStatus;
};

/**
 * Node.js binding for PicoLLM engine.
 *
 * Performs direct calls to the PicoLLM node library.
 */
export class PicoLLMInternal {
  private _pvPicoLLM: any;

  private _handle: any;

  private readonly _contextLength: number;
  private readonly _maxTopChoices: number;
  private readonly _model: string;
  private readonly _version: string;

  /**
   * Creates an instance of picoLLM.
   *
   * @param accessKey AccessKey obtained from Picovoice Console (https://console.picovoice.ai/)
   * @param modelPath Absolute path to the file containing LLM parameters.
   * @param options Optional init configuration arguments, see PicoLLMInitOptions for details.
   * @param options.device String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`,
   * picoLLM picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device. To
   * select a specific GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index of the
   * target GPU. If set to `cpu`, the engine will run on the CPU with the default number of threads. To specify the
   * number of threads, set this argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of
   * threads.
   * @param options.libraryPath Absolute path to picoLLM's dynamic library.
   *
   * @returns An instance of the PicoLLM.
   */
  constructor(accessKey: string, modelPath: string, options: PicoLLMOptions = {}) {
    if (
        accessKey === null ||
        accessKey === undefined ||
        accessKey.length === 0
    ) {
        throw new PicoLLMInvalidArgumentError(PvStatus.INVALID_ARGUMENT, 'No AccessKey provided to PicoLLM');
    }

    const {
      libraryPath = getSystemLibraryPath(),
      device = "best",
    } = options;

    if (!fs.existsSync(libraryPath)) {
      throw new PicoLLMInvalidArgumentError(
        PvStatus.INVALID_ARGUMENT,
        `File not found at 'libraryPath': ${libraryPath}`
      );
    }

    if (!fs.existsSync(modelPath)) {
      throw new PicoLLMInvalidArgumentError(
        PvStatus.INVALID_ARGUMENT,
        `File not found at 'modelPath': ${modelPath}`
      );
    }

    const pvPicoLLM = require(libraryPath); // eslint-disable-line
    this._pvPicoLLM = pvPicoLLM;

    let picoLLMInitResult: PicoLLMInitResult | null = null;
    try {
      pvPicoLLM.set_sdk('nodejs');

      picoLLMInitResult = pvPicoLLM.init(
        accessKey,
        modelPath,
        device
      );
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picoLLMInitResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to initialize');
    }

    this._handle = picoLLMInitResult!.handle;
    this._contextLength = this.getContextLength();
    this._maxTopChoices = pvPicoLLM.max_top_choices();
    this._model = this.getModel();
    this._version = pvPicoLLM.version();
  }

  /**
   * Get model's context length.
   */
  get contextLength(): number {
    return this._contextLength;
  }

  /**
   * Get maximum number of top choices for `.generate()`.
   */
  get maxTopChoices(): number {
    return this._maxTopChoices;
  }

  /**
   *  Get the model's name.
   */
  get model(): string {
    return this._model;
  }

  /**
   * Get PicoLLM version.
   */
  get version(): string {
    return this._version;
  }

  /**
   * Given a text prompt and a set of generation parameters, creates a completion text and relevant metadata.
   *
   * @param prompt Text prompt.
   * @param options Optional generate configuration arguments, see PicoLLMGenerateOptions for details.
   * @param options.completionTokenLimit Maximum number of tokens in the completion. If the generation process stops due
   * to reaching this limit, the `.endpoint` parameter in `PicoLLMCompletion` output will be
   * `PicoLLMEndpoint.COMPLETION_TOKEN_LIMIT_REACHED`. Set to `undefined` to impose no limit.
   * @param options.stopPhrases The generation process stops when it encounters any of these phrases in the completion. The
   * already generated completion, including the encountered stop phrase, will be returned. The `endpoint` parameter
   * in `PicoLLMCompletion` output will be `PicoLLMEndpoint.STOP_PHRASE_ENCOUNTERED`. Set to `undefined` to turn off this
   * feature.
   * @param options.seed The internal random number generator uses it as its seed if set to a positive integer value.
   * Seeding enforces deterministic outputs.  Set to `undefined` for randomized outputs for a given prompt.
   * @param options.presencePenalty It penalizes logits already appearing in the partial completion if set to a positive
   * value. If set to `0` or `undefined`, it has no effect.
   * @param options.frequencyPenalty If set to a positive floating-point value, it penalizes logits proportional to the
   * frequency of their appearance in the partial completion. If set to `0` or `undefined`, it has no effect.
   * @param options.temperature Sampling temperature. Temperature is a non-negative floating-point value that controls the
   * randomness of the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. In
   * contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to `0` or
   * `undefined` selects the maximum logit during sampling.
   * @param options.topP A positive floating-point number within 0, and 1. It restricts the sampler's choices to
   * high-probability logits that form the `topP` portion of the probability mass. Hence, it avoids randomly
   * selecting unlikely logits. A value of `1` or `undefined` enables the sampler to pick any token with non-zero
   * probability turning off the feature.
   * @param options.numTopChoices If set to a positive value, picoLLM returns the list of the highest probability tokens
   * for any generated token. Set to `0` to turn off the feature. The maximum number of top choices is `.maxTopChoices`.
   * @param options.streamCallback If not set to `undefined`, picoLLM executes this callback every time a new piece of
   * completion text becomes available.
   * @returns Completion result.
   */
  async generate(prompt: string, options: PicoLLMGenerateOptions = {}): Promise<PicoLLMCompletion> {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    const {
      completionTokenLimit = -1,
      stopPhrases = null,
      seed = -1,
      presencePenalty = 0.0,
      frequencyPenalty = 0.0,
      temperature = 0.0,
      topP = 1,
      numTopChoices = 0,
      streamCallback = null,
    } = options;

    const numStopPhrases = (stopPhrases !== null) ? stopPhrases.length : 0;

    if (prompt === undefined || prompt === null) {
      throw new PicoLLMInvalidArgumentError(
        PvStatus.INVALID_ARGUMENT,
        `prompt provided to 'PicoLLM.generate()' is undefined or null`
      );
    }

    let picollmGenerateResult: PicoLLMGenerateResult | null = null;
    try {
      picollmGenerateResult = await this._pvPicoLLM.generate(
        this._handle,
        prompt,
        completionTokenLimit,
        stopPhrases,
        numStopPhrases,
        seed,
        presencePenalty,
        frequencyPenalty,
        temperature,
        topP,
        numTopChoices,
        streamCallback);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmGenerateResult!.status;
    if (status !== PvStatus.SUCCESS) {
      throw pvStatusToException(status, 'PicoLLM failed to generate', picollmGenerateResult!.errorStack);
    }

    const completion = picollmGenerateResult!.completion;
    const completionTokens = completion.completion_tokens!.map(x => ({
      token: {
        token: x.token.token,
        logProb: x.token.log_prob
      },
      topChoices: x.top_choices.map(t => ({
        token: t.token,
        logProb: t.log_prob,
      })),
    }));

    return {
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens!,
      },
      endpoint: completion.endpoint,
      completionTokens: completionTokens,
      completion: completion.completion
    };
  }

  /**
   * Given a text prompt, an image, and a set of generation parameters, creates a completion text and relevant metadata.
   *
   * For use with vision models only.
   *
   * @param prompt Text prompt.
   * @param image Input image.
   * @param image.width Width of the image in pixels.
   * @param image.height Height of the image in pixels.
   * @param image.data Image pixel data in 8-bit, RGB format.
   * @param options Optional generate configuration arguments, see PicoLLMGenerateWithImageOptions for details.
   * @param options.completionTokenLimit Maximum number of tokens in the completion. If the generation process stops due
   * to reaching this limit, the `.endpoint` parameter in `PicoLLMCompletion` output will be
   * `PicoLLMEndpoint.COMPLETION_TOKEN_LIMIT_REACHED`. Set to `undefined` to impose no limit.
   * @param options.stopPhrases The generation process stops when it encounters any of these phrases in the completion. The
   * already generated completion, including the encountered stop phrase, will be returned. The `endpoint` parameter
   * in `PicoLLMCompletion` output will be `PicoLLMEndpoint.STOP_PHRASE_ENCOUNTERED`. Set to `undefined` to turn off this
   * feature.
   * @param options.seed The internal random number generator uses it as its seed if set to a positive integer value.
   * Seeding enforces deterministic outputs.  Set to `undefined` for randomized outputs for a given prompt.
   * @param options.presencePenalty It penalizes logits already appearing in the partial completion if set to a positive
   * value. If set to `0` or `undefined`, it has no effect.
   * @param options.frequencyPenalty If set to a positive floating-point value, it penalizes logits proportional to the
   * frequency of their appearance in the partial completion. If set to `0` or `undefined`, it has no effect.
   * @param options.temperature Sampling temperature. Temperature is a non-negative floating-point value that controls the
   * randomness of the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. In
   * contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to `0` or
   * `undefined` selects the maximum logit during sampling.
   * @param options.topP A positive floating-point number within 0, and 1. It restricts the sampler's choices to
   * high-probability logits that form the `topP` portion of the probability mass. Hence, it avoids randomly
   * selecting unlikely logits. A value of `1` or `undefined` enables the sampler to pick any token with non-zero
   * probability turning off the feature.
   * @param options.numTopChoices If set to a positive value, picoLLM returns the list of the highest probability tokens
   * for any generated token. Set to `0` to turn off the feature. The maximum number of top choices is `.maxTopChoices`.
   * @param options.streamCallback If not set to `undefined`, picoLLM executes this callback every time a new piece of
   * completion text becomes available.
   * @param options.promptProgressCallback If not set to `undefined`, picoLLM uses this callback to report the prompt
   * evaluation progress as a floating-point number within (0, 100]. A value of 100 indicates that prompt evaluation is
   * complete and completion tokens are now being generated.
   * @returns Completion result.
   */
  async generateWithImage(
    prompt: string,
    image: PicoLLMImage,
    options: PicoLLMGenerateWithImageOptions = {}
  ): Promise<PicoLLMCompletion> {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    const {
      completionTokenLimit = -1,
      stopPhrases = null,
      seed = -1,
      presencePenalty = 0.0,
      frequencyPenalty = 0.0,
      temperature = 0.0,
      topP = 1,
      numTopChoices = 0,
      streamCallback = null,
      promptProgressCallback = null,
    } = options;

    const numStopPhrases = (stopPhrases !== null) ? stopPhrases.length : 0;

    if (prompt === undefined || prompt === null) {
      throw new PicoLLMInvalidArgumentError(
        PvStatus.INVALID_ARGUMENT,
        `prompt provided to 'PicoLLM.generateWithImage()' is undefined or null`
      );
    }

    let picollmGenerateResult: PicoLLMGenerateResult | null = null;
    try {
      picollmGenerateResult = await this._pvPicoLLM.generate_with_image(
        this._handle,
        prompt,
        image.width,
        image.height,
        image.data,
        completionTokenLimit,
        stopPhrases,
        numStopPhrases,
        seed,
        presencePenalty,
        frequencyPenalty,
        temperature,
        topP,
        numTopChoices,
        streamCallback,
        promptProgressCallback);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmGenerateResult!.status;
    if (status !== PvStatus.SUCCESS) {
      throw pvStatusToException(status, 'PicoLLM failed to generate with image', picollmGenerateResult!.errorStack);
    }

    const completion = picollmGenerateResult!.completion;
    const completionTokens = completion.completion_tokens!.map(x => ({
      token: {
        token: x.token.token,
        logProb: x.token.log_prob
      },
      topChoices: x.top_choices.map(t => ({
        token: t.token,
        logProb: t.log_prob,
      })),
    }));

    return {
      usage: {
        promptTokens: completion.usage.prompt_tokens,
        completionTokens: completion.usage.completion_tokens,
      },
      endpoint: completion.endpoint,
      completionTokens: completionTokens,
      completion: completion.completion
    };
  }

  /**
   * Interrupts `generate()` and `generateWithImage()` if generation is in progress. Otherwise, it has no effect.
   */
  interrupt(): void {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    let picollmInterruptResult: PicoLLMResult | null = null;
    try {
      picollmInterruptResult = this._pvPicoLLM.interrupt(this._handle);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmInterruptResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to interrupt');
    }
  }

  /**
   * Generates numerical vector representations of the input text prompt.
   *
   * For use with embedding models only.
   *
   * @param prompt Text prompt.
   * @returns Generated embeddings.
   */
  async generateEmbeddings(prompt: string): Promise<Float32Array> {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    if (prompt === undefined || prompt === null) {
      throw new PicoLLMInvalidArgumentError(
        PvStatus.INVALID_ARGUMENT,
        `prompt provided to 'PicoLLM.generateEmbeddings()' is undefined or null`
      );
    }

    let generateEmbeddingsResult: PicoLLMGenerateEmbeddingsResult | null = null;
    try {
      generateEmbeddingsResult = this._pvPicoLLM.generate_embeddings(this._handle, prompt);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = generateEmbeddingsResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to generate embeddings');
    }

    return generateEmbeddingsResult!.embeddings;
  }

  /**
   * Generates a completion text representing text found in the given image.
   *
   * For use with OCR (Optical Character Recognition) models only.
   *
   * @param image Prompt image.
   * @param image.width Width of the image in pixels.
   * @param image.height Height of the image in pixels.
   * @param image.data Image pixel data in 8-bit, RGB format.
   * @param options Optional generate configuration arguments, see PicoLLMGenerateOCROptions for details.
   * @param options.completionTokenLimit Maximum number of tokens in the completion. If the generation process stops due
   * to reaching this limit, the `.endpoint` parameter in `PicoLLMCompletion` output will be
   * `PicoLLMEndpoint.COMPLETION_TOKEN_LIMIT_REACHED`. Set to `undefined` to impose no limit.
   * @param options.streamCallback If not set to `undefined`, picoLLM executes this callback every time a new piece of
   * completion text becomes available.
   * @param options.promptProgressCallback If not set to `undefined`, picoLLM uses this callback to report the prompt
   * evaluation progress as a floating-point number within (0, 100]. A value of 100 indicates that prompt evaluation is
   * complete and completion tokens are now being generated.
   * @returns Completion result.
   */
  async generateOCR(
    image: PicoLLMImage,
    options: PicoLLMGenerateOCROptions = {}
  ): Promise<PicoLLMCompletion> {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    const {
      completionTokenLimit = -1,
      streamCallback = null,
      promptProgressCallback = null,
    } = options;

    let picollmGenerateOCRResult: PicoLLMGenerateOCRResult | null = null;
    try {
      picollmGenerateOCRResult = await this._pvPicoLLM.generate_ocr(
        this._handle,
        image.width,
        image.height,
        image.data,
        completionTokenLimit,
        streamCallback,
        promptProgressCallback);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmGenerateOCRResult!.status;
    if (status !== PvStatus.SUCCESS) {
      throw pvStatusToException(status, 'PicoLLM failed to generate OCR', picollmGenerateOCRResult!.errorStack);
    }

    return {
      endpoint: picollmGenerateOCRResult!.completion.endpoint,
      completion: picollmGenerateOCRResult!.completion.completion
    };
  }

  /**
   * Tokenizes a given text using the model's tokenizer. This is a low-level function meant for benchmarking and
   * advanced usage. `.generate()` should be used when possible.
   *
   * @param text Text.
   * @param bos If set to `True`, the tokenizer prepends the beginning of the sentence token to the result.
   * @param eos If set to `True`, the tokenizer appends the end of the sentence token to the result.
   * @returns Tokens representing the input text.
   */
  tokenize(text: string, bos: boolean, eos: boolean): number[] {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    if (text === undefined || text === null) {
      throw new PicoLLMInvalidArgumentError(
        PvStatus.INVALID_ARGUMENT,
        `text provided to 'PicoLLM.tokenize()' is undefined or null`
      );
    }

    let picollmTokenizeResult: PicoLLMTokenizeResult | null = null;
    try {
      picollmTokenizeResult = this._pvPicoLLM.tokenize(
        this._handle,
        text,
        bos,
        eos);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmTokenizeResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to tokenize');
    }

    return picollmTokenizeResult!.tokens;
  }

  /**
   * Performs a single forward pass given a token and returns the logits. This is a low-level function for
   * benchmarking and advanced usage. `.generate()` should be used when possible.
   *
   * @param token Input token.
   * @returns Logits.
   */
  forward(token: number): number[] {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    let picollmForwardResult: PicoLLMForwardResult | null = null;
    try {
      picollmForwardResult = this._pvPicoLLM.forward(this._handle, token);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmForwardResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to forward');
    }

    return picollmForwardResult!.logits;
  }

  /**
   * Resets the internal state of LLM. It should be called in conjunction with `.forward()` when processing a new
   * sequence of tokens. This is a low-level function for benchmarking and advanced usage. `.generate()` should be
   * used when possible.
   */
  reset(): void {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    let picollmResetResult: PicoLLMResult | null = null;
    try {
      picollmResetResult = this._pvPicoLLM.reset(this._handle);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmResetResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to reset');
    }
  }

  /**
   * Releases resources acquired by picoLLM.
   */
  release(): void {
    if (this._handle !== 0) {
      try {
        this._pvPicoLLM.delete(this._handle);
      } catch (err: any) {
        throw pvStatusToException(<PvStatus>err.code, err);
      }
      this._handle = 0;
    } else {
      // eslint-disable-next-line no-console
      console.warn('PicoLLM is not initialized');
    }
  }

  private getContextLength(): number {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    let picollmContextLengthResult: PicoLLMContextLengthResult | null = null;
    try {
      picollmContextLengthResult = this._pvPicoLLM.context_length(this._handle);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmContextLengthResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to get model');
    }

    return picollmContextLengthResult!.context_length;
  }

  private getModel(): string {
    if (
      this._handle === 0 ||
      this._handle === null ||
      this._handle === undefined
    ) {
      throw new PicoLLMInvalidStateError(PvStatus.INVALID_STATE, 'PicoLLM is not initialized');
    }

    let picollmModelResult: PicoLLMModelResult | null = null;
    try {
      picollmModelResult = this._pvPicoLLM.model(this._handle);
    } catch (err: any) {
      throw pvStatusToException(<PvStatus>err.code, err);
    }

    const status = picollmModelResult!.status;
    if (status !== PvStatus.SUCCESS) {
      this.handlePvStatus(status, 'PicoLLM failed to get model');
    }

    return picollmModelResult!.model;
  }

  private handlePvStatus(status: PvStatus, message: string): void {
    const errorObject = this._pvPicoLLM.get_error_stack();
    if (errorObject.status === PvStatus.SUCCESS) {
      throw pvStatusToException(status, message, errorObject.message_stack);
    } else {
      throw pvStatusToException(status, 'Unable to get PicoLLM error state');
    }
  }
}
