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
public class PicoLLMGenerateOCRParams {

    private int completionTokenLimit;
    private PicoLLMStreamCallback streamCallback;
    private PicoLLMProgressCallback progressCallback;

    /**
     * Constructor.
     *
     * @param completionTokenLimit The maximum number of tokens allowed in the completion.
     *                             If the generation process stops due to reaching this limit,
     *                             the endpoint output argument will indicate a completion token
     *                             limit reached condition. Set to `-1` to impose no limit.
     * @param streamCallback       If not set to `null`, picoLLM executes this callback every time
     *                             a new piece of completion string becomes available.
     * @param progressCallback     If not set to `null`, picoLLM uses this callback to report the
     *                             prompt evaluation progress as a floating-point number within (0, 100].
     *                             A value of 100 indicates that prompt evaluation is complete and
     *                             completion tokens are now being generated
     */
    public PicoLLMGenerateOCRParams(
            int completionTokenLimit,
            PicoLLMStreamCallback streamCallback,
            PicoLLMProgressCallback progressCallback) {
        this.completionTokenLimit = completionTokenLimit;
        this.streamCallback = streamCallback;
        this.progressCallback = progressCallback;
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
         * Constructs a new {@code PicoLLMGenerateOCRParams} object.
         *
         * @return A new {@code PicoLLMGenerateOCRParams} object with the parameters set in the builder.
         */
        public PicoLLMGenerateOCRParams build() {
            return new PicoLLMGenerateOCRParams(
                    completionTokenLimit == null ? -1 : completionTokenLimit,
                    streamCallback,
                    progressCallback);
        }
    }
}
