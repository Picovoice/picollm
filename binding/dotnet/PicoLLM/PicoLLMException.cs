/*
    Copyright 2025 Picovoice Inc.

    You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
    file accompanying this source.

    Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
    an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
    specific language governing permissions and limitations under the License.
*/

using System;

namespace Pv
{
    public class PicoLLMException : Exception
    {
        private readonly string[] _messageStack;

        public PicoLLMException() { }

        public PicoLLMException(string message) : base(message) { }

        public PicoLLMException(string message, string[] messageStack) : base(ModifyMessages(message, messageStack))
        {
            this._messageStack = messageStack;
        }

        public string[] MessageStack
        {
            get => _messageStack;
        }

        private static string ModifyMessages(string message, string[] messageStack)
        {
            string messageString = message;
            if (messageStack.Length > 0)
            {
                messageString += ":";
                for (int i = 0; i < messageStack.Length; i++)
                {
                    messageString += $"\n  [{i}] {messageStack[i]}";
                }
            }
            return messageString;
        }

    }

    public class PicoLLMMemoryException : PicoLLMException
    {
        public PicoLLMMemoryException() { }

        public PicoLLMMemoryException(string message) : base(message) { }

        public PicoLLMMemoryException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMIOException : PicoLLMException
    {
        public PicoLLMIOException() { }

        public PicoLLMIOException(string message) : base(message) { }

        public PicoLLMIOException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMInvalidArgumentException : PicoLLMException
    {
        public PicoLLMInvalidArgumentException() { }

        public PicoLLMInvalidArgumentException(string message) : base(message) { }

        public PicoLLMInvalidArgumentException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMStopIterationException : PicoLLMException
    {
        public PicoLLMStopIterationException() { }

        public PicoLLMStopIterationException(string message) : base(message) { }

        public PicoLLMStopIterationException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMKeyException : PicoLLMException
    {
        public PicoLLMKeyException() { }

        public PicoLLMKeyException(string message) : base(message) { }

        public PicoLLMKeyException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMInvalidStateException : PicoLLMException
    {
        public PicoLLMInvalidStateException() { }

        public PicoLLMInvalidStateException(string message) : base(message) { }

        public PicoLLMInvalidStateException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMRuntimeException : PicoLLMException
    {
        public PicoLLMRuntimeException() { }

        public PicoLLMRuntimeException(string message) : base(message) { }

        public PicoLLMRuntimeException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMActivationException : PicoLLMException
    {
        public PicoLLMActivationException() { }

        public PicoLLMActivationException(string message) : base(message) { }

        public PicoLLMActivationException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMActivationLimitException : PicoLLMException
    {
        public PicoLLMActivationLimitException() { }

        public PicoLLMActivationLimitException(string message) : base(message) { }

        public PicoLLMActivationLimitException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMActivationThrottledException : PicoLLMException
    {
        public PicoLLMActivationThrottledException() { }

        public PicoLLMActivationThrottledException(string message) : base(message) { }

        public PicoLLMActivationThrottledException(string message, string[] messageStack) : base(message, messageStack) { }
    }

    public class PicoLLMActivationRefusedException : PicoLLMException
    {
        public PicoLLMActivationRefusedException() { }

        public PicoLLMActivationRefusedException(string message) : base(message) { }

        public PicoLLMActivationRefusedException(string message, string[] messageStack) : base(message, messageStack) { }
    }
}