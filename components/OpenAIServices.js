/*
// This part is for the real openAI API calling
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

*/


// This part is for the mocking openAI API calling
export function textCompletion(inputText, selectedMaxResTokenLength,selectedTemperature, selectedTopP, selectedFreqPenalty, selectedPresPenalty, selectedDataModel) {
    // Simulating receiving data without sending a request
    const mockResponse = {
        text:  '\n' +
        "Super the cat was always fascinated by space and the idea of exploring the unknown. So when a group of 12-year old kids came to him with a request to build a space ship, he couldn't resist the challenge.\n" +
        '\n' +
        "Using his sharp claws and quick thinking, Super managed to build a small but functional space ship in just a few days. The kids were amazed and couldn't wait to take it for a test flight. As they soared through the stars, Super couldn't help but feel proud of his creation.\n" +
        '\n' +
        'But as they were about to land back on Earth, Super realized that he forgot to install a bathroom in the space ship. The kids burst into laughter as Super frantically searched for a solution. In the end, they all had a good laugh and Super promised to add a bathroom for their next space adventure. From that day on, Super became known as the coolest cat in the galaxy.',
        // You can add more mock data fields if needed
    };
    // Simulate resolving a promise with the mock response
    return Promise.resolve(mockResponse); //=================
}

export function imageGeneration(textPrompt) {
    // Simulating receiving data without sending a request
    const mockResponse = {
        imgURL: [
            require("../assets/cat1.png"), 
            require("../assets/cat2.png"), 
            require("../assets/cat3.png")
        ],
        // Mock image URL
        // You can add more mock data fields if needed
    };

    // Simulate resolving a promise with the mock response
    return Promise.resolve(mockResponse); //=================
}

export function titleGeneration(textPrompt) {
    // Simulating receiving data without sending a request
    const mockResponse =  {
        title: 'Super the Space Cat'
    };

    // Simulate resolving a promise with the mock response
    return Promise.resolve(mockResponse); //=================
}


// This part is for the mocking openAI API calling
export function questionsGenerator(storyText) {
    // Simulating receiving data without sending a request
    const mockResponse = {

        text: '1. What was the name of the Cat?\n' +
        'Answer: Super\n' +
        '\n' +
        '2. What did the Cat build?\n' +
        'Answer: Spaceship\n' +
        '\n' +
        '3. WWhat did the Cat forget to build?\n' +
        'Answer: Bathroom\n'
        // You can add more mock data fields if needed
    };
    // Simulate resolving a promise with the mock response
    return Promise.resolve(mockResponse); //=================
}
