// This page loads previously created stories
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"

/////////////// Loading chatGPT response
export default function ViewStory({ navigation, route }) {
    const [storyData, setStoryData] = useState(null);
    const [storyTitle, setTitle] = useState("");
    const { item } = route.params;

    // This will only rerender on the initial page load
    useEffect(() => {

        load();
    }, []);

    // Loaf function
    const load = async () => {
        try {
            const desiredDateName = item;
            // Use the desiredItem for further processing
            const desiredItem = await getItemByDateName(desiredDateName);
            // If story is in list, get data
            if (desiredItem !== null) {
                // Extracting title and story data
                let titleString = JSON.parse(desiredItem.title);
                setTitle(titleString);
                let data = desiredItem.storyData;
                setStoryData(data);
            }
            else {
                console.log('No story found with the given title:', title);
            }

        } catch (err) {
            alert(err);
        }
    }

    // Returns the story with a given dateName ID
    const getItemByDateName = async (dateName) => {
        try {
            // Get all items with the key "storyTitles"
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
                    </View>
                ))
            ) : (
                <Text> Sorry, no story data available</Text>
            )}
        </ScrollView>

    );
}