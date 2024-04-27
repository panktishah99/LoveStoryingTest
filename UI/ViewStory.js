import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function ViewStory({ navigation, route }) {
  const [paragraphs, setParagraphs] = useState([]); // paragraphs in JSON
  //const [imageURLs, setImageURLs] = useState([]); // http images
  const [imageURLs, setImageURLs] = useState(""); // dummy http images
  const { item, img } = route.params;

// Function to extract paragraphs from JSON data
const extractParagraphs = (item) => {
  const paragraphsArray = item.split('\n').filter(paragraph => paragraph.trim() !== '');
  return paragraphsArray;
};

  // Used to extract paragraphs when the component mounts and extract .jpg
  useEffect(() => {
    const extractedParagraphs = extractParagraphs(item);
    setParagraphs(extractedParagraphs);
    setImageURLs(img);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {item ? (
          <View style={styles.storyContainer}>
            <Text style={styles.storyTitle}>Generated Story:</Text>
            <Text style={styles.storyText}>{item}</Text>
          </View>
        ) : null}
        {imageURLs[0] ? (
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
    </View>
  );
}

// - read data from api - see function in CreateStory.js
// - format text and image 
// - Add save story button

/* {paragraphs.map((paragraph, index) => (
        <View key={index}>
          <Text>{paragraph}</Text>
        </View>
      ))} */

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