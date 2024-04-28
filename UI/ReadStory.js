// This page loads previously created stories
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"

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
    const [storyTitle, setTitle] = useState("");
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
            /*
            const theStory = JSON.stringify(curStory);
            //const storyId = theStory.dateName;
            console.log(theStory);
            setStoryTitle(item.title);
            setStoryData(item.data);*/
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
                let titleString = JSON.parse(desiredItem.title);
                setTitle(titleString);
                let data = desiredItem.storyData;
                setStoryData(data);
                //console.log(loadedStory.storyData[0]);
            }
            else {
                //console.log('No story found with the given title:', title);
            }

        } catch (err) {
            alert(err);
        }
    }

    const getItemByDateName = async (dateName) => {
        try {
            // Get all items with the key "story"
            const allStories = await AsyncStorage.getItem("storyTitles");
            if (allStories !== null) {
                // Parse the JSON string to an array of objects
                const allStoriesArray = JSON.parse(allStories);
                // Find the item with the matching dateName
                const desiredItem = allStoriesArray.find(item => item.dateName === dateName);
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




