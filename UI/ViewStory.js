import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewStory({ navigation, route }) {
  const [paragraphs, setParagraphs] = useState([]); // paragraphs in JSON
  //const [imageURLs, setImageURLs] = useState([]); // http images
  const [imageURLs, setImageURLs] = useState(""); // dummy http images
  const { item, img } = route.params;
  const [title, setTitle] = useState("") // Title of the story

  // Used to extract paragraphs when the component mounts and extract .jpg
  useEffect(() => {
    const extractedParagraphs = extractParagraphs(item);
    setParagraphs(extractedParagraphs);
    setImageURLs(img);
    setTitle("Test Title")
  }, []);

  // Function to extract paragraphs from JSON data
  const extractParagraphs = (item) => {
    const paragraphsArray = item.split('\n').filter(paragraph => paragraph.trim() !== '');
    return paragraphsArray;
  };

  /////////////// Functions that saves data to Directory /////////////
  // Function to convert and store the array as JSON

  const saveStory = async () => {
    let titlesJSONString = await AsyncStorage.getItem("titles");
    // If no titles saved yet, initialize an empty array
    let titlesArray = titlesJSONString ? JSON.parse(titlesJSONString) : [];

    // Add the title of the new story to the array
    titlesArray.push(title);

    // Save each image to local storage
    try {
      const jsonParagraphs = JSON.stringify(paragraphs);
      // Create json of story
      let story = {
        title: title,
        text: jsonParagraphs,
        images: imageURLs,
      };

      // Add the title of the new story to the array
      //titlesArray.push(title);
      await AsyncStorage.setItem(title, JSON.stringify(story));

      // Convert the array of stories back to a JSON string
      let updatedTitlesJSON = JSON.stringify(titlesArray);
      // Store the updated JSON object back into AsyncStorage
      await AsyncStorage.setItem("titles", updatedTitlesJSON);

      console.log(updatedTitlesJSON)

      alert("Story saved successfully!");
    } catch (err) {
      alert(err);
    }
  };
  ////////////////////////////////////////////////////////////////////

  // Loaf function
  const load = async () => {
    try {
      let savedStory = await AsyncStorage.getItem("Test Title"); // this might change in actual implementation
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
        {/*<Text style={styles.storyText}>{paragraphs}</Text>*/}
        {paragraphs ? (
          <View style={styles.storyContainer}>
            <Text style={styles.storyTitle}>{title}</Text>
            {paragraphs.map((paragraph, index) => (
              <View key={index}>
                <Text>{paragraph}</Text>
              </View>
            ))}
          </View>
        ) : null}
        {imageURLs ? (
          <View style={styles.imageContainer}>
            <Text style={styles.storyTitle}>Image:</Text>
            <Image source={{ uri: imageURLs }} style={styles.image} />
          </View>
        ) : null}
      </ScrollView>
      <View style={{ height: 20 }} />
      <Button
        title="Go back to Create Story"
        onPress={() => navigation.navigate('CreateStory')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="Ready to Answer Questions?"
        onPress={() => navigation.navigate('Questionnaire')}
      />
      <Button
        title="Save story"
        onPress={() => {
          saveStory();
        }}
      />
    </View>
  );
}

// - read data from api - see function in CreateStory.js
// - format text and image 
// - Add save story button

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