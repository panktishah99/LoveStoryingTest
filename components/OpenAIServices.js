

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



export function imageGeneration(textPrompt, numImg) {
  
    const localUrl = "https://openaiserver.loca.lt/openai/generations";// public endpoint for img

    return fetch(localUrl, { // Use localUrl instead of url
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "prompt": textPrompt,
            "n" : numImg
        })
    });
}

/*
export function textCompletion(inputText, selectedMaxResTokenLength,selectedTemperature, selectedTopP, selectedFreqPenalty, selectedPresPenalty, selectedDataModel) {
    // Simulating receiving data without sending a request
    const mockResponse = {
        text: '\n' +
        'Once upon a time, in a faraway land, there lived a 12-year-old boy named Tim. He was a mischievous kid who loved to play pranks on his friends.\n' +
        '\n' +
        "One day, Tim decided to pull a prank on his best friend, Jack. He filled Jack's water bottle with vinegar and waited for him to take a sip. When Jack took a big gulp, his face twisted in disgust and Tim couldn't help but burst into laughter. From that day on, Jack always checked his water bottle before taking a drink. Tim's pranks may have been silly, but they always brought a smile to everyone's face.",
        
    };

    // Simulate resolving a promise with the mock response
    return Promise.resolve(mockResponse); //=================
}



/*

export function imageGeneration(textPrompt) {
    // Simulating receiving data without sending a request
    const mockResponse = {
        imgURL: require("../assets/cat-dance.png"), // Mock image URL
        // You can add more mock data fields if needed
    };

    // Simulate resolving a promise with the mock response
    return Promise.resolve(mockResponse); //=================
}

*/

