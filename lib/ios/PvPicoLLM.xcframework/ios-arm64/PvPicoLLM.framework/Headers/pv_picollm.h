/*
    Copyright 2023-2024 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
    file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
    an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

#ifndef PV_PICOLLM_H
#define PV_PICOLLM_H

#include <stdbool.h>
#include <stdint.h>

#include "picovoice.h"

#ifdef __cplusplus

extern "C" {

#endif

/**
 * Forward declaration for picoLLM inference engine.
 */
typedef struct pv_picollm pv_picollm_t;

/**
 * Constructor.
 *
 * @param access_key AccessKey obtained from Picovoice Console (https://console.picovoice.ai/).
 * @param model_path Absolute path to the file containing LLM parameters.
 * @param device String representation of the device (e.g., CPU or GPU) to use for inference. If set to `best`, picoLLM
 * picks the most suitable device. If set to `gpu`, the engine uses the first available GPU device. To select a specific
 * GPU device, set this argument to `gpu:${GPU_INDEX}`, where `${GPU_INDEX}` is the index of the target GPU. If set to
 * `cpu`, the engine will run on the CPU with the default number of threads. To specify the number of threads, set this
 * argument to `cpu:${NUM_THREADS}`, where `${NUM_THREADS}` is the desired number of threads.
 * @param[out] object Constructed instance of picoLLM.
 * @return Status code. Returns `PV_STATUS_OUT_OF_MEMORY`, `PV_STATUS_IO_ERROR`, `PV_STATUS_INVALID_ARGUMENT`,
 * `PV_STATUS_RUNTIME_ERROR`, `PV_STATUS_ACTIVATION_ERROR`, `PV_STATUS_ACTIVATION_LIMIT_REACHED`,
 * `PV_STATUS_ACTIVATION_THROTTLED`, or `PV_STATUS_ACTIVATION_REFUSED` on failure.
 */
PV_API pv_status_t pv_picollm_init(
        const char *access_key,
        const char *model_path,
        const char *device,
        pv_picollm_t **object);

/**
 * Destructor.
 *
 * @param object picoLLM object.
 */
PV_API void pv_picollm_delete(pv_picollm_t *object);

/**
 * Usage information.
 */
typedef struct {
    /** Number of tokens in the prompt. */
    int32_t prompt_tokens;
    /** Number of tokens in the completion. */
    int32_t completion_tokens;
} pv_picollm_usage_t;

/**
 * Reasons for ending the generation process.
 */
typedef enum {
    PV_PICOLLM_ENDPOINT_END_OF_SENTENCE = 0,
    PV_PICOLLM_ENDPOINT_COMPLETION_TOKEN_LIMIT_REACHED = 1,
    PV_PICOLLM_ENDPOINT_STOP_PHRASE_ENCOUNTERED = 2,
} pv_picollm_endpoint_t;

/**
 * Generated token and its log probability.
 */
typedef struct {
    /** Token. */
    char *token;
    /** Log probability. */
    float log_prob;
} pv_picollm_token_t;

/**
 * Generated token within completion and top alternative tokens.
 */
typedef struct {
    /** Token. */
    pv_picollm_token_t token;
    /** Number of top choices. */
    int32_t num_top_choices;
    /** Top choices. */
    pv_picollm_token_t *top_choices;
} pv_picollm_completion_token_t;

/**
 * Stream callback function type used in `pv_picollm_generate()`.
 */
typedef void (*pv_picollm_stream_callback_t)(const char *, void *);

