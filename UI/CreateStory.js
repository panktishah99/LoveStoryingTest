import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';

import React, { useState, useEffect, useCallback } from 'react';
import * as OpenAIServices from '../components/OpenAIServices';
import * as Machiery from '../components/machinery';

import styles from "./CommonStyleSheet";
import MyImage from '../assets/bgimages/forest.jpg';

//To do
//move generated story text and image to view story page
// add more filters- age etc.
// Add the option to the user to give a name to the story

export default function CreateStory({ navigation}) {
  const [inputText, setInputText] = useState('');
  const [curStoryData, setCurStoryData] = useState();
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [genre, setGenre] = useState('fiction');
  const [age,setAge] = useState('6');
  const [paragraphs,setParagraphs] = useState('2');
  const [sentences,setSentences] = useState('4');
  const [words,setWords] = useState('20');
  const [imageType,setImageType] = useState('illustration');

  // UseEffect hook to set default input text based on selected genre
  useEffect(() => {
    if (genre === 'fiction') {
      setInputText("a cat and a mouse were best friends...");
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
        setParagraphs('2');
        setSentences('4');
        setWords('20');
      } else if (ageValue > 5 && ageValue <=8){
        setParagraphs('2');
        setSentences('4');
        setWords('20');
      }
      else if (ageValue > 8 && ageValue <=12){
        setParagraphs('2');
        setSentences('4');
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
      const responseData = await storyResponse.json(); // Remove leading and trailing whitespaces 
      // const responseData = storyResponse;
      const story = responseData.text.trim();
      console.log(story);


      // Generate Title
      // const storyTitleResponse = await OpenAIServices.titleGeneration('abc'); //modify this
      // const storyTitle = storyTitleResponse.title.trim();

      // Generate Title
      const titlePrompt = Machiery.createTitlePrompt(story);
      const responseTitle = await OpenAIServices.textCompletion(titlePrompt, 200,0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const dataTitle = await responseTitle.json();
      const storyTitle = dataTitle.text;
      console.log(storyTitle);

      // Generate Questions
      const questionPrompt = Machiery.createQuestions(story);
      const responseQuestion = await OpenAIServices.textCompletion(questionPrompt, 200,0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const dataQuestion = await responseQuestion.json();
      const questions = dataQuestion.text;
      console.log(questions);


      // Split text into paragraphs based on the newline character (\n)
      const paragraphs = story.split('\n').filter(paragraph => paragraph.trim() !== ''); // Remove empty paragraphs
    
      // Generate images
      const numImg = paragraphs.length;
      const imgPrompt = Machiery.createImagePrompt(paragraphs[0], 'illustration'); 
      const imageResponse = await OpenAIServices.imageGeneration(imgPrompt, numImg);
      // const imageData = imageResponse;
      const imageData = await imageResponse.json();

      const imageURLs = new Array(imageData.imgURL.length).fill(null);
      for (let i = 0; i < imageData.imgURL.length; i++) {
        console.log("response url: ", imageData.imgURL[i].url);
        imageURLs[i] = imageData.imgURL[i].url;
      }

        // Combine paragraphs and image URLs into an array of objects
      const storyData = paragraphs.map((paragraph, index) => ({
        paragraph:paragraphs[index],
        imageURL: imageURLs[index],
      }));


      // Set story data
      //setCurStoryData(storyData);
      setGeneratedTitle(storyTitle);
      setErrorMessage('');
      // console.log('string: '+storyTitle);
      // console.log('generated: '+generatedTitle);
      //debug shows empty string here - need to check why
      //console.log(storyData);

      navigation.navigate('ViewStory', { theStoryTitle: storyTitle, theStoryData: storyData, sGenre: genre, uAge: age, questionsResponse: questions}); //=======
      //navigation.navigate('ViewStory', { theStoryTitle: storyTitle, theStoryData: storyData});
    } catch (error) {
      //setStoryData([]);
      setCurStoryData([]);
      console.log("ERROR!");
      console.log(error.message);
      setErrorMessage('Error generating story.' + error.message);
    }
  };



  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.inputLabel}>Select Genre:</Text>
        <View style={styles.storyParameterSelector}>
          <Button
            title="Fiction"
            onPress={() => handleGenreSelect('fiction')}
            disabled={genre === 'fiction'}
            color='#8a3636'
          />
          <Button
            title="Adventure"
            onPress={() => handleGenreSelect('adventure')}
            disabled={genre === 'adventure'}
            color='#8a3636'
          />
          <Button
            title="Moral Story"
            onPress={() => handleGenreSelect('moral')}
            disabled={genre === 'moral'}
            color='#8a3636'
          />
          <Button
            title="Fantasy"
            onPress={() => handleGenreSelect('fantasy')}
            disabled={genre === 'fantasy'}
            color='#8a3636'
          />
          <Button
            title="Poem"
            onPress={() => handleGenreSelect('poem')}
            disabled={genre === 'poem'}
            color='#8a3636'
          />
        </View>
        <View style={{ height: 20 }} />
        <Text style={styles.inputLabel}>Select Image Type:</Text>
        <View style={styles.storyParameterSelector}>
          <Button
            title="Illustration"
            onPress={() => handleImageSelect('illustration')}
            disabled={imageType === 'illustration'}
            color='#8a4736'
          />
          <Button
            title="Historical"
            onPress={() => handleImageSelect('historical image')}
            disabled={imageType === 'historical image'}
            color='#8a4736'
          />
          <Button
            title="Photorealistic"
            onPress={() => handleImageSelect('picture')}
            disabled={imageType === 'picture'}
            color='#8a4736'
          />
        </View>
        <View style={{ height: 30 }} />
        <View style={styles.storyParameterSelector}>
          <Text style={styles.inputLabel}>Enter the Child's Age:</Text>
          <TextInput
              style={[styles.inputNumber, {marginLeft: 50}]}
              onChangeText={handleChangeAge}
              keyboardType="numeric"
              value={age}
          />
        </View>
        <View style={{ height: 20 }} />
        <View style={styles.storyParameterSelector}>
          <Text style={styles.inputLabel}>Total Paragraphs:</Text>
          <TextInput
              style={[styles.inputNumber, {marginLeft: 80}]}
              onChangeText={setParagraphs}
              keyboardType="numeric"
              value={paragraphs}
          />
        </View>
        <View style={styles.storyParameterSelector}>
          <Text style={styles.inputLabel}>Sentences per Paragraph:</Text>
          <TextInput
              style={[styles.inputNumber, {marginLeft: 5}]}
              onChangeText={setSentences}
              keyboardType="numeric"
              value={sentences}
          />
        </View>
        <View style={styles.storyParameterSelector}>
          <Text style={styles.inputLabel}>Words per Sentence:</Text>
          <TextInput
              style={[styles.inputNumber, {marginLeft: 50}]}
              onChangeText={setWords}
              keyboardType="numeric"
              value={words}
          />
        </View>
        
        <View style={{ height: 20 }} />
        <Text style={styles.inputLabel}>Enter your story prompt:</Text>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          multiline
          style={styles.inputText}
          placeholder="Type here..."
        />
        <View style={{ height: 20 }} />
        <Button title="Generate Illustrated Story" onPress={generateStory} color='#bf150f' />
      </View>
    </View>
    </ImageBackground>
  );
};

//<Image source={imageURL} style={styles.image} />
