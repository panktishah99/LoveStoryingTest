import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as OpenAIServices from '../components/OpenAIServices';

export default function ViewStory({ navigation, route }) {
  const [paragraphs, setParagraphs] = useState([]); // paragraphs in JSON
  //const [imageURLs, setImageURLs] = useState([]); // http images
  const [imageURLs, setImageURLs] = useState(""); // dummy http images
  // const { item, img } = route.params;
  const { theStoryTitle, theStoryData } = route.params;
  // console.log(theStoryTitle);
  // console.log(theStoryData);
  // const [title, setTitle] = useState("") // Title of the story

  // Used to extract paragraphs when the component mounts and extract .jpg
  // useEffect(() => {
  //   const extractedParagraphs = extractParagraphs(item);
  //   setParagraphs(extractedParagraphs);
  //   setImageURLs(img);
  //   // setTitle("TestTitle")
  // }, []);

  // Function to extract paragraphs from JSON data
  // const extractParagraphs = (item) => {
  //   const paragraphsArray = item.split('\n').filter(paragraph => paragraph.trim() !== '');
  //   return paragraphsArray;
  // };

  /////////////// Functions that saves data to Directory /////////////
  // Function to convert and store the array as JSON

  const goToQuestionnaire = async () => {
  	//We will have some API call to GPT to generate questions based on the story
  	//Forward these to Questionnaire page from here
  	const questionsResponse = await OpenAIServices.questionsGenerator('someStoryText');
    const generatedQuestions = questionsResponse.text.trim(); // Remove leading and trailing whitespaces

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
  	navigation.navigate('Questionnaire', { storyTitle: theStoryTitle, questionsArray: theQuestions, answersArray: theAnswersWithoutPrefix});
  };
  const saveStory = async () => {
    // Save each image to local storage
    try {
      const jsonParagraphs = JSON.stringify(paragraphs);
      // Create json of story
      let story = {
        title: theStorytitle,
        text: jsonParagraphs,
        images: imageURLs,
      };
      await AsyncStorage.setItem(title, JSON.stringify(story));
      alert("Story saved successfully!");
    } catch (err) {
      alert(err);
    }
  };
  ////////////////////////////////////////////////////////////////////

  // Load function
  const load = async () => {
    try {
      let savedStory = await AsyncStorage.getItem("TestTitle"); // this might change in actual implementation
      console.log(savedStory);
      if (savedStory !== null) {
        // Parsing the JSON back into an object
      let loadedStory = JSON.parse(savedStory);
      console.log(loadedStory.text);
      /*
      // Set specific parts of the loaded story
      setTitle(loadedStory.title);
      setParagraphs(loadedStory.text);
      setImageURLs(loadedStory.images);*/
      }
      else {
        console.log('No story found with the given title:', title);
      }

    } catch (err) {
      alert(err);
    }
  }
  /////////////////////////////////////////////////////////////////////

  // This will only rerender on the initial page load
  /*
  useEffect(() => {
    //load();
  }, []);*/

  return (
  	<View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.storyTitle}>{theStoryTitle}</Text>
        {theStoryData.map((item, index) => (
          <View key={index} style={styles.storyContainer}>
            

            <Text style={styles.storyText}>{item.paragraph}</Text>
            <Image source={ item.imageURL } style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 20 }} />
      <Button
        title="Ready to Answer Questions?"
        onPress={goToQuestionnaire}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Save story"
        onPress={() => {saveStory();}}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Swansea',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    fontFamily: 'Swansea',
  },
  genreSelector: {
    fontFamily: 'Swansea',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  content: {
    fontFamily: 'Swansea',
    flexGrow: 1,
    paddingTop: 20,
  },
  storyContainer: {
    marginBottom: 20,
  },
  storyTitle: {
    fontFamily: 'Swansea',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storyText: {
    fontFamily: 'Swansea',
    fontSize: 16,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});