/**
 * Given a text prompt and a set of generation parameters, creates a completion text and relevant metadata. The caller
 * is responsible for freeing completion and metadata objects using `pv_picollm_delete_completion()` and
 * `pv_picollm_delete_completion_tokens()`.
 *
 * @param object picoLLM object.
 * @param prompt Prompt.
 * @param completion_token_limit Maximum number of tokens in the completion. If the generation process stops due to
 * reaching this limit, the `endpoint` output argument will be `PV_PICOLLM_ENDPOINT_COMPLETION_TOKEN_LIMIT_REACHED`. Set
 * to `-1` to impose no limit.
 * @param stop_phrases The generation process stops when it encounters any of these phrases in the completion. The
 * already generated completion, including the encountered stop phrase, will be returned. The `endpoint` output argument
 * will be `PV_PICOLLM_ENDPOINT_STOP_PHRASE_ENCOUNTERED`. Set to `NULL` to turn off this feature.
 * @param num_stop_phrases Number of stop phrases. Set to `0` to turn off this feature.
 * @param seed The internal random number generator uses it as its seed if set to a positive integer value. Seeding
 * enforces deterministic outputs. Set to `-1` for randomized outputs for a given prompt.
 * @param presence_penalty It penalizes logits already appearing in the partial completion if set to a positive value.
 * If set to `0.0`, it has no effect.
 * @param frequency_penalty If set to a positive floating-point value, it penalizes logits proportional to the frequency
 * of their appearance in the partial completion. If set to `0.0`, it has no effect.
 * @param temperature Sampling temperature. Temperature is a non-negative floating-point value that controls the
 * randomness of the sampler. A higher temperature smoothens the samplers' output, increasing the randomness. In
 * contrast, a lower temperature creates a narrower distribution and reduces variability. Setting it to `0` selects the
 * maximum logit during sampling.
 * @param top_p A positive floating-point number within (0, 1]. It restricts the sampler's choices to high-probability
 * logits that form the `top_p` portion of the probability mass. Hence, it avoids randomly selecting unlikely logits.
 * A value of `1.` enables the sampler to pick any token with non-zero probability, turning off the feature.
 * @param num_top_choices If set to a positive value, picoLLM returns the list of the highest probability tokens for any
 * generated token. Set to `0` to turn off the feature. The maximum number of top choices is
 * `pv_picollm_max_top_choices()`.
 * @param stream_callback If not set to `NULL`, picoLLM executes this callback every time a new piece of completion
 * string becomes available.
 * @param stream_callback_context Pointer containing user-defined data that is passed to `stream_callback` on every invocation.
 * @param[out] usage Number of tokens in the prompt and completion.
 * @param[out] endpoint Indicates the reason for termination of generation process.
 * @param[out] completion_tokens Token-level information about the generated completion.
 * @param[out] num_completion_tokens Number of tokens in the completion.
 * @param[out] completion Completion.
 * @return Status code. Returns `PV_STATUS_OUT_OF_MEMORY`, `PV_STATUS_IO_ERROR`, `PV_STATUS_INVALID_ARGUMENT`,
 * `PV_STATUS_RUNTIME_ERROR`, `PV_STATUS_ACTIVATION_ERROR`, `PV_STATUS_ACTIVATION_LIMIT_REACHED`,
 * `PV_STATUS_ACTIVATION_THROTTLED`, or `PV_STATUS_ACTIVATION_REFUSED` on failure.
 */
PV_API pv_status_t pv_picollm_generate(
        pv_picollm_t *object,
        const char *prompt,
        int32_t completion_token_limit,
        const char *const *stop_phrases,
        int32_t num_stop_phrases,
        int32_t seed,
        float presence_penalty,
        float frequency_penalty,
        float temperature,
        float top_p,
        int32_t num_top_choices,
        pv_picollm_stream_callback_t stream_callback,
        void *stream_callback_context,
        pv_picollm_usage_t *usage,
        pv_picollm_endpoint_t *endpoint,
        pv_picollm_completion_token_t **completion_tokens,
        int32_t *num_completion_tokens,
        char **completion);

/**
 * Deletes completion tokens returned by `pv_picollm_generate()`.
 *
 * @param completion_tokens Completion tokens.
 * @param num_completion_tokens Number of completion tokens.
 */
PV_API void pv_picollm_delete_completion_tokens(
        pv_picollm_completion_token_t *completion_tokens,
        int32_t num_completion_tokens);

/**
 * Deletes the completion text returned by `pv_picollm_generate()`.
 *
 * @param completion Completion.
 */
PV_API void pv_picollm_delete_completion(char *completion);

/**
 * Tokenizes a given text using the model's tokenizer. The caller is responsible for freeing the returned tokens buffer
 * using `pv_picollm_delete_tokens()`. This is a low-level function meant for benchmarking and advanced usage.
 * `pv_picollm_generate()` should be used when possible.
 *
 * @param object picoLLM object.
 * @param text Text.
 * @param bos If set to `true`, the tokenizer prepends the beginning of the sentence token to the result.
 * @param eos If set to `true`, the tokenizer appends the end of the sentence token to the result.
 * @param[out] num_tokens Number of tokens.
 * @param[out] tokens Tokens representing the input text.
 * @return Status code. Returns `PV_STATUS_OUT_OF_MEMORY` or `PV_STATUS_INVALID_ARGUMENT` on failure.
 */
PV_API pv_status_t pv_picollm_tokenize(
        const pv_picollm_t *object,
        const char *text,
        bool bos,
        bool eos,
        int32_t *num_tokens,
        int32_t **tokens);

