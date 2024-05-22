import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './CommonStyleSheet'; // assuming CommonStyleSheet contains your styles

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
            const desiredDateName = item;
            const desiredItem = await getItemByDateName(desiredDateName);

            if (desiredItem !== null) {
                let titleString = JSON.parse(desiredItem.title);
                setTitle(titleString);
                
                let data = desiredItem.storyData;
                setStoryData(data);

                let question1 = desiredItem.question;
                setQuestions(question1);
            } else {
                console.log('No story found with the given title:', title);
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
        navigation.navigate('Questionnaire', { storyTitleQues: storyTitles, questions: questionsData});
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>{storyTitles}</Text>
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
            <Button
                title="Ready to Answer Questions?"
                onPress={goToQuestionnaire}
                color='#256943'
            />
        </View>
    );
}