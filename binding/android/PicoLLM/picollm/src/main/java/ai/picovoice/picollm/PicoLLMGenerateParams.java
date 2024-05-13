/*
    Copyright 2024 Picovoice Inc.

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
public class PicoLLMGenerateParams {

    private int completionTokenLimit;
    private String[] stopPhrases;
    private int seed;
    private float presencePenalty;
    private float frequencyPenalty;
    private float temperature;
    private float topP;
    private int numTopChoices;
    private PicoLLMStreamCallback streamCallback;

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
     */
    public PicoLLMGenerateParams(
            int completionTokenLimit,
            String[] stopPhrases,
            int seed,
            float presencePenalty,
            float frequencyPenalty,
            float temperature,
            float topP,
            int numTopChoices,
            PicoLLMStreamCallback streamCallback) {
        this.completionTokenLimit = completionTokenLimit;
        this.stopPhrases = stopPhrases;
        this.seed = seed;
        this.presencePenalty = presencePenalty;
        this.frequencyPenalty = frequencyPenalty;
        this.temperature = temperature;
        this.topP = topP;
        this.numTopChoices = numTopChoices;
        this.streamCallback = streamCallback;
    }

    /**
     * Gets the maximum number of tokens allowed in the completion.
     *
     * @return The completion token limit.
     */
    public Integer getCompletionTokenLimit() {
        return completionTokenLimit;
    }

    /**
     * Sets the maximum number of tokens allowed in the completion.
     *
     * @param completionTokenLimit The completion token limit to set.
     *                             If the generation process stops due to reaching this limit,
     *                             the endpoint output argument will indicate a completion token
     *                             limit reached condition. Set to `null` to impose no limit.
     */
    public void setCompletionTokenLimit(Integer completionTokenLimit) {
        this.completionTokenLimit = completionTokenLimit;
    }

    /**
     * Gets the phrases that trigger early completion termination.
     *
     * @return Phrases that trigger early completion termination.
     */
    public String[] getStopPhrases() {
        return stopPhrases;
    }

    /**
     * Sets the phrases that trigger early completion termination.
     *
     * @param stopPhrases Phrases that trigger early completion termination.
     *                    The generation process stops when it encounters any of these phrases
     *                    in the completion. The already generated completion, including the
     *                    encountered stop phrase, will be returned. Set to `null` to turn off
     *                    this feature.
     */
    public void setStopPhrases(String[] stopPhrases) {
        this.stopPhrases = stopPhrases;
    }

    /**
     * Gets the seed value for the internal random number generator.
     *
     * @return The seed value for the internal random number generator.
     *     Seeding enforces deterministic outputs.
     *     Set to `null` for randomized outputs for a given prompt.
     */
    public Integer getSeed() {
        return seed;
    }

    /**
     * Sets the seed value for the internal random number generator.
     *
     * @param seed The seed value for the internal random number generator.
     *             Seeding enforces deterministic outputs.
     *             Set to `-1` for randomized outputs for a given prompt.
     */
    public void setSeed(Integer seed) {
        this.seed = seed;
    }

    /**
     * Gets the presence penalty.
     *
     * @return The presence penalty.
     *     It penalizes logits already appearing in the partial completion if set to a positive value.
     *     If set to `0.0`, it has no effect.
     */
    public float getPresencePenalty() {
        return presencePenalty;
    }

    /**
     * Sets the presence penalty.
     *
     * @param presencePenalty The presence penalty.
     *                        It penalizes logits already appearing in the partial completion if
     *                        set to a positive value. If set to `0.0`, it has no effect.
     */
    public void setPresencePenalty(float presencePenalty) {
        this.presencePenalty = presencePenalty;
    }

    /**
     * Gets the frequency penalty.
     *
     * @return The frequency penalty.
     *     If set to a positive floating-point value, it penalizes logits proportional to the
     *     frequency of their appearance in the partial completion. If set to `0.0`, it has no
     *     effect.
     */
    public float getFrequencyPenalty() {
        return frequencyPenalty;
    }

    /**
     * Sets the frequency penalty.
     *
     * @param frequencyPenalty The frequency penalty.
     *                         If set to a positive floating-point value, it penalizes logits
     *                         proportional to the frequency of their appearance in the partial
     *                         completion. If set to `0.0`, it has no effect.
     */
    public void setFrequencyPenalty(float frequencyPenalty) {
        this.frequencyPenalty = frequencyPenalty;
    }

    /**
     * Gets the temperature parameter.
     *
     * @return The temperature parameter.
     *     A higher temperature smoothens the sampler's output, increasing the randomness.
     *     In contrast, a lower temperature creates a narrower distribution and reduces variability.
     *     Setting it to `0` selects the maximum logit during sampling.
     */
    public float getTemperature() {
        return temperature;
    }

    /**
     * Sets the temperature parameter.
     *
     * @param temperature The temperature parameter.
     *                    A higher temperature smoothens the sampler's output, increasing the
     *                    randomness. In contrast, a lower temperature creates a narrower
     *                    distribution and reduces variability. Setting it to `0` selects the
     *                    maximum logit during sampling.
     */
    public void setTemperature(float temperature) {
        this.temperature = temperature;
    }

    /**
     * Gets the top-p parameter.
     *
     * @return The top-p parameter.
     *     A positive floating-point number within (0, 1].
     *     It restricts the sampler's choices to high-probability logits that form the top_p portion
     *     of the probability mass. Hence, it avoids randomly selecting unlikely logits.
     *     A value of 1.0 enables the sampler to pick any token with non-zero probability, turning
     *     off the feature.
     */
    public float getTopP() {
        return topP;
    }

    /**
     * Sets the top-p parameter.
     *
     * @param topP The top-p parameter.
     *             A positive floating-point number within (0, 1].
     *             It restricts the sampler's choices to high-probability logits that form the top_p
     *             portion of the probability mass. Hence, it avoids randomly selecting unlikely
     *             logits. A value of `1.0` enables the sampler to pick any token with non-zero
     *             probability, turning off the feature.
     */
    public void setTopP(float topP) {
        this.topP = topP;
    }

    /**
     * Gets the number of top choices.
     *
     * @return The number of top choices.
     *     If set to a positive value, picoLLM returns the list of the highest probability tokens
     *     for any generated token. Set to `0` to turn off the feature.
     *     The maximum number of top choices is determined by `PicoLLM.getMaxTopChoices()`.
     */
    public int getNumTopChoices() {
        return numTopChoices;
    }

    /**
     * Sets the number of top choices.
     *
     * @param numTopChoices The number of top choices.
     *                      If set to a positive value, picoLLM returns the list of the highest
     *                      probability tokens for any generated token. Set to 0 to turn off the
     *                      feature. The maximum number of top choices is determined by
     *                      `PicoLLM.getMaxTopChoices()`.
     */
    public void setNumTopChoices(int numTopChoices) {
        this.numTopChoices = numTopChoices;
    }

    /**
     * Gets the completion stream callback.
     *
     * @return The stream callback.
     *     If not set to null, picoLLM executes this callback every time a new piece of completion
     *     string becomes available.
     */
    public PicoLLMStreamCallback getStreamCallback() {
        return streamCallback;
    }

    /**
     * Sets the completion stream callback.
     *
     * @param streamCallback The stream callback.
     *                       If not set to null, picoLLM executes this callback every time a new
     *                       piece of completion string becomes available.
     */
    public void setStreamCallback(PicoLLMStreamCallback streamCallback) {
        this.streamCallback = streamCallback;
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
         * Constructs a new {@code PicoLLMGenerateParams} object.
         *
         * @return A new {@code PicoLLMGenerateParams} object with the parameters set in the builder.
         */
        public PicoLLMGenerateParams build() {
            return new PicoLLMGenerateParams(
                    completionTokenLimit == null ? -1 : completionTokenLimit,
                    stopPhrases,
                    seed == null ? -1 : seed,
                    presencePenalty,
                    frequencyPenalty,
                    temperature,
                    topP,
                    numTopChoices,
                    streamCallback);
        }
    }
}