/**
 * Deletes tokens returned by `pv_picollm_tokenize()`.
 *
 * @param tokens Tokens.
 */
PV_API void pv_picollm_delete_tokens(int32_t *tokens);

/**
 * Performs a single forward pass given a token and returns the logits. The caller is responsible for freeing the logits
 * buffer using `pv_picollm_delete_logits()`. This is a low-level function for benchmarking and advanced usage.
 * `pv_picollm_generate()` should be used when possible.
 *
 * @param object picoLLM object.
 * @param token Input token.
 * @param[out] num_logits Number of logits.
 * @param[out] logits Logits.
 * @return Status code. Returns `PV_STATUS_OUT_OF_MEMORY`, `PV_STATUS_INVALID_ARGUMENT`, `PV_STATUS_INVALID_STATE`,
 * `PV_STATUS_RUNTIME_ERROR`, `PV_STATUS_ACTIVATION_ERROR`, `PV_STATUS_ACTIVATION_LIMIT_REACHED`,
 * `PV_STATUS_ACTIVATION_THROTTLED`, or `PV_STATUS_ACTIVATION_REFUSED` on failure.
 */
PV_API pv_status_t pv_picollm_forward(
        pv_picollm_t *object,
        int32_t token,
        int32_t *num_logits,
        float **logits);

/**
 * Deletes logits returned by `pv_picollm_forward()`.
 *
 * @param logits Logits.
 */
PV_API void pv_picollm_delete_logits(float *logits);

/**
 * Resets the internal state of LLM. It should be called in conjunction with `pv_picollm_forward()` when processing a
 * new sequence of tokens. This is a low-level function for benchmarking and advanced usage. `pv_picollm_generate()`
 * should be used when possible.
 *
 * @param object picoLLM object.
 * @return Status code. Returns `PV_STATUS_INVALID_ARGUMENT` on failure.
 */
PV_API pv_status_t pv_picollm_reset(pv_picollm_t *object);

/**
 * Getter for model's name.
 *
 * @param object picoLLM object.
 * @param[out] model Model's name.
 * @return Status code. Returns `PV_STATUS_INVALID_ARGUMENT` on failure.
 */
PV_API pv_status_t pv_picollm_model(const pv_picollm_t *object, const char **model);

/**
 * Getter for model's context length.
 *
 * @param object picoLLM object.
 * @param[out] context_length Model's context length.
 * @return Status code. Returns `PV_STATUS_INVALID_ARGUMENT` on failure.
 */
PV_API pv_status_t pv_picollm_context_length(const pv_picollm_t *object, int32_t *context_length);

/**
 * Getter for version.
 *
 * @return Version.
 */
PV_API const char *pv_picollm_version(void);

/**
 * Getter for maximum number of top choices for `pv_picollm_generate()`.
 *
 * @return Maximum number of top choices.
 */
PV_API int32_t pv_picollm_max_top_choices(void);

/**
 * Gets a list of hardware devices that can be specified when calling `pv_picollm_init`
 *
 * @param[out] hardware_devices Array of available hardware devices. Devices are NULL terminated strings.
 *                              The array must be freed using `pv_xpu_free_hardware_devices`.
 * @param[out] num_hardware_devices The number of devices in the `hardware_devices` array.
 * @return Status code. Returns `PV_STATUS_OUT_OF_MEMORY`, `PV_STATUS_INVALID_ARGUMENT`, `PV_STATUS_INVALID_STATE`,
 * `PV_STATUS_RUNTIME_ERROR`, `PV_STATUS_ACTIVATION_ERROR`, `PV_STATUS_ACTIVATION_LIMIT_REACHED`,
 * `PV_STATUS_ACTIVATION_THROTTLED`, or `PV_STATUS_ACTIVATION_REFUSED` on failure.
 */
PV_API pv_status_t pv_picollm_list_hardware_devices(
        char ***hardware_devices,
        int32_t *num_hardware_devices);

/**
 * Frees memory allocated by `pv_picollm_list_hardware_devices`.
 *
 * @param[out] hardware_devices Array of available hardware devices allocated by `pv_picollm_list_hardware_devices`.
 * @param[out] num_hardware_devices The number of devices in the `hardware_devices` array.
 */
PV_API void pv_picollm_free_hardware_devices(
        char **hardware_devices,
        int32_t num_hardware_devices);

#ifdef __cplusplus

}

#endif

#endif // PV_PICOLLM_H
