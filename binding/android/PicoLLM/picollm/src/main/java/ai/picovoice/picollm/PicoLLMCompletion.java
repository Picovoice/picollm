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

    public Usage getUsage() {
        return usage;
    }

    public Endpoint getEndpoint() {
        return endpoint;
    }

    public CompletionToken[] getCompletionTokens() {
        return completionTokens;
    }

    public String getCompletion() {
        return completion;
    }

    public static class Usage {
        private final int promptTokens;
        private final int completionTokens;

        public Usage(int promptTokens, int completionTokens) {
            this.promptTokens = promptTokens;
            this.completionTokens = completionTokens;
        }

        public int getPromptTokens() {
            return promptTokens;
        }

        public int getCompletionTokens() {
            return completionTokens;
        }
    }

    public enum Endpoint {
      END_OF_SENTENCE,
      COMPLETION_TOKEN_LIMIT_REACHED,
      STOP_PHRASE_ENCOUNTERED
    }

    public static class Token {
        private final String token;
        private final float logProb;

        public Token(String token, float logProb) {
            this.token = token;
            this.logProb = logProb;
        }

        public String getToken() {
            return token;
        }

        public float getLogProb() {
            return logProb;
        }
    }

    public static class CompletionToken {
        private final Token token;
        private final Token[] topChoices;

        public CompletionToken(Token token, Token[] topChoices) {
            this.token = token;
            this.topChoices = topChoices;
        }

        public Token getToken() {
            return token;
        }

        public Token[] getTopChoices() {
            return topChoices;
        }
    }
}
