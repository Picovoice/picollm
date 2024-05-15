window.onload = () => {
  let picoLLM;
  let dialog;

  let dotIdx = 0;
  let dotInterval;

  const status = document.getElementById("status");
  const error = document.getElementById("error");
  const dotdotdot = document.getElementById("dotdotdot");

  const initBlock = document.getElementById("initBlock");
  const chatBlock = document.getElementById("chatBlock");

  const initButton = document.getElementById("init");
  const sendButton = document.getElementById("send");
  const changeModelButton = document.getElementById("changeModel");
  const resetDialogButton = document.getElementById("resetDialog");

  const accessKey = document.getElementById("accessKey");
  const modelFile = document.getElementById("uploadFile");
  const message = document.getElementById("message");
  const result = document.getElementById("result");

  const writeError = (errorString) => {
    error.style.display = 'block';
    error.innerText = `Error: ${errorString}`;
    status.innerText = 'Error.';
  };

  const startDot = () => {
    if (dotInterval) {
      clearInterval(dotInterval);
    }
    dotInterval = setInterval(() => {
      dotIdx = (dotIdx + 1) % 4;
      let dotText = '';
      for (let i = 0; i < dotIdx; i++) {
        dotText += '.';
      }
      dotdotdot.innerText = dotText;
    }, 500);
  }

  const stopDot = () => {
    if (dotInterval) {
      clearInterval(dotInterval);
    }
    dotIdx = 0;
    dotdotdot.innerText = '';
  }

  const addHumanMessage = (messageString) => {
    result.innerHTML += `<div class="align-end"><span class="human-border">You</span></div><div class="align-end"><span class="human-text">${messageString}</span></div>`
    result.scrollTop = result.scrollHeight;
  }

  const startLLMMessage = () => {
    result.innerHTML += `<div class="align-start"><span class="llm-border">picoLLM</span></div>`;

    const divElem = document.createElement("div");
    divElem.className = "align-start";

    const textElem = document.createElement("span");
    textElem.className = "llm-text";
    textElem.innerHTML = "";

    divElem.appendChild(textElem);
    result.appendChild(divElem);

    result.scrollTop = result.scrollHeight;

    return textElem;
  }

  accessKey.onchange = () => {
    if (accessKey.value.length > 0 && modelFile.files.length > 0) {
      initButton.disabled = false;
    }
  }

  modelFile.onchange = accessKey.onchange;

  const addLLMMessage = (elem, messageString) => {
    elem.innerHTML += messageString;
    result.scrollTop = result.scrollHeight;
  };

  initButton.onclick = async () => {
    if (picoLLM) {
      return;
    }

    initButton.disabled = true;
    status.innerText = "Loading model"
    startDot();

    try {
      picoLLM = await PicollmWeb.PicoLLMWorker.create(accessKey.value, {
        modelFile: modelFile.files[0],
        cacheFilePath: modelFile.files[0].name,
      });

      dialog = picoLLM.getDialog();

      initBlock.style.display = 'none';
      chatBlock.style.display = 'flex';
      status.innerText = "Loading complete."
    } catch (e) {
      writeError(e.message);
    } finally {
      stopDot();
    }
  };

  message.onkeydown = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
    }
  }

  message.onkeyup = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      sendButton.click();
    }
  };

  sendButton.onclick = async () => {
    if (!picoLLM) {
      return;
    }

    status.innerText = "Generating response"
    startDot();

    message.disabled = true;
    sendButton.disabled = true;

    dialog.addHumanRequest(message.value);
    addHumanMessage(message.value);
    message.value = '';

    try {
      const elem = startLLMMessage();
      const { completion } = await picoLLM.generate(
        dialog.prompt(),
        {
          completionTokenLimit: 128,
          streamCallback: (token) => {
            addLLMMessage(elem, token);
          }
        }
      )

      dialog.addLLMResponse(completion);
      result.innerHTML += '\n';

      message.disabled = false;
      sendButton.disabled = false;
      message.focus();

      status.innerText = "Generating complete."
    } catch (e) {
      writeError(e.message);
    } finally {
      stopDot();
    }
  };

  resetDialogButton.onclick = () => {
    result.innerHTML = '';
  }

  changeModelButton.onclick = async () => {
    if (!picoLLM) {
      return;
    }

    await picoLLM.release();
    picoLLM = null;

    chatBlock.style.display = 'none';
    initBlock.style.display = 'block';

    modelFile.value = '';

    initButton.disabled = true;
    sendButton.disabled = false;

    message.value = '';
    message.disabled = false;

    result.innerHTML = '';

    status.innerText = "Not loaded."
  }
};
