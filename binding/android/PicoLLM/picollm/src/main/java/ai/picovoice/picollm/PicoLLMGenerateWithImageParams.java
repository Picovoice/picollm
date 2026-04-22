/*
    Copyright 2026 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is
    located in the "LICENSE" file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the
    License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
    express or implied. See the License for the specific language governing permissions and
    limitations under the License.
*/

package ai.picovoice.picollm;

/**
 * Class for configuring generation parameters when calling `PicoLLM.generate()`.
 */
public class PicoLLMGenerateWithImageParams extends PicoLLMGenerateParams {

    private PicoLLMProgressCallback progressCallback;

    /**
     * Constructor.
     *
     * @param completionTokenLimit The maximum number of tokens allowed in the completion.
     *                             If the generation process stops due to reaching this limit,
     *                             the endpoint output argument will indicate a completion token
     *                             limit reached condition. Set to `-1` to impose no limit.
     * @param stopPhrases          Phrases that trigger early completion termination.
     *                             The generation process stops when it encounters any of
     *                             these phrases in the completion. The already generated
     *                             completion, including the encountered stop phrase, will be
     *                             returned. Set to `null` to turn off this feature.
     * @param seed                 The seed value for the internal random number generator.
     *                             Seeding enforces deterministic outputs.
     *                             Set to -1 for randomized outputs for a given prompt.
     * @param presencePenalty      Penalty for presence of tokens in the generated completion.
     *                             It penalizes logits already appearing in the partial completion
     *                             if set to a positive value. If set to `0.0`, it has no effect.
     * @param frequencyPenalty     Penalty for the frequency of tokens in the generated completion.
     *                             If set to a positive floating-point value, it penalizes logits
     *                             proportional to the frequency of their appearance in the partial
     *                             completion. If set to `0.0`, it has no effect.
     * @param temperature          Sampling temperature.
     *                             A higher temperature smoothens the sampler's output, increasing
     *                             the randomness. In contrast, a lower temperature creates a
     *                             narrower distribution and reduces variability. Setting it to
     *                             `0` selects the maximum logit during sampling.
     * @param topP                 A positive floating-point number within (0, 1].
     *                             It restricts the sampler's choices to high-probability logits
     *                             that form the `topP` portion of the probability mass. Hence, it
     *                             avoids randomly selecting unlikely logits. A value of `1.0`
     *                             enables the sampler to pick any token with non-zero probability,
     *                             turning off the feature.
     * @param numTopChoices        If set to a positive value, picoLLM returns the list of the
     *                             highest probability tokens for any generated token.
     *                             Set to `0` to turn off the feature.
     *                             The maximum number of top choices is determined by
     *                             `PicoLLM.getMaxTopChoices()`.
     * @param streamCallback       If not set to `null`, picoLLM executes this callback every time
     *                             a new piece of completion string becomes available.
     * @param progressCallback     If not set to `null`, picoLLM uses this callback to report the
     *                             prompt evaluation progress as a floating-point number within (0, 100].
     *                             A value of 100 indicates that prompt evaluation is complete and
     *                             completion tokens are now being generated
     */
    public PicoLLMGenerateWithImageParams(
            int completionTokenLimit,
            String[] stopPhrases,
            int seed,
            float presencePenalty,
            float frequencyPenalty,
            float temperature,
            float topP,
            int numTopChoices,
            PicoLLMStreamCallback streamCallback,
            PicoLLMProgressCallback progressCallback) {
        super(
            completionTokenLimit,
            stopPhrases,
            seed,
            presencePenalty,
            frequencyPenalty,
            temperature,
            topP,
            numTopChoices,
            streamCallback);
        this.progressCallback = progressCallback;
    }

    /**
     * Gets the progress callback.
     *
     * @return The progress callback.
     *     If not set to null, TODO
     */
    public PicoLLMProgressCallback getProgressCallback() {
        return progressCallback;
    }

    /**
     * Sets the progress callback.
     *
     * @param progressCallback The progress callback.
     *                       If not set to null, TODO
     */
    public void setProgressCallback(PicoLLMProgressCallback progressCallback) {
        this.progressCallback = progressCallback;
    }

    /**
     * Builder class for creating a `PicoLLMGenerateParams` instance.
     */
    public static class Builder {
        private Integer completionTokenLimit = null;
        private String[] stopPhrases = null;
        private Integer seed = null;
        private float presencePenalty = 0;
        private float frequencyPenalty = 0;
        private float temperature = 0;
        private float topP = 1;
        private int numTopChoices = 0;
        private PicoLLMStreamCallback streamCallback = null;
        private PicoLLMProgressCallback progressCallback = null;

        /**
         * Sets the maximum number of tokens allowed in the completion.
         *
         * @param completionTokenLimit The maximum number of tokens allowed in the completion.
         *                             If the generation process stops due to reaching this limit,
         *                             the endpoint output argument will indicate a completion token
         *                             limit reached condition.If not set, there will be no limit
         *                             imposed.
         * @return {@code Builder} instance.
         */
        public Builder setCompletionTokenLimit(Integer completionTokenLimit) {
            this.completionTokenLimit = completionTokenLimit;
            return this;
        }

