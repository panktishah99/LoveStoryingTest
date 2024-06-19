import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as OpenAIServices from '../components/OpenAIServices';
import MyImage from '../assets/bgimages/notebook.jpg';
import styles from "./CommonStyleSheet"

export default function ViewStory({ navigation, route }) {

  const [myTitle, setTitle] = useState("") // Title of the story
  const [storyGenre, setStoryGenre] = useState("");
  const [userAge, setUserAge] = useState("");
  // const { item, img } = route.params;
  const { theStoryTitle, theStoryData, theCoverURL, sGenre, uAge, questionsResponse } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  //=====================
  const goToQuestionnaire = async () => {

    // Navigate to the Questionnaire screen and pass the data
    navigation.navigate('Questionnaire', { storyTitleQues: theStoryTitle, questions: questionsResponse });
  };


  // This will only rerender on the initial page load
  useEffect(() => {
    console.log("In ViewStory");
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
  

////=============== Save story to Server===============
  const saveStoryToServer = async (story) => {
    try {

      const response = await OpenAIServices.saveToServerAll(story);
      //const data = await regisResponse.json();

      if (response.ok) {
        console.log('Story saved to server successfully!');
      } else {
        console.error('Failed to save story to server:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving story to server:', error);
    }
  };

////===========================================================


  /////////////// Functions that saves data to Directory /////////////
  // Function to convert and store the array as JSON

  const saveStory = async () => {
    console.log("save story--- theStoryData", theStoryData);

    // Get the current time
    const currentTime = new Date();
    setIsLoading(true);


    // Save each image to local storage
    try {
      // Use the formatted time as the name for storing data
      //const dataName = `story_${formattedTime}`;
      const dataName = `story_${new Date().getTime()}`

      // Create json of story
      let story = {
        dateName: dataName,
        title: myTitle,
        storyData: theStoryData,
        coverURL: theCoverURL,
        genre: storyGenre,
        age: userAge,
        question: questionsResponse,
      };

      // titles key will have as a value a Json where the list of created stories will be stored
      let titlesJSONString = await AsyncStorage.getItem("storyTitles");
      // If no titles saved yet, initialize an empty array
      let titlesArray = titlesJSONString ? JSON.parse(titlesJSONString) : [];
      //const jsonParagraphs = JSON.stringify(paragraphs);
      titlesArray.push(story);

      await AsyncStorage.setItem("storyTitles", JSON.stringify(titlesArray));

	  // Save story to server
	  await saveStoryToServer(story);

      alert("Story saved successfully!");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };


  // Load function
  const load = async () => {
    try {
      let savedStory = await AsyncStorage.getItem("TestTitle"); // this might change in actual implementation
      //console.log(savedStory);
      if (savedStory !== null) {
        // Parsing the JSON back into an object
        let loadedStory = JSON.parse(savedStory);
      }
      else {
        console.log('No story found with the given title:', title);
      }

    } catch (err) {
      alert(err);
    }
  }

  console.log("viewstory URL output:", theStoryData.map((item) => item.imageURL));

  return (
    
    <View style={[ styles.container, {padding:0, paddingTop:60}]}>
      <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={styles.content} style={{backgroundColor: 'transparent'}}>
        <Text style={[styles.title,{padding:20}]}>{theStoryTitle}</Text>
        {theStoryData.map((item, index) => (
          <View key={index} style={styles.storyContainer}>

            <Text style={styles.content}>{item.paragraph}</Text>
            {/*Old version*/}
            <Image source={{ uri: item.imageURL }} style={styles.image} />

            {/*<Image source={ item.imageURL } style={styles.image} />*/}
            {/*Image source={{ uri: item.imageURL }} style={styles.image} />*/}
          </View>
        ))}
      </ScrollView>
     
      <View style={{padding:15}}>
      <Pressable style={[styles.buttonStyle, {backgroundColor:'#256943',width:250,alignSelf:'center'}]} onPress={goToQuestionnaire}>
        <Text style={styles.buttonText}>Ready to Answer Questions?</Text>
      </Pressable>
      <View style={{height:10}}/>
      {isLoading ? (<ActivityIndicator size="large" color="#274b7a" />)
        : (
          <Pressable style={[styles.buttonStyle, {backgroundColor:'#274b7a',width:120,alignSelf:'center'}]} onPress={() => { saveStory(); }}>
            <Text style={styles.buttonText}>Save story</Text>
          </Pressable>
        )
      }
      </View>
      </ImageBackground>
    </View>
    // </ImageBackground>
  );

}