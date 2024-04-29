// This page loads previously created stories
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"


const jsonDummyData = require('../assets/StoriesData.json'); // Load dummy stories
const savedJson = {
    "dateName": "story_1714323146513",
    "title": "\"\\\"The Giant Chicken Adventure\\\"\"",
    "storyData": [
        {
            "paragraph": "John was a brave boy who loved to explore. One day, he decided to climb the top of the hill near his house. As he climbed higher and higher, he started to feel tired. But he didn't give up, he kept going.",
            "imageURL": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-gwQoHEgHZddystkuYHLyFDRe/user-1AsoJu2Fl3NCSo36ePCNO5Tn/img-qESfbMegga9MAhl3l56XQ3W2.png?st=2024-04-28T15%3A52%3A14Z&se=2024-04-28T17%3A52%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-27T19%3A41%3A57Z&ske=2024-04-28T19%3A41%3A57Z&sks=b&skv=2021-08-06&sig=GZNYpWFmGz1Fd0FvtRXo1zAXqKWxGPAWQkiqQ6Gjdb4%3D"
        },
        {
            "paragraph": "Using his sharp claws and quick thinking, Super managed to build a small but functional space ship in just a few days. The kids were amazed and couldn't wait to take it for a test flight. As they soared through the stars, Super couldn't help but feel proud of his creation.",
            "imageURL": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-gwQoHEgHZddystkuYHLyFDRe/user-1AsoJu2Fl3NCSo36ePCNO5Tn/img-gVIoBGZjEqyzcO9XVaQRMT97.png?st=2024-04-28T15%3A52%3A14Z&se=2024-04-28T17%3A52%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-27T19%3A41%3A57Z&ske=2024-04-28T19%3A41%3A57Z&sks=b&skv=2021-08-06&sig=l2v1KCi2s/1H/IjvqKEmqytMCUOWCupDFHw/68XTsP0%3D"
        },
        {
            "paragraph": "But as they were about to land back on Earth, Super realized that he forgot to install a bathroom in the space ship. The kids burst into laughter as Super frantically searched for a solution. In the end, they all had a good laugh and Super promised to add a bathroom for their next space adventure. From that day on, Super became known as the coolest cat in the galaxy.",
            "imageURL": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-gwQoHEgHZddystkuYHLyFDRe/user-1AsoJu2Fl3NCSo36ePCNO5Tn/img-OgXMRDso6UDT5A5bcoVZyJXO.png?st=2024-04-28T15%3A52%3A14Z&se=2024-04-28T17%3A52%3A14Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-27T19%3A41%3A57Z&ske=2024-04-28T19%3A41%3A57Z&sks=b&skv=2021-08-06&sig=MTbKPKxMDmBRAZiyZYeM65WAB5E%2BX/ttD/bL5eWRJ4Y%3D"
        }
    ],
    "genre": "\"action\"",
    "age": "\"6\""
}
/////////////// Loading chatGPT response

// Import the dummy JSON file
/*
const jsonData = require('../assets/test1.json');

export default function ViewStory({ navigation }) {
    const [paragraphs, setParagraphs] = useState([]); // paragraphs in JSON
    const [images, setImages] = useState([]); // .jpg images in current path

    // Function to extract paragraphs from JSON data
    const extractParagraphs = (jsonData) => {
        const text = jsonData.choices[0].text;
        const paragraphsArray = text.split('\n').filter(paragraph => paragraph.trim() !== '');
        return paragraphsArray;
    };

/// This will not be useful - require cannot be used in dynamic address
    // Function to generate image paths based on number of paragraphs
    const generateImagePaths = (numImages) => {
        const imagePaths = [];
        for (let i = 1; i <= numImages; i++) {
            let curPath = `../assets/image${i}.jpg`;
            console.log(curPath);
            imagePaths.push(curPath);
        }
        return imagePaths;
    };
/// 
    // Used to extract paragraphs when the component mounts and extract .jpg
    useEffect(() => {
        const extractedParagraphs = extractParagraphs(jsonData);
        setParagraphs(extractedParagraphs);
        const numImages = extractedParagraphs.length;
        const imagePaths = generateImagePaths(numImages);
        setImages(imagePaths);
    }, []);*/
/////////////////

//export default function ViewStory({ navigation, route }) {
export default function ViewStory({ navigation, route }) {
    const [storyData, setStoryData] = useState(null);
    const [storyTitle, setTitle] = useState();
    const { item } = route.params;

    /*
    // Used to extract paragraphs when the component mounts and extract .jpg
    useEffect(() => {
        const extractedParagraphs = extractParagraphs(jsonData);
        setParagraphs(extractedParagraphs);
        const numImages = extractedParagraphs.length;
        const imagePaths = generateImagePaths(numImages);
        setImages(imagePaths);
    }, []);*/

    ////////////////////////////////////////////////////////////////////

    // This will only rerender on the initial page load
    useEffect(() => {

        load();
    }, []);

    // Loaf function
    const load = async () => {
        try {

            const desiredDateName = item;
            //const desiredDateName = JSON.stringify(item);   
            const desiredItem = await getItemByDateName(desiredDateName);
            /*if (desiredItem) {
                // Use the desiredItem for further processing
                console.log("Found desired item:", desiredItem);
            } else {
                console.log("No item found with the desired dateName:", desiredDateName);
            }*/

            //let savedStory = await AsyncStorage.getItem("story_20240428020208"); // this might change in actual implementation
            //let savedStory = await AsyncStorage.getItem("story_20240428020208"); // this might change in actual implementation
            // If story is in list, get data
            if (desiredItem !== null) {
            //if (desiredItem !== null) {
            //if (desiredItem){
                // Extracting title and story data
                //let loadedStory = JSON.parse(savedStory);
                //let loadedStory = JSON.parse(desiredItem);
                console.log(desiredItem.storyData);
                let titleString = JSON.parse(JSON.parse(desiredItem.title));
                setTitle(titleString);
                let data = desiredItem.storyData;
                setStoryData(data);
                //console.log(loadedStory.storyData[0]);
            }
            else {
                console.log('No story found with the given title:', title);
            }

        } catch (err) {
            alert(err);
        }
    }

    const getItemByDateName = async (dateName) => {
        try {
            // Get all items with the key "story"
            const allStories = jsonDummyData.storyTitles;
            if (allStories !== null) {
                // Find the item with the matching dateName
                const desiredItem = allStories.find(item => item.dateName === dateName);
                return desiredItem;
            } else {
                console.log("No stories found in AsyncStorage");
                return null;
            }
        } catch (error) {
            console.error("Error retrieving story from AsyncStorage:", error);
            return null;
        }
    };

    /////////////////////////////////////////////////////////////////////

    return (

        <ScrollView contentContainerStyle={styles.content}>

            <Text style={styles.title}>{storyTitle}</Text>
            {storyData ? (
                storyData.map((item, index) => (
                    <View key={index} style={styles.storyContainer}>
                        <Text style={styles.content}>{item.paragraph}</Text>
                        <Image source={{ uri: item.imageURL }} style={styles.image} />
                        {/*<Image source={ item.imageURL } style={styles.image} />*/}
                    </View>
                ))
            ) : (
                <Text> Sorry, no story data available</Text>
            )}
        </ScrollView>

    );
}