        /**
         * Sets the phrases that trigger early completion termination.
         *
         * @param stopPhrases Phrases that trigger early completion termination.
         *                    The generation process stops when it encounters any of these phrases
         *                    in the completion. The already generated completion, including the
         *                    encountered stop phrase, will be returned. Set to {@code null} to turn off this feature.
         * @return {@code Builder} instance.
         */
        public Builder setStopPhrases(String[] stopPhrases) {
            this.stopPhrases = stopPhrases;
            return this;
        }

        /**
         * Sets the seed value for the internal random number generator.
         *
         * @param seed The seed value for the internal random number generator.
         *             Seeding enforces deterministic outputs.
         *             If not set, randomized outputs will be generated for a given prompt.
         * @return {@code Builder} instance.
         */
        public Builder setSeed(Integer seed) {
            this.seed = seed;
            return this;
        }

        /**
         * Sets the presence penalty.
         *
         * @param presencePenalty The presence penalty.
         *                        It penalizes logits already appearing in the partial completion if
         *                        set to a positive value. If set to 0.0, it has no effect.
         * @return {@code Builder} instance.
         */
        public Builder setPresencePenalty(float presencePenalty) {
            this.presencePenalty = presencePenalty;
            return this;
        }

        /**
         * Sets the frequency penalty.
         *
         * @param frequencyPenalty The frequency penalty.
         *                         If set to a positive floating-point value, it penalizes logits
         *                         proportional to the frequency of their appearance in the partial
         *                         completion. If set to 0.0, it has no effect.
         * @return {@code Builder} instance.
         */
        public Builder setFrequencyPenalty(float frequencyPenalty) {
            this.frequencyPenalty = frequencyPenalty;
            return this;
        }

        /**
         * Sets the temperature parameter.
         *
         * @param temperature The temperature parameter.
         *                    A higher temperature smoothens the sampler's output, increasing the
         *                    randomness. In contrast, a lower temperature creates a narrower
         *                    distribution and reduces variability. Setting it to 0 selects the
         *                    maximum logit during sampling.
         * @return {@code Builder} instance.
         */
        public Builder setTemperature(float temperature) {
            this.temperature = temperature;
            return this;
        }

        /**
         * Sets the top-p parameter.
         *
         * @param topP The top-p parameter.
         *             A positive floating-point number within (0, 1].
         *             It restricts the sampler's choices to high-probability logits that form the
         *             top_p portion of the probability mass. Hence, it avoids randomly selecting
         *             unlikely logits. A value of 1.0 enables the sampler to pick any token with
         *             non-zero probability, turning off the feature.
         * @return {@code Builder} instance.
         */
        public Builder setTopP(float topP) {
            this.topP = topP;
            return this;
        }

        /**
         * Sets the number of top choices.
         *
         * @param numTopChoices The number of top choices.
         *                      If set to a positive value, picoLLM returns the list of the highest
         *                      probability tokens for any generated token.
         *                      Set to 0 to turn off the feature. The maximum number of top choices
         *                      is determined by pv_picollm_max_top_choices().
         * @return {@code Builder} instance.
         */
        public Builder setNumTopChoices(int numTopChoices) {
            this.numTopChoices = numTopChoices;
            return this;
        }

        /**
         * Sets the completion stream callback.
         *
         * @param streamCallback The stream callback.
         *                       If not set to null, picoLLM executes this callback every time a new
         *                       piece of completion string becomes available.
         * @return {@code Builder} instance.
         */
        public Builder setStreamCallback(PicoLLMStreamCallback streamCallback) {
            this.streamCallback = streamCallback;
            return this;
        }

        /**
         * Sets the progress callback.
         *
         * @param progressCallback     If not set to `null`, picoLLM uses this callback to report the
         *                             prompt evaluation progress as a floating-point number within (0, 100].
         *                             A value of 100 indicates that prompt evaluation is complete and
         *                             completion tokens are now being generated
         * @return {@code Builder} instance.
         */
        public Builder setProgressCallback(PicoLLMProgressCallback progressCallback) {
            this.progressCallback = progressCallback;
            return this;
        }

        /**
         * Constructs a new {@code PicoLLMGenerateWithImageParams} object.
         *
         * @return A new {@code PicoLLMGenerateWithImageParams} object with the parameters set in the builder.
         */
        public PicoLLMGenerateWithImageParams build() {
            return new PicoLLMGenerateWithImageParams(
                    completionTokenLimit == null ? -1 : completionTokenLimit,
                    stopPhrases,
                    seed == null ? -1 : seed,
                    presencePenalty,
                    frequencyPenalty,
                    temperature,
                    topP,
                    numTopChoices,
                    streamCallback,
                    progressCallback);
        }
    }
}
