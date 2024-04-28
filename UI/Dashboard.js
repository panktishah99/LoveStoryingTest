import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet";
import MyImage from '../assets/bgimages/Picture1.png';

export default function Dashboard({ navigation }) {
    const [storyTitles, setStoryTitles] = useState([]);

    useEffect(() => {
        refreshDashboard();
    }, []);

    const refreshDashboard = async () => {
        try {
            const titles = await AsyncStorage.getItem("storyTitles");
            if (titles) {
                const titlesInDashboard = JSON.parse(titles);
                setStoryTitles(titlesInDashboard);
            }
        } catch (err) {
            alert(err);
        }
    };

    const remove = async () => {
        try {
            await AsyncStorage.removeItem("storyTitles");
            setStoryTitles([]);
        } catch (err) {
            alert(err);
        }
    };

    return (
        <ImageBackground source={MyImage} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text>Hello World! This is the Dashboard</Text>
                <View style={{ height: 20 }} />
                <Button
                    title="Go to Create Story Page"
                    onPress={() => navigation.navigate('CreateStory')}
                />
                <Button
                    title="Go to Read Story Page"
                    onPress={() => navigation.navigate('ReadStory')}
                />
                <TouchableOpacity style={styles.buttonStyle1} onPress={remove}>
                    <Text style={{ color: "white" }}>Remove my story!</Text>
                </TouchableOpacity>

                {storyTitles.length > 0 ? (
                    <FlatList
                        data={storyTitles}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.imageItem}>
                                <View style={styles.imageInfo}>
                                    <Text style={styles.imageName}>{item.title}</Text>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text>No saved stories found</Text>
                )}
            </View>
        </ImageBackground>
    );
}
