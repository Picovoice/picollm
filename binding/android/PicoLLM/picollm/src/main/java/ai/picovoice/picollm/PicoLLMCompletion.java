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
 * Represents a picoLLM completion result.
 */
public class PicoLLMCompletion {

    private final Usage usage;
    private final Endpoint endpoint;
    private final CompletionToken[] completionTokens;
    private final String completion;

    /**
     * Constructor for the PicoLLMCompletion class.
     *
     * @param usage            Usage information.
     * @param endpoint         Reason for ending the generation process.
     * @param completionTokens Generated tokens within completion and top alternative tokens.
     * @param completion       Completion string.
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
     * Getter for usage information.
     *
     * @return The usage information.
     */
    public Usage getUsage() {
        return usage;
    }

    /**
     * Getter for the reason for ending the generation process.
     *
     * @return The reason for ending the generation process.
     */
    public Endpoint getEndpoint() {
        return endpoint;
    }

    /**
     * Getter for the generated tokens within completion and top alternative tokens.
     *
     * @return The generated tokens within completion and top alternative tokens.
     */
    public CompletionToken[] getCompletionTokens() {
        return completionTokens;
    }

    /**
     * Getter for the completion string.
     *
     * @return The completion string.
     */
    public String getCompletion() {
        return completion;
    }

    /**
     * Represents usage information.
     */
    public static class Usage {
        private final int promptTokens;
        private final int completionTokens;

        /**
         * Constructor for the Usage class.
         *
         * @param promptTokens     Number of tokens in the prompt.
         * @param completionTokens Number of tokens in the completion.
         */
        public Usage(int promptTokens, int completionTokens) {
            this.promptTokens = promptTokens;
            this.completionTokens = completionTokens;
        }

        /**
         * Getter for the number of tokens in the prompt.
         *
         * @return The number of tokens in the prompt.
         */
        public int getPromptTokens() {
            return promptTokens;
        }

        /**
         * Getter for the number of tokens in the completion.
         *
         * @return The number of tokens in the completion.
         */
        public int getCompletionTokens() {
            return completionTokens;
        }
    }

    /**
     * Represents reasons for ending the generation process.
     */
    public enum Endpoint {
        END_OF_SENTENCE,
        COMPLETION_TOKEN_LIMIT_REACHED,
        STOP_PHRASE_ENCOUNTERED
    }

    /**
     * Represents a generated token.
     */
    public static class Token {
        private final String token;
        private final float logProb;

        /**
         * Constructor for the Token class.
         *
         * @param token   The token.
         * @param logProb The log probability.
         */
        public Token(String token, float logProb) {
            this.token = token;
            this.logProb = logProb;
        }

        /**
         * Getter for the token.
         *
         * @return The token.
         */
        public String getToken() {
            return token;
        }

        /**
         * Getter for the log probability.
         *
         * @return The log probability.
         */
        public float getLogProb() {
            return logProb;
        }
    }

    /**
     * Represents a generated token within completion and top alternative tokens.
     */
    public static class CompletionToken {
        private final Token token;
        private final Token[] topChoices;

        /**
         * Constructor for the CompletionToken class.
         *
         * @param token      The token.
         * @param topChoices Top alternative tokens.
         */
        public CompletionToken(Token token, Token[] topChoices) {
            this.token = token;
            this.topChoices = topChoices;
        }

        /**
         * Getter for the token.
         *
         * @return The token.
         */
        public Token getToken() {
            return token;
        }

        /**
         * Getter for the top alternative tokens.
         *
         * @return The top alternative tokens.
         */
        public Token[] getTopChoices() {
            return topChoices;
        }
    }
}
