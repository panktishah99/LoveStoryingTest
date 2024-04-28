import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import * as OpenAIServices from '../components/OpenAIServices';
import * as Machiery from '../components/machinery';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import styles from "./CommonStyleSheet";

//To do
//move generated story text and image to view story page
// add more filters- age etc.
// Add the option to the user to give a name to the story

export default function CreateStory({ navigation}) {
  const [inputText, setInputText] = useState('');
  const [storyData, setStoryData] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
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
      } else if (ageValue > 5 && ageValue <=8){
        setParagraphs('4');
        setSentences('5');
        setWords('15');
      }
      else if (ageValue > 8 && ageValue <=12){
        setParagraphs('5');
        setSentences('7');
        setWords('20');
      }
    }
  };



  // For mocking API calling
const generateStory = async () => {
    try {

      const newInputText = Machiery.createStoryPrompt(inputText, paragraphs, sentences, age, genre, words)

      // Generate story
      const storyResponse = await OpenAIServices.textCompletion(newInputText, 300,0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const story = storyResponse.text.trim(); // Remove leading and trailing whitespaces

      // Generate Title
      const storyTitleResponse = await OpenAIServices.titleGeneration('abc'); //modify this
      const storyTitle = storyTitleResponse.title.trim();


      // Split text into paragraphs based on the newline character (\n)
      const paragraphs = story.split('\n').filter(paragraph => paragraph.trim() !== ''); // Remove empty paragraphs
    
      // Generate images
      const numImg = paragraphs.length;
      const imgPrompt = Machiery.createImagePrompt(story, imageType); 

      const imageData = await OpenAIServices.imageGeneration(imgPrompt, numImg);

      const imageURLs = new Array(imageData.imgURL.length).fill(null);
      for (let i = 0; i < imageData.imgURL.length; i++) {
        console.log("response url: ", imageData.imgURL[i]);
        imageURLs[i] = imageData.imgURL[i];
      }

      // Combine paragraphs and image URLs into an array of objects
      const storyData = paragraphs.map((paragraph, index) => ({
        paragraph:paragraphs[index],
        imageURL: imageURLs[index],
      }));

      // Set story data
      setStoryData(storyData);
      setGeneratedTitle(storyTitle);
      setErrorMessage('');
      // console.log('string: '+storyTitle);
      // console.log('generated: '+generatedTitle);
      //debug shows empty string here - need to check why

      navigation.navigate('ViewStory', { theStoryTitle: storyTitle, theStoryData: storyData});
    } catch (error) {
      setStoryData([]);
      setErrorMessage('Error generating story.' + error.message);
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
        <Button title="Generate Story and Image" onPress={generateStory} />
        <View style={{ height: 20 }} />
      </View>
    </View>
  );
};

//<Image source={imageURL} style={styles.image} />
