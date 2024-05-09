window.onload = () => {
  let picoLLM;

  const initBlock = document.getElementById("initBlock");
  const completionBlock = document.getElementById("completionBlock");

  const initButton = document.getElementById("init");
  const generateButton = document.getElementById("generate");
  const changeModelButton = document.getElementById("changeModel");

  const accessKey = document.getElementById("accessKey");
  const modelFile = document.getElementById("uploadFile");
  const prompt = document.getElementById("prompt");
  const original = document.getElementById("original");
  const result = document.getElementById("result");

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

  initButton.onclick = async () => {
    if (picoLLM) {
      return;
    }

    initButton.disabled = true;

    picoLLM = await PicollmWeb.PicoLLMWorker.create(accessKey.value, {
      modelFile: modelFile.files[0]
    });

    initBlock.style.display = 'none';
    completionBlock.style.display = 'flex';
  };

  prompt.onkeyup = (ev) => {
    if (ev.key === "Enter") {
      generateButton.click();
    }
  };

  generateButton.onclick = async () => {
    if (!picoLLM) {
      return;
    }

    prompt.disabled = true;
    generateButton.disabled = true;

    original.innerText = prompt.value;
    result.innerHTML = original.outerHTML;
    await picoLLM.generate(
      prompt.value,
      {
        completionTokenLimit: Number(completionTokenLimit.value),
        stopPhrases: (stopPhrases.value) ? stopPhrases.value.split(',').map(x => x.trim()) : [],
        topP: Number(topP.value),
        presencePenalty: Number(presencePenalty.value),
        frequencyPenalty: Number(frequencyPenalty.value),
        numTopChoices: Number(numTopChoices),
        streamCallback: (token) => {
          result.innerHTML += token;
        }
      }
    )

    prompt.disabled = false;
    generateButton.disabled = false;
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

    initButton.disabled = false;
    generateButton.disabled = false;

    prompt.value = '';
    prompt.disabled = false;

    original.innerText = '';
    result.innerHTML = original.outerHTML;
  }
};
