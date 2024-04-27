// This page loads previously created stories
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from "./CommonStyleSheet"

// Import the dummy JSON file
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
    }, []);


    return (
        <ScrollView>
            {paragraphs.map((paragraph, index) => (
                <View key={index}>
                    <Text>{paragraph}</Text>
                </View>
            ))}
            {images.map((item, idx) => (
                <View key={idx}>
                    <Image source={images[idx]} style={{ width: 300, height: 300 }} />
                </View>

            ))}
        </ScrollView>
    );
}
/*  */