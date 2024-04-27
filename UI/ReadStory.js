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
        const [storyTitle, setTitle] = useState("");
        const [paragraphs, setParagraphs] = useState([]); // paragraphs in JSON
        const [images, setImages] = useState("https://media-be.chewy.com/wp-content/uploads/2022/09/27095535/cute-dogs-pembroke-welsh-corgi.jpg"); // .jpg images in current path, TODO: change to [] for multiple images
        const [storiesList, setStoriesList] = useState({});
        
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
      let savedStory = await AsyncStorage.getItem("Test Title"); // this might change in actual implementation
      //console.log(savedStory);
      if (savedStory !== null) {
        // Parsing the JSON back into an object
      let loadedStory = JSON.parse(savedStory);
      
      // Extracting paragraphs:
      let textArray = JSON.parse(loadedStory.text);
      setParagraphs(textArray);
      // Extracting images and title
      setTitle(loadedStory.title);
      setImages(loadedStory.images);
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
        <ScrollView>
            <Text>{storyTitle}</Text>
            {paragraphs.map((paragraph, index) => (
                <View key={index}>
                    <Text>{paragraph}</Text>
                </View>
            ))}
            {/* TODO: This image section may be changed in actual implementation*/}
            <Image source={{ uri: images }} style={{ width: 300, height: 300 }}/>
            {/*{images.map((item, idx) => (
                <View key={idx}>
                    <Image source={images[idx]} style={{ width: 300, height: 300 }} />
                </View>

            ))}*/}
        </ScrollView>
    );
}