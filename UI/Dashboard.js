import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect

import { firebaseAuth } from '../components/FireBaseConfig';

import styles from "./CommonStyleSheet";
import MyImage from '../assets/bgimages/Picture1.png';

export default function Dashboard({ navigation }) {
    const [storyTitles, setStoryTitles] = useState([]);

    // Function to refresh the dashboard
    const refreshDashboard = useCallback(async () => {
        try {
            const titles = await AsyncStorage.getItem("storyTitles");
            if (titles) {
                const titlesInDashboard = JSON.parse(titles);
                setStoryTitles(titlesInDashboard);
            }
        } catch (err) {
            console.error(err);
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

    const remove = async () => {
        try {
            await AsyncStorage.removeItem("storyTitles");
            setStoryTitles([]);
        } catch (err) {
            console.error('Error remove story:',err);
        }
    };

    const handleTitlePress = (item) => {
        navigation.navigate('ReadStory', { item });
        //console.log("HERE")
        console.log(item);
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
                        color = '#2f8062'
                        title="Go to Create Story Page"
                        onPress={() => navigation.navigate('CreateStory')}
                    />
                </TouchableOpacity>
                <View style={{ height: 20 }} />
                <Text style={[styles.title,{ color: 'white'}]}>Saved Stories List:</Text>

                {storyTitles.length > 0 ? (
                    <FlatList

    data={storyTitles}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleTitlePress(item.dateName)}>
            <View style={styles.imageItem}>
                <View style={styles.imageInfo}>
                    {/* Display the cover image */}
                    <Image
                        source={{ uri:item.coverURL}}
                        style={styles.image,{ width: 90, height: 90, marginRight: 10 }}
                    />
                    {/* Display the story title */}
                    <Text style={styles.imageName}>{JSON.parse(item.title)}</Text>
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
                    color = '#2b3b32'
                    title="Logout"
                    onPress={()=>firebaseAuth.signOut()}
                />
            </View>
        </ImageBackground>
    );
}
