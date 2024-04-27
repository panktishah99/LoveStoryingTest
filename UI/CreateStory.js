import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import * as OpenAIServices from '../components/OpenAIServices';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import styles from "./CommonStyleSheet";

//To do
//move generated story text and image to view story page
// add more filters- age etc.
// Add the option to the user to give a name to the story

export default function CreateStory({ navigation}) {
  const [inputText, setInputText] = useState('');
  const [storyText, setStoryText] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [genre, setGenre] = useState('fiction');

  // UseEffect hook to set default input text based on selected genre
  useEffect(() => {
    if (genre === 'fiction') {
      setInputText("a cat is dancing for under 12 years old kids.");
    } else if (genre === 'poem') {
      setInputText("a poem about Seattle for under 12 years old kids.");
    }
  }, [genre]);

  const handleGenreSelect = (selectedGenre) => {
    if (selectedGenre !== genre) {
      setGenre(selectedGenre);
    }
  };

  const generateStoryAndImage = async () => {
    try {
      // Generate story based on input text and selected genre
      //const storyResponse = await OpenAIServices.textCompletion(inputText, 30, 0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct', genre);
      //const story = storyResponse.text;
      const temp = require('../assets/test1.json'); // dummy data
      const story = temp.choices[0].text; // dummy data

      // Generate image based on generated story and selected genre
      //const imageResponse = await OpenAIServices.imageGeneration(story, genre);
      //const imageURL = imageResponse.imgURL;
      const imageURL = 'http://picsum.photos/300'; //dummy data

      // Set story text and image URL
      setStoryText(story);
      setImageURL(imageURL);
      setErrorMessage('');
    } catch (error) {
      setStoryText('');
      setImageURL('');
      setErrorMessage('Error generating story or image. Please try again.' + error.message);
    }
  };

  const [fontsLoaded, fontError] = useFonts({
    'Swansea': require('../assets/fonts/Swansea.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Select Genre:</Text>
        <View style={styles.genreSelector}>
          <Button
            title="Fiction"
            onPress={() => handleGenreSelect('fiction')}
            disabled={genre === 'fiction'}
            color={genre === 'fiction' ? '#ccc' : null}
            style={{ backgroundColor: genre === 'fiction' ? '#3CB371' : null }}
          />
          <Button
            title="Poem"
            onPress={() => handleGenreSelect('poem')}
            disabled={genre === 'poem'}
            color={genre === 'poem' ? '#ccc' : null}
            style={{ backgroundColor: genre === 'poem' ? '#3CB371' : null }}
          />
        </View>
        <Text style={styles.title}>Enter Your Story Requirement:</Text>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          multiline
          style={[styles.input, { width: Dimensions.get('window').width - 40 }]}
          placeholder="Type here..."
        />
        <Button title="Generate Story and Image" onPress={generateStoryAndImage} />
        <View style={{ height: 20 }} />
        <Button
          title="Create Story"
          onPress={() => navigation.navigate('ViewStory', {item: storyText, img: imageURL})}
        />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {storyText ? (
          <View style={styles.storyContainer}>
            <Text style={styles.storyTitle}>Generated Story:</Text>
            <Text style={styles.storyText}>{storyText}</Text>
          </View>
        ) : null}
        {imageURL ? (
          <View style={styles.imageContainer}>
            <Text style={styles.storyTitle}>Image:</Text>
            <Image source={{ uri: imageURL }} style={styles.image} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

//<Image source={imageURL} style={styles.image} />
