import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

import styles from "./CommonStyleSheet";
import MyImage from '../assets/bgimages/Picture1.png';

const jsonDummyData = require('../assets/StoriesData.json'); // Load dummy stories

export default function Dashboard({ navigation }) {
    const [storyTitles, setStoryTitles] = useState([]);

    // Function to refresh the dashboard
    const refreshDashboard = useCallback(async () => {

        try {
            //const titles = await AsyncStorage.getItem("storyTitles");
            // Load stored dummy stories into dashboard
            setStoryTitles(jsonDummyData.storyTitles);
        } catch (err) {
            alert(err);
        }
    }, []); // Dependency array is empty since no external dependencies

    useEffect(() => {
        refreshDashboard(); // Initial dashboard refresh
    }, [refreshDashboard]); // Run the effect whenever refreshDashboard changes

    // Listen for screen focus and refresh the dashboard
    useFocusEffect(
        useCallback(() => {
            refreshDashboard();
        }, [refreshDashboard])
    );

    const handleTitlePress = (item) => {
        console.log(item);
        navigation.navigate('ReadStory', { item });      
    };

    const handleDeleteStory = async (item) => {
        try {
            const updatedStoryTitles = storyTitles.filter(story => story.dateName !== item.dateName);
            await AsyncStorage.setItem("storyTitles", JSON.stringify(updatedStoryTitles));
            setStoryTitles(updatedStoryTitles);
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    return (
        <ImageBackground source={MyImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <View style={{ height: 20 }} />
                <TouchableOpacity style={styles.buttonStyle1} >
                    <Button
                        color='#2f8062'
                        title="Go to Create Story Page"
                        onPress={() => navigation.navigate('CreateStory')}
                    />
                </TouchableOpacity>
                <View style={{ height: 20 }} />
                <Text style={[styles.title, { color: 'white' }]}>Saved Stories List:</Text>

                {storyTitles.length > 0 ? (
                    <FlatList
                        data={storyTitles}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleTitlePress(item.dateName)}>
                                <View style={styles.imageItem}>
                                    <View style={styles.imageInfo}>
                                        <Text style={[styles.imageName, { fontSize: 18, width: 200, marginRight: 40 }]}>{JSON.parse(JSON.parse(item.title))}</Text>
                                        <Button title="Delete" color='#c26315' onPress={() => handleDeleteStory(item)} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <Text>No saved stories found</Text>
                )}
                <Button
                    color='#2b3b32'
                    title="Logout"
                    onPress={() => navigation.navigate('Login')}
                />
            </View>
        </ImageBackground>
    );
}
