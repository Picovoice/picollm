/*
  Copyright 2024 Picovoice Inc.

  You may not use this file except in compliance with the license. A copy of the license is located in the "LICENSE"
  file accompanying this source.

  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
  specific language governing permissions and limitations under the License.
*/

/*
 * Dialog is a helper class that stores a chat dialog and formats it according to an instruction-tuned LLM's chat
 * template. Dialog is the base class. Each supported instruction-tuned LLM has an accompanying concrete subclass.
 */
import * as PicoLLMErrors from './picollm_errors';

export class Dialog {
  protected _history?: number;
  protected _system?: string;

  protected _human: string[];
  protected _llm: string[];

  /**
   * Constructor.
   * @param history The number of latest back-and-forths to include in the prompt. Setting history
   * to `undefined` will embed the entire dialog in the prompt.
   * @param system Instruction to embed in the prompt for configuring the model's responses.
   */
  constructor(history?: number, system?: string) {
    this._history = history;
    this._system = system;

    this._human = [];
    this._llm = [];
  }

  /**
   * Adds human's request to the dialog.
   * @param content Human's request.
   */
  public addHumanRequest(content: string): void {
    if (this._human.length > this._llm.length) {
      throw new PicoLLMErrors.PicoLLMRuntimeError("Entering a human request without entering the last LLM response is invalid.");
    }

    this._human.push(content);
  }

  /**
   * Adds LLM's response to the dialog.
   * @param content LLM's response.
   */
  public addLLMResponse(content: string): void {
    if (this._human.length === this._llm.length) {
      throw new PicoLLMErrors.PicoLLMRuntimeError("Entering an LLM response without entering the human request is invalid.");
    }

    this._llm.push(content);
  }

  /**
   * Creates a prompt string given parameters passed the constructor and dialog's content.
   * @returns Formatted prompt.
   */
  public prompt(): string {
    throw new PicoLLMErrors.PicoLLMInvalidStateError("Not implemented");
  }
}

/**
 * Dialog helper for `gemma-2b-it` and `gemma-7b-it`.
 */
export class GemmaChatDialog extends Dialog {
  public prompt(): string {
    if (this._human.length === this._llm.length) {
      throw new PicoLLMErrors.PicoLLMRuntimeError("Cannot create a prompt without an outstanding human request");
    }

    const human = (this._history) ? this._human.slice(-(this._history + 1)) : this._human;
    const llm = (this._history) ? ((this._history === 0) ? [] : this._llm.slice(-this._history)) : this._llm;

    const res: string[] = [];
    for (let i = 0; i < llm.length; i++) {
      res.push(`<start_of_turn>user\n${human[i]}<end_of_turn>\n`);
      res.push(`<start_of_turn>model\n${llm[i]}<end_of_turn>\n`);
    }
    res.push(`<start_of_turn>user\n${human.at(-1)}<end_of_turn>\n<start_of_turn>model`);

    return res.join('');
  }
}

/**
 * Dialog helper for `phi-2`. This is a base class, use one of the mode-specific subclasses.
 */
export class Phi2Dialog extends Dialog {
  protected _humanTag: string;
  protected _llmTag: string;

  constructor(humanTag: string, llmTag: string, history?: number, system?: string) {
    super(history, system);

    this._humanTag = humanTag;
    this._llmTag = llmTag;
  }

  public prompt(): string {
    if (this._human.length === this._llm.length) {
      throw new PicoLLMErrors.PicoLLMRuntimeError("Cannot create a prompt without an outstanding human request");
    }

    const human = (this._history) ? this._human.slice(-(this._history + 1)) : this._human;
    const llm = (this._history) ? ((this._history === 0) ? [] : this._llm.slice(-this._history)) : this._llm;
    const ht = this._humanTag;
    const lt = this._llmTag;

    const res: string[] = [];
    for (let i = 0; i < llm.length; i++) {
      res.push(`${ht}: ${human[i]}\n${lt}: ${llm[i]}\n`);
    }
    res.push(`${ht}: ${human.at(-1)}\n${lt}:`);

    return res.join('');
  }
}

/**
 * Dialog helper for `phi-2` `qa` mode.
 */
export class Phi2QADialog extends Phi2Dialog {
  constructor(history?: number, system?: string) {
    super("Instruct", "Output", history, system);
  }
}

/**
 * Dialog helper for `phi-2` `chat` mode.
 */
export class Phi2ChatDialog extends Phi2Dialog {
  constructor(history?: number, system?: string) {
    super("Human", "AI", history, system);
  }
}

export const DIALOGS: { [key: string]: typeof Dialog | { [key: string]: typeof Dialog } } = {
  "gemma-2b-it": GemmaChatDialog,
  "phi2": {
    "default": Phi2QADialog,
    "qa": Phi2QADialog,
    "chatt": Phi2ChatDialog
  }
};
