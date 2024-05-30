import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TouchableHighlight, FlatList, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { firebaseAuth, db } from '../components/FireBaseConfig';
import styles from "./CommonStyleSheet";
import MyImage from '../assets/bgimages/Picture1.png';
import { addDoc, collection, doc, setDoc, getDocs } from "firebase/firestore";
import Icon from 'react-native-vector-icons/Ionicons';
import { SwipeListView } from 'react-native-swipe-list-view';
//const MAX_STORAGE_SIZE = 1533140; // Example: 5MB limit. TODO: Define limit
const MAX_STORAGE_SIZE = 5000000; // Example: 5MB limit. TODO: Define limit

export default function Dashboard({ navigation }) {
    const [storyTitles, setStoryTitles] = useState([]);
    const [cloudStories, setLocalStories] = useState([]);
    const [userId_DB, setUserId_DB] = useState();
    //const todoRef = firebase.firestore().collection('newData');

    const refreshDashboard = useCallback(async () => {
        try {
            //await AsyncStorage.removeItem("storyTitles"); // Used to fix the storage problem
            const titles = await AsyncStorage.getItem("storyTitles");
            if (titles) {
                const titlesInDashboard = JSON.parse(titles);
                setStoryTitles(titlesInDashboard);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);

    useEffect(() => {
        refreshDashboard();
    }, [refreshDashboard]);

    useFocusEffect(
        useCallback(() => {
            refreshDashboard();
        }, [refreshDashboard])
    );

    useEffect(() => {

        const curUser = firebaseAuth.currentUser.uid;   // Gets userId
        console.log("Logged in user: ", curUser);
        setUserId_DB(curUser);
        //writeDataToFirestore(curUser, storyTitles);
        // TODO: Find a better place to call getCloudStories. If placed here, it's called 3 times
        //getCloudStories(curUser);
    }, [storyTitles.length > 0]);

    useEffect(() => {
        if (cloudStories.length > 0) {
            console.log("Called");
            handleStoriesUpdate();
        }
    }, [cloudStories]);

    const writeDataToFirestore = async (userId, curTitles) => {

        try {

            const userDocRef = doc(db, "Users", userId);    // Sets user doc within Users folder
            const collectionRef = collection(userDocRef, "Stories");    // Sets Stories collection within user folder
            //addDoc(collectionRef, curTitles[0]); // Sets  new subcollection and random id
            // Iterates all stories and saves current story in the subcollection of stories
            for (let i = 0; i < curTitles.length; i++) {

                await setDoc(doc(collectionRef, curTitles[i].dateName), curTitles[i]);

                console.log(curTitles[i].dateName);
            }
        } catch (error) {
            return error;
        }
    }
/*
    // handle getCloudStories
    const handleGetCloudStories = async () => {
        const curUser = firebaseAuth.currentUser.uid;   // Gets userId
        // TODO: Find a better place to call getCloudStories. If placed here, it's called 3 times
        getCloudStories(curUser);
    };*/

    const getCloudStories = async (userId) => {
        // Update stories in local AsyncStorage if space is available
        if (getStorageSize()) {
            
            try {
                const querySnapshot = await getDocs(collection(db, "Users", userId, "Stories"));
                const stories = [];
                querySnapshot.forEach((doc) => {
                    stories.push(doc.data());
                });

                //console.log("DB", stories);
                //console.log("Async", storyTitles);
                setLocalStories(stories);

                // Handles local stories update
                //handleStoriesUpdate();
            } catch (error) {
                console.error("Error getting documents: ", error);
            }
        }
    };

    const handleTitlePress = (item) => {
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

    const handleStoriesUpdate = async () => {
        try {
            await AsyncStorage.setItem("storyTitles", JSON.stringify(cloudStories));
            setStoryTitles(cloudStories);
        } catch (error) {
            console.error('Error deleting story:', error);
        }
    };

    // Returns true if there's available memory. Else it will return false
    const getStorageSize = async () => {
        try {
            const allKeys = await AsyncStorage.getAllKeys();
            const allData = await AsyncStorage.multiGet(allKeys);

            let totalSize = 0;

            allData.forEach(([key, value]) => {
                totalSize += key.length + value.length;
            });

            console.log("My storage ", totalSize);

            if (totalSize > MAX_STORAGE_SIZE) {
                console.warn('No space available. Remove some stories.');
                return false;
            }
            
            return true;

            /*
            const key ="storyTitles"
            const value = JSON.stringify(storyTitles);
            const size = key.length + value.length;
            console.log("My storage ", size);*/
            //return totalSize;
        } catch (e) {
            console.error('Error calculating AsyncStorage size', e);
            return false;
        }
    };

    return (
        <ImageBackground source={MyImage} style={styles.backgroundImage}>
            <View style={styles.container}>

                <View style={[styles.syncButtonsContainer, { flexDirection: 'row' }]}>
                    <TouchableOpacity style={[styles.buttonStyle, { width: 120, marginHorizontal: 10 }]} onPress={() => getCloudStories(userId_DB)}>
                        <Icon name="arrow-down" size={30} color="#fff" />
                        <Text style={styles.buttonText}>Pull stories</Text>
                        {/*<Button
                        titleStyle={{color : '#FFFFFF'}}
                        //color='#0000FF'
                        title="Pull my stories from database"
                        buttonStyle={{backgroundColor: '#0000FF'}}
                        onPress={() => handleGetCloudStories()}
                    />*/}
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonStyle, { width: 120, marginHorizontal: 10 }]} onPress={() => writeDataToFirestore(userId_DB, storyTitles)} >
                        <Icon name="arrow-up" size={30} color="#fff" />
                        <Text style={styles.buttonText}>Push stories</Text>
                    </TouchableOpacity>
                </View>
                {/*<TouchableOpacity style={styles.buttonStyle1} >
                    <Button
                        color='#2f8062'
                        title="Go to Create Story Page"
                        onPress={() => navigation.navigate('CreateStory')}
                    />
                </TouchableOpacity>*/}
                <View style={{ height: 10 }} />
                <Pressable style={[styles.buttonStyle, {backgroundColor:'#a8481e', width: 240}]} onPress={() => navigation.navigate('CreateStory')}>
                    <Text style={styles.buttonText}>Go to Create Story Page</Text>
                </Pressable>

                <View style={{ height: 20 }} />
                <Text style={[styles.title, { color: 'white' }]}>My Saved Stories: {storyTitles.length}</Text>

                {storyTitles.length > 0 ? (
                    <SwipeListView
                        //data={storyTitles}
                        data={storyTitles.slice().reverse()} // Reverse the array
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableHighlight underlayColor="#006400" style={styles.selectStory} onPress={() => handleTitlePress(item.dateName)}>
                                <View style={styles.imageItem}>
                                    <Image
                                        source={{ uri: item.coverURL }}
                                        style={{ width: 90, height: 90, marginRight: 10 }}
                                    />
                                    <View style={styles.imageInfo}>
                                        <Text style={[styles.imageName, { width: 240 }]}>{JSON.parse(item.title)}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        )}
                        renderHiddenItem={({ item }) => (
                            <View style={styles.rowBack}>
                                <Pressable style={styles.deleteButton} onPress={() => handleDeleteStory(item)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </Pressable>
                            </View>
                        )}
                        leftOpenValue={0}
                        rightOpenValue={-75}
                    />
                ) : (
                    <Text style={{ backgroundColor: 'white', color: 'black', fontSize: 20 }}>No saved stories found</Text>
                )}
                <View style={{ flexDirection: 'row' }}>
                    <Pressable style={[styles.buttonStyle, { width: 90, marginHorizontal: 10, backgroundColor:'#752a19' }]} onPress={() => firebaseAuth.signOut()}>
                        <Text style={styles.buttonText}>Logout</Text>
                    </Pressable>
                    {/*<Pressable style={[styles.buttonStyle, { width: 170, marginHorizontal: 10, backgroundColor:'#143005' }]} onPress={() => firebaseAuth.signOut()}>
                        <Text style={styles.buttonText}>Change Password</Text>
                    </Pressable>*/}
                </View>
            </View>
        </ImageBackground>
    );
}


