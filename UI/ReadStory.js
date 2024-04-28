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

export default function ViewStory({ navigation }) {
    const [storyData, setStoryData]=useState(null);
    const [storyTitle, setTitle] = useState("");
    const [paragraphs, setParagraphs] = useState([]); // paragraphs in JSON
    const [images, setImages] = useState("https://media-be.chewy.com/wp-content/uploads/2022/09/27095535/cute-dogs-pembroke-welsh-corgi.jpg"); // .jpg images in current path, TODO: change to [] for multiple images

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

    // Loaf function
    const load = async () => {
        try {
            let savedStory = await AsyncStorage.getItem("story_20240428020208"); // this might change in actual implementation
            // If story is in list, get data
            if (savedStory !== null) {
                // Extracting title and story data
                let loadedStory = JSON.parse(savedStory);
                let titleString = JSON.parse(loadedStory.title);
                setTitle(titleString);
                let data = loadedStory.storyData;
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
    /////////////////////////////////////////////////////////////////////

    // This will only rerender on the initial page load
    useEffect(() => {
        load();
    }, []);

    return (

        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Test</Text>
            
            <Text style={styles.title}>{storyTitle}</Text>
            { storyData? (
            storyData.map((item, index) => (
                <View key={index} style={styles.storyContainer}>
                    <Text style={styles.content}>{item.paragraph}</Text>
                    <Image source={{ uri: item.imageURL }} style={styles.image} />
                    {/*<Image source={ item.imageURL } style={styles.image} />*/}
                </View>
            ))
            ):(
                <Text> Sorry, no story data available</Text>
        )}
        </ScrollView>

    );
}




