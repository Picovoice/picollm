window.onload = () => {
  let picoLLM;

  let dotIdx = 0;
  let dotInterval;

  let numTokens = -1;
  let timeFirstToken = 0;
  let isText = true;

  const status = document.getElementById("status");
  const error = document.getElementById("error");
  const dotdotdot = document.getElementById("dotdotdot");

  const initBlock = document.getElementById("initBlock");
  const completionBlock = document.getElementById("completionBlock");

  const initButton = document.getElementById("init");
  const generateButton = document.getElementById("generate");
  const changeModelButton = document.getElementById("changeModel");

  const accessKey = document.getElementById("accessKey");
  const modelFile = document.getElementById("uploadFile");

  const prompt = document.getElementById("prompt");
  const original = document.getElementById("original");
  const resultText = document.getElementById("resultText");
  const resultTokens = document.getElementById("resultTokens");
  const codeIcon = document.getElementById("code-icon");
  const tokensPerSec = document.getElementById("tokensPerSec");

  const temperature = document.getElementById("temperature");
  const temperatureText = document.getElementById("temperatureText");

  const completionTokenLimit = document.getElementById("completionTokenLimit");
  const completionTokenLimitText = document.getElementById("completionTokenLimitText");

  const stopPhrases = document.getElementById("stopPhrases");

  const topP = document.getElementById("topP");
  const topPText = document.getElementById("topPText");

  const presencePenalty = document.getElementById("presencePenalty");
  const presencePenaltyText = document.getElementById("presencePenaltyText");

  const frequencyPenalty = document.getElementById("frequencyPenalty");
  const frequencyPenaltyText = document.getElementById("frequencyPenaltyText");

  const numTopChoices = document.getElementById("numTopChoices");
  const numTopChoicesText = document.getElementById("numTopChoicesText");

  temperatureText.innerText = temperature.value;
  temperature.addEventListener("input", (ev) => {
    temperature.value = ev.target.value;
    temperatureText.innerText = temperature.value;
  });

  completionTokenLimitText.innerText = completionTokenLimit.value;
  completionTokenLimit.addEventListener("input", (ev) => {
    completionTokenLimit.value = ev.target.value;
    completionTokenLimitText.innerText = completionTokenLimit.value;
  });

  topPText.innerText = topP.value;
  topP.addEventListener("input", (ev) => {
    topP.value = ev.target.value;
    topPText.innerText = topP.value;
  });

  presencePenaltyText.innerText = presencePenalty.value;
  presencePenalty.addEventListener("input", (ev) => {
    presencePenalty.value = ev.target.value;
    presencePenaltyText.innerText = presencePenalty.value;
  });

  frequencyPenaltyText.innerText = frequencyPenalty.value;
  frequencyPenalty.addEventListener("input", (ev) => {
    frequencyPenalty.value = ev.target.value;
    frequencyPenaltyText.innerText = frequencyPenalty.value;
  });

  numTopChoicesText.innerText = numTopChoices.value;
  numTopChoices.addEventListener("input", (ev) => {
    numTopChoices.value = ev.target.value;
    numTopChoicesText.innerText = numTopChoices.value;
  });

  const writeError = (message) => {
    error.style.display = 'block';
    error.innerText = `Error: ${message}`;
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

  accessKey.onchange = () => {
    if (accessKey.value.length > 0 && modelFile.files.length > 0) {
      initButton.disabled = false;
    }
  }

  modelFile.onchange = accessKey.onchange;

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

      completionTokenLimit.max = picoLLM.contextLength;
      numTopChoices.max = picoLLM.maxTopChoices;

      initBlock.style.display = 'none';
      completionBlock.style.display = 'flex';
      status.innerText = "Loading complete."
    } catch (e) {
      writeError(e.message);
    } finally {
      stopDot();
    }
  };

  prompt.onkeydown = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
    }
  }

  prompt.onkeyup = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      generateButton.click();
    }
  };

  generateButton.onclick = async () => {
    if (!picoLLM) {
      return;
    }

    status.innerText = "Generating text"
    startDot();

    numTokens = -1;

    prompt.disabled = true;
    generateButton.disabled = true;
    isText = true;
    tokensPerSec.innerText = '-';

    original.innerText = prompt.value;
    resultText.innerHTML = original.outerHTML;

    resultText.style.display = 'block';
    resultTokens.style.display = 'none';
    codeIcon.style.display = 'none';
    codeIcon.src = 'assets/code-no-slash.svg';

    try {
      const { completionTokens } = await picoLLM.generate(
        prompt.value,
        {
          completionTokenLimit: Number(completionTokenLimit.value),
          stopPhrases: (stopPhrases.value) ? stopPhrases.value.split(',').map(x => x.trim()).filter(x => x.length > 0) : [],
          topP: Number(topP.value),
          presencePenalty: Number(presencePenalty.value),
          frequencyPenalty: Number(frequencyPenalty.value),
          numTopChoices: Number(numTopChoices),
          streamCallback: (token) => {
            if (numTokens === -1) {
              timeFirstToken = performance.now();
            }
            numTokens += 1;

            resultText.innerHTML += token;
            resultText.scrollTop = resultText.scrollHeight;
          }
        }
      )

      const tock = performance.now();
      const elapsedSec = (tock - timeFirstToken) / 1000;

      tokensPerSec.innerText = `${Math.round((completionTokens.length / elapsedSec) * 100) / 100}`;

      prompt.disabled = false;
      generateButton.disabled = false;
      resultTokens.innerText = JSON.stringify(completionTokens, null, 2);
      codeIcon.style.display = 'inline-block';

      status.innerText = "Generating complete."
    } catch (e) {
      writeError(e.message);
    } finally {
      stopDot();
    }
  };

  codeIcon.onclick = () => {
    if (isText) {
      resultText.style.display = 'none';
      resultTokens.style.display = 'block';
      codeIcon.src = 'assets/code.svg';
    } else {
      resultText.style.display = 'block';
      resultTokens.style.display = 'none';
      codeIcon.src = 'assets/code-no-slash.svg';
    }
    isText = !isText;
  };

  changeModelButton.onclick = async () => {
    if (!picoLLM) {
      return;
    }

    await picoLLM.release();
    picoLLM = null;

    completionBlock.style.display = 'none';
    initBlock.style.display = 'block';

    modelFile.value = '';

    initButton.disabled = true;
    generateButton.disabled = false;

    prompt.value = '';
    prompt.disabled = false;

    tokensPerSec.innerText = '-';
    original.innerText = '';
    resultText.innerHTML = original.outerHTML;

    resultText.style.display = 'block';
    resultTokens.style.display = 'none';
    codeIcon.src = 'assets/code-no-slash.svg';
    codeIcon.style.display = 'none';

    status.innerText = "Not loaded."
  }
};
