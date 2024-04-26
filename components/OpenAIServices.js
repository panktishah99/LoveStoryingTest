export function textCompletion(inputText, selectedMaxResTokenLength,selectedTemperature, selectedTopP, selectedFreqPenalty, selectedPresPenalty, selectedDataModel) {

	const localUrl = "https://openaiserver.loca.lt/openai/completions/3.0"; // public endpoint for text completion

    return fetch(localUrl, { // Use localUrl instead of url
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "prompt": inputText,
            "max_tokens": selectedMaxResTokenLength,
            "temperature": selectedTemperature,
            "top_p": selectedTopP,
            "frequency_penalty": selectedFreqPenalty,
            "presence_penalty": selectedPresPenalty,
            "model": selectedDataModel
        })
    });
}

export function imageGeneration(textPrompt) {
  
	const localUrl = "https://openaiserver.loca.lt/openai/generations";// public endpoint for img

    return fetch(localUrl, { // Use localUrl instead of url
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "prompt": textPrompt
        })
    });
}

