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
  const [age,setAge] = useState(6);
  const [paragraphs,setParagraphs] = useState('4');
  const [sentences,setSentences] = useState('5');
  const [words,setWords] = useState('15');
  const [imageType,setImageType] = useState('illustration');

  // UseEffect hook to set default input text based on selected genre
  useEffect(() => {
    if (genre === 'fiction') {
      setInputText("a cat and a mouse are best friends");
    } else if (genre === 'poem') {
      setInputText("a poem about Seattle");
    }
    else if (genre === 'fantasy'){
      setInputText("as the rest of the world sleeps, a fairy visits a girl named Sarah");
    }
    else if (genre === 'adventure'){
      setInputText("a boy named John climbs the top of the hill only to find...");
    }
    else if (genre === 'moral'){
      setInputText("Pinocchio's nose grew longer and longer as he...");
    }
  }, [genre]);

  const handleGenreSelect = (selectedGenre) => {
    if (selectedGenre !== genre) {
      setGenre(selectedGenre);
    }
  };

  const handleImageSelect = (selectedImageType) => {
    if (selectedImageType !== imageType) {
      setImageType(selectedImageType);
    }
  };


  const handleChangeAge = (text) => {
    const ageValue = Number(text);
    setAge(ageValue);
    if (!isNaN(ageValue)) {
      if(ageValue >= 3 && ageValue <=5){
        setParagraphs('3');
        setSentences('3');
        setWords('10');
        console.log("here1");
      } else if (ageValue > 5 && ageValue <=8){
        setParagraphs('4');
        setSentences('5');
        setWords('15');
        console.log("here2");
      }
      else if (ageValue > 8 && ageValue <=12){
        setParagraphs('5');
        setSentences('7');
        setWords('20');
        console.log("here3");
      }
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
        <View style={styles.storyParameterSelector}>
          <Button
            title="Fiction"
            onPress={() => handleGenreSelect('fiction')}
            disabled={genre === 'fiction'}
            color={genre === 'fiction' ? '#ccc' : null}
            style={{ backgroundColor: genre === 'fiction' ? '#3CB371' : null }}
          />
          <Button
            title="Adventure"
            onPress={() => handleGenreSelect('adventure')}
            disabled={genre === 'adventure'}
            color={genre === 'adventure' ? '#ccc' : null}
            style={{ backgroundColor: genre === 'adventure' ? '#3CB371' : null }}
          />
          <Button
            title="Moral Story"
            onPress={() => handleGenreSelect('moral')}
            disabled={genre === 'moral'}
            color={genre === 'moral' ? '#ccc' : null}
            style={{ backgroundColor: genre === 'moral' ? '#3CB371' : null }}
          />
          <Button
            title="Fantasy"
            onPress={() => handleGenreSelect('fantasy')}
            disabled={genre === 'fantasy'}
            color={genre === 'fantasy' ? '#ccc' : null}
            style={{ backgroundColor: genre === 'fantasy' ? '#3CB371' : null }}
          />
          <Button
            title="Poem"
            onPress={() => handleGenreSelect('poem')}
            disabled={genre === 'poem'}
            color={genre === 'poem' ? '#ccc' : null}
            style={{ backgroundColor: genre === 'poem' ? '#3CB371' : null }}
          />
        </View>
        <View style={{ height: 20 }} />
        <View style={styles.storyParameterSelector}>
          <Text style={styles.title}>Enter the child age:</Text>
          <TextInput
              style={[styles.input, { width: 50 }]}
              onChangeText={handleChangeAge}
              keyboardType="numeric"
              value={age}
          />
        </View>
        <View style={{ height: 20 }} />
        <Text style={styles.title}>Story Size:</Text>
        <View style={styles.storyParameterSelector}>
          <Text style={styles.title}>Paragraphs:</Text>
          <TextInput
              style={[styles.input, { width: 40 }]}
              onChangeText={setParagraphs}
              keyboardType="numeric"
              value={paragraphs}
          />
          <Text style={styles.title}>Sentences:</Text>
          <TextInput
              style={[styles.input, { width: 40 }]}
              onChangeText={setSentences}
              keyboardType="numeric"
              value={sentences}
          />
          <Text style={styles.title}>Words:</Text>
          <TextInput
              style={[styles.input, { width: 40 }]}
              onChangeText={setWords}
              keyboardType="numeric"
              value={words}
          />
        </View>
        <View style={{ height: 20 }} />
        <Text style={styles.title}>Select Image Type:</Text>
        <View style={styles.storyParameterSelector}>
          <Button
            title="Illustration"
            onPress={() => handleImageSelect('illustration')}
            disabled={imageType === 'illustration'}
            color={imageType === 'illustration' ? '#ccc' : null}
            style={{ backgroundColor: imageType === 'illustration' ? '#3CB371' : null }}
          />
          <Button
            title="Cartoon"
            onPress={() => handleImageSelect('cartoon')}
            disabled={imageType === 'cartoon'}
            color={imageType === 'cartoon' ? '#ccc' : null}
            style={{ backgroundColor: imageType === 'cartoon' ? '#3CB371' : null }}
          />
          <Button
            title="Photorealistic"
            onPress={() => handleImageSelect('photorealistic')}
            disabled={imageType === 'photorealistic'}
            color={imageType === 'photorealistic' ? '#ccc' : null}
            style={{ backgroundColor: imageType === 'photorealistic' ? '#3CB371' : null }}
          />
          <Button
            title="Fantasy"
            onPress={() => handleImageSelect('fantasy')}
            disabled={imageType === 'fantasy'}
            color={imageType === 'fantasy' ? '#ccc' : null}
            style={{ backgroundColor: imageType === 'fantasy' ? '#3CB371' : null }}
          />
        </View>
        <View style={{ height: 20 }} />
        <Text style={styles.title}>Enter your story prompt:</Text>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          multiline
          style={[styles.input, { width: 400 }]}
          placeholder="Type here..."
        />
        <Button title="Generate Story and Image" onPress={generateStoryAndImage} />
        <View style={{ height: 20 }} />
        <Button
          title="Create Story"
          onPress={() => navigation.navigate('ViewStory', {item: storyText, img: imageURL})}
        />
      </View>
    </View>
  );
};

//<Image source={imageURL} style={styles.image} />
