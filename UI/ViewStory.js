import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as OpenAIServices from '../components/OpenAIServices';
import MyImage from '../assets/bgimages/viewstory.jpg';
import styles from "./CommonStyleSheet"

export default function ViewStory({ navigation, route }) {
  const [myTitle, setTitle] = useState("") // Title of the story
  const [storyGenre, setStoryGenre] = useState("");
  const [userAge, setUserAge] = useState("");
  const { theStoryTitle, theStoryData, sGenre, uAge, questionsResponse } = route.params;

  // Function that redirects user to the questionnaire
  const goToQuestionnaire = async () => {
    //We will have some API call to GPT to generate questions based on the story
    //Forward these to Questionnaire page from here
    // const questionsResponse = await OpenAIServices.questionsGenerator('someStoryText');
    const generatedQuestions = questionsResponse; // Remove leading and trailing whitespaces

    // Split text into paragraphs based on the newline character (\n)
    const questions = generatedQuestions.split('\n').filter(questions => questions.trim() !== ''); // Remove empty paragraphs

    const theQuestions = questions.filter((_, index) => index % 2 === 0);
    const theAnswers = questions.filter((_, index) => index % 2 !== 0);
    const theAnswersWithoutPrefix = theAnswers.map(theAnswer => theAnswer.slice(8));

    // Combine paragraphs and image URLs into an array of objects
    // const questionsMap = questions.map((paragraph, index) => ({
    //   paragraph:paragraphs[index],
    //   imageURL: imageURLs[index],
    // }));
    // console.log(questions);
    navigation.navigate('Questionnaire', { storyTitle: theStoryTitle, questionsArray: theQuestions, answersArray: theAnswersWithoutPrefix });
  };

  // This will only rerender on the initial page load
  useEffect(() => {
    setData();
  }, []);

  // Set initial data
  const setData = async () => {
    const theTitle = JSON.stringify(theStoryTitle);
    setTitle(theTitle);
    const theGenre = JSON.stringify(sGenre);
    setStoryGenre(theGenre);
    const theAge = JSON.stringify(uAge);
    setUserAge(theAge);
  }

  /////////////// Functions that saves data to Directory /////////////
  // Function to convert and store the array as JSON
  const saveStory = async () => {
    console.log(theStoryData);

    // Get the current time
    const currentTime = new Date();

    // Format the current time
    /*const formattedTime = `${currentTime.getFullYear()}${(currentTime.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${currentTime
        .getDate()
        .toString()
        .padStart(2, '0')}${currentTime
          .getHours()
          .toString()
          .padStart(2, '0')}${currentTime
            .getMinutes()
            .toString()
            .padStart(2, '0')}${currentTime
              .getSeconds()
              .toString()
              .padStart(2, '0')}`;*/

    // Save each image to local storage
    try {
      // Use the formatted time as the name for storing data
      //const dataName = `story_${formattedTime}`;
      const dataName = `story_${new Date().getTime()}`

      // Create JSON of story
      let story = {
        dateName: dataName,
        title: myTitle,
        storyData: theStoryData,
        genre: storyGenre,
        age: userAge,
      };

      // Titles key will have as a value a JSON where the list of created stories will be stored
      let titlesJSONString = await AsyncStorage.getItem("storyTitles");
      // If no titles saved yet, initialize an empty array
      let titlesArray = titlesJSONString ? JSON.parse(titlesJSONString) : [];
      titlesArray.push(story);

      // Store the updated JSON object back into AsyncStorage
      await AsyncStorage.setItem("storyTitles", JSON.stringify(titlesArray));

      alert("Story saved successfully!");
    } catch (err) {
      alert(err);
    }
  };
  ////////////////////////////////////////////////////////////////////
  return (
    // <ImageBackground source={MyImage} style={styles.backgroundImage}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{theStoryTitle}</Text>
        {theStoryData.map((item, index) => (
          <View key={index} style={styles.storyContainer}>

            <Text style={styles.content}>{item.paragraph}</Text>
            <Image source={{ uri: item.imageURL }} style={styles.image} />

          </View>
        ))}
      </ScrollView>
      <View style={{ height: 20 }} />
      <Button
        title="Ready to Answer Questions?"
        onPress={goToQuestionnaire}
        color='#256943'
      />
      <View style={{ height: 20 }} />
      <Button
        title="Save story"
        onPress={() => { saveStory(); }}
        color='#274b7a'
      />
    </View>
    // </ImageBackground>
  );
}
