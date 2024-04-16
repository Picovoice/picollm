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
 * Class.
 */
public class PicoLLMCompletion {

    private final Usage usage;
    private final Endpoint endpoint;
    private final CompletionToken[] completionTokens;
    private final String completion;

    /**
     * Constructor.
     *
     */
    public PicoLLMCompletion(
            Usage usage,
            Endpoint endpoint,
            CompletionToken[] completionTokens,
            String completion) {
        this.usage = usage;
        this.endpoint = endpoint;
        this.completionTokens = completionTokens;
        this.completion = completion;
    }

    /**
     * Getter for the inferred transcription.
     *
     * @return Inferred transcription.
     */
    public Usage getUsage() {
        return usage;
    }

    /**
     * Getter for the inferred transcription.
     *
     * @return Inferred transcription.
     */
    public Endpoint getEndpoint() {
        return endpoint;
    }

    /**
     * Getter for transcribed words and their associated metadata.
     *
     * @return Transcribed words and their associated metadata.
     */
    public CompletionToken[] getCompletionTokens() {
        return completionTokens;
    }

    /**
     * Getter for the inferred transcription.
     *
     * @return Inferred transcription.
     */
    public String getCompletion() {
        return completion;
    }

    /**
     * Class.
     */
    public static class Usage {
        private final int promptTokens;
        private final int completionTokens;

        /**
         * Constructor.
         *
         */
        public Usage(int promptTokens, int completionTokens) {
            this.promptTokens = promptTokens;
            this.completionTokens = completionTokens;
        }

        /**
         * Getter for the transcribed word.
         *
         * @return Transcribed word.
         */
        public int getPromptTokens() {
            return promptTokens;
        }

        /**
         * Getter for the transcription confidence.
         *
         * @return Transcription confidence. It is a number within [0, 1].
         */
        public int getCompletionTokens() {
            return completionTokens;
        }
    }

    enum Endpoint {
      END_OF_SENTENCE,
      COMPLETION_TOKEN_LIMIT_REACHED,
      STOP_PHRASE_ENCOUNTERED
    }

    /**
     * Class.
     */
    public static class Token {
        private final String token;
        private final float logProb;

        /**
         * Constructor.
         *
         */
        public Token(String token, float logProb) {
            this.token = token;
            this.logProb = logProb;
        }

        /**
         * Getter for the transcribed word.
         *
         * @return Transcribed word.
         */
        public String getToken() {
            return token;
        }

        /**
         * Getter for the transcription confidence.
         *
         * @return Transcription confidence. It is a number within [0, 1].
         */
        public float getLogProb() {
            return logProb;
        }
    }

    /**
     * Class.
     */
    public static class CompletionToken {
        private final Token token;
        private final Token[] topChoices;

        /**
         * Constructor.
         *
         */
        public CompletionToken(Token token, Token[] topChoices) {
            this.token = token;
            this.topChoices = topChoices;
        }

        /**
         * Getter for the transcribed word.
         *
         * @return Transcribed word.
         */
        public Token getToken() {
            return token;
        }

        /**
         * Getter for the transcription confidence.
         *
         * @return Transcription confidence. It is a number within [0, 1].
         */
        public Token[] getTopChoices() {
            return topChoices;
        }
    }
}
