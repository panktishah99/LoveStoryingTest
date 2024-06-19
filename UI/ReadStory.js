import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, Pressable, Dimensions , ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CommonStyleSheet'; // assuming CommonStyleSheet contains your styles
import MyImage from '../assets/bgimages/notebook.jpg';
import voiceStory from '../components/TextToSpeech';

export default function ViewStory({ navigation, route }) {
    const [storyData, setStoryData] = useState(null);
    const [storyTitles, setTitle] = useState("");
    const [questionsData, setQuestions] = useState(null);
    const { item } = route.params;

    useEffect(() => {
        load();
    }, []);


    const load = async () => {
        try {
            const desiredDateName = item.dateName;
            const desiredItem = await getItemByDateName(desiredDateName);

            if (desiredItem !== null) {
                let titleString = JSON.parse(desiredItem.title);
                setTitle(titleString);

                let data = desiredItem.storyData;
                setStoryData(data);

                let question1 = desiredItem.question;
                setQuestions(question1);
            } else {
                console.log('No story found with the given title:', item.title);
            }
        } catch (err) {
            alert(err);
        }
    }

    const getItemByDateName = async (dateName) => {
        try {
            const allStories = await AsyncStorage.getItem("storyTitles");
            if (allStories !== null) {
                const allStoriesArray = JSON.parse(allStories);
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

    const goToQuestionnaire = async () => {
        navigation.navigate('Questionnaire', { storyTitleQues: storyTitles, questions: questionsData });
    };

    const readStoryAloud = async () => {
        voiceStory(item.title);
        let fullStoryText = '';
        storyData.forEach((item, index) => {
            fullStoryText = fullStoryText + item.paragraph ;
        });
        voiceStory(fullStoryText);
    };

    return (
        <View style={[ styles.container, {padding:0, paddingTop:60}]}>
            <ImageBackground source={MyImage} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={styles.content} style={{backgroundColor: 'transparent'}}>
                <Text style={[styles.title,{padding:20}]}>{storyTitles}</Text>
                {storyData ? (
                    storyData.map((item, index) => (
                        <View key={index} style={styles.storyContainer}>
                            <Text style={styles.content}>{item.paragraph}</Text>
                            <Image source={{ uri: item.imageURL }} style={styles.image} />
                            {/*Image source={{ uri: item.imageURL }} style={styles.image}/>*/}
                        </View>
                    ))
                ) : (
                    <Text> Sorry, no story data available</Text>
                )}
            </ScrollView>
            
            <View style={{padding:20}}>
            <Pressable style={[styles.buttonStyle, {backgroundColor:'#256943',width:250,alignSelf:'center'}]} onPress={goToQuestionnaire}>
                <Text style={styles.buttonText}>Ready to Answer Questions?</Text>
            </Pressable>
            <Pressable style={[styles.buttonStyle, {backgroundColor:'#256943',width:250,alignSelf:'center'}]} onPress={readStoryAloud}>
                <Text style={styles.buttonText}>Read story aloud</Text>
            </Pressable>
            </View>
            </ImageBackground>
        </View>
    );
}