import React, { useState, useEffect } from 'react';
import * as OpenAIServices from '../components/OpenAIServices';
import * as Machiery from '../components/machinery';
import styles from './CommonStyleSheet';
//import MyImage from '../assets/bgimages/forest.jpg';
import { View, Text, TextInput, Button, ImageBackground, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function CreateStory({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [genre, setGenre] = useState('fiction');
  const [imageType, setImageType] = useState('illustration');

  const [age, setAge] = useState('6');
  const [paragraphs, setParagraphs] = useState('1');
  const [sentences, setSentences] = useState('2');
  const [words, setWords] = useState('10');
  const [isError, setIsError] = useState(false);

  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(12);
  const [fieldName, setFieldName] = useState('');

  const [firstLaunch, setLaunch] = useState(true);

  const [isLoading, setIsLoading] = useState(false);


  const dataKey = "selectedData"

  const storyData = {
    storyGenre: genre,
    childAge: age,
    paragraphsInText: paragraphs,
    sentencesInParagraph: sentences,
    wordsInSentence: words,
    imageTypeInStory: imageType,
    inputTextInStory: inputText
  }

  useEffect(() => {
    // Set default input text based on selected genre
    const defaultText = {
      fiction: "a cat and a mouse were best friends...",
      poem: "a poem about Seattle",
      adventure: "a boy named John climbs the top of the hill only to find...",
      moral: "Pinocchio's nose grew longer and longer as he..."
    };
    setInputText(defaultText[genre]);
  }, [genre]);

  // Load saved data on launch
  useEffect(() => {
    console.log("2")
    loadSavedData();
  }, []);

  // Update on storyData and inputText change
  useEffect(() => {
    console.log("3")
    storyData.inputTextInStory = inputText;
    updateData();
  }, [storyData || inputText]);

  // Loads saved data on launch
  const loadSavedData = async () => {
    try {
      let getData = await AsyncStorage.getItem(dataKey);
      if (getData !== null) {
        let myData = JSON.parse(getData);

        storyData.storyGenre = myData.storyGenre;
        storyData.childAge = myData.childAge;
        storyData.paragraphsInText = myData.paragraphsInText;
        storyData.sentencesInParagraph = myData.sentencesInParagraph;
        storyData.wordsInSentence = myData.wordsInSentence;
        storyData.imageTypeInStory = myData.imageTypeInStory;
        storyData.inputTextInStory = myData.inputTextInStory;

        setGenre(storyData.storyGenre);
        setAge(storyData.childAge);
        setParagraphs(storyData.paragraphsInText);
        setSentences(storyData.sentencesInParagraph);
        setWords(storyData.wordsInSentence);
        setImageType(storyData.imageTypeInStory);
        setInputText(storyData.inputTextInStory);

        setLaunch(false);   // This is used to avoid first useEffect to write over saved input
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
      Alert.alert('Error', 'Failed to load data.');
    }
  }

  // Updates data on change of storyData
  const updateData = async () => {
    try {
      await AsyncStorage.setItem(dataKey, JSON.stringify(storyData));
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save input.');
    }
  }

  // Handles genre selection
  const handleGenreSelect = async (selectedGenre) => {
    try {
      if (selectedGenre !== genre) {
        setGenre(selectedGenre);
        storyData.storyGenre = selectedGenre;
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save input.');
    }
  };

  // Handles image type selection
  const handleImageSelect = async (selectedImageType) => {
    try {
      if (selectedImageType !== imageType) {
        setImageType(selectedImageType);
        storyData.imageTypeInStory = selectedImageType;
      }
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save input.');
    }
  };

  const handleInputChange = (setter, text, minValue, maxValue, fieldName) => {
    // Check if the input is empty or a valid number within the specified range
    if ((text === "") || (!isNaN(Number(text)) && Number(text) >= minValue && Number(text) <= maxValue)) {
      // If the input is empty or a valid number, update the state and clear any error
      setter(text);

      setIsError(false);

      // If the input is empty, exit the function to prevent further processing
      if (text === "") return;
    } else {
      // If the input is not empty and not a valid number, set an error state and display an alert
      setter(text);
      setIsError(true);

      setMinValue(minValue);
      setMaxValue(maxValue);
      setFieldName(fieldName);

      // Show alert for invalid input
      Alert.alert(
        `Invalid Input for ${fieldName}`,
        `Input must be a number between ${minValue} and ${maxValue}.`,
        [
          {
            text: 'OK', onPress: () => {
              console.log('OK Pressed');
              setter(""); // Reset the input field value to an empty string
            }
          }
        ],
        { cancelable: false }
      );


      return;
    }
  };



  const handleParagraphsChange = (text) => {
    handleInputChange(setParagraphs, text, 1, 6, "Paragraphs");
    storyData.paragraphsInText = text;
  };
  const handleSentencesChange = (text) => {
    handleInputChange(setSentences, text, 1, 5, "Sentences");
    storyData.sentencesInParagraph = text;
  };
  const handleWordsChange = (text) => {
    handleInputChange(setWords, text, 1, 25, "Words");
    storyData.wordsInSentence = text;
  };

  const handleChangeAge = (text) => {
    handleInputChange(setAge, text, 1, 12, "Age");
    storyData.childAge = text;
  };


  const handleStoryPromptChange = (text) => {
    //const isValidInput = /[a-zA-Z][0-9a-zA-Z\s.,!?'"-]*/.test(text); // Updated regex pattern to disallow numbers
    const isValidInput = /^[a-zA-Z\s.,!?'"-]*$/.test(text);
    if (isValidInput || text === "") { // Check if text is empty
      setInputText(text);
      setIsError(false);
    } else {
      setInputText(text);
      setIsError(true);

      Alert.alert(
        "Invalid input for Story Prompt",
        "Only English words and common punctuation marks are allowed in the story prompt.",
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );

      return;
    }
  };


  //========================
  const generateStory = async () => {

    // Set loading state to true
    setIsLoading(true);

    // Set timeout for 1 minute
    const timeoutId = setTimeout(() => {
      // Show alert notice
      Alert.alert(
        'Image number exceeds API limit',
        'Please input a smaller value for paragraphs.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );

      // Set loading state to false
      setIsLoading(false);
    }, 60000); // 1 minute timeout


    try {

      console.log(paragraphs, sentences, age, genre, words);

      const newInputText = Machiery.createStoryPrompt(inputText, paragraphs, sentences, age, genre, words)
      console.log("newInputText: ", newInputText)
      // Generate story
      const storyResponse = await OpenAIServices.textCompletion(newInputText, 400, 0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const responseData = await storyResponse.json(); // Remove leading and trailing whitespaces 
      // const responseData = storyResponse;
      const story = responseData.text.trim();
      //console.log(story);


      // Generate Title
      const titlePrompt = Machiery.createTitlePrompt(story);
      const responseTitle = await OpenAIServices.textCompletion(titlePrompt, 300, 0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const dataTitle = await responseTitle.json();
      const storyTitle = dataTitle.text.replace(/^"|"$/g, '');
      //console.log(storyTitle);
      //const storyTitle = 'dear cat';


      // Generate Questions
      const questionPrompt = Machiery.createQuestions(story);
      const responseQuestion = await OpenAIServices.textCompletion(questionPrompt, 400, 0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const dataQuestion = await responseQuestion.json();
      const questions = dataQuestion.text;
      //console.log(questions);
      //const questions = 'how to do it';



      // Create story summary
      const outline = Machiery.createStoryOutline(story);
      const responseOutline = await OpenAIServices.textCompletion(outline, 400, 0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const dataOutline = await responseOutline.json();
      const outlines = dataOutline.text;
      console.log("outlines: ", outlines);


      //================================


      // Split text into paragraphs based on the newline character (\n)
      paragraphArray = story.split('\n').filter(paragraph => paragraph.trim() !== ''); // Remove empty paragraphs

      // Add "\n\n" to the end of each paragraph to make them independent
      paragraphArray = paragraphArray.map(paragraph => paragraph + "\n\n");

      console.log("original paragraphArray: ", paragraphArray);

      // Generate images <= 5
      numImg = paragraphArray.length;
      if (numImg > 5) {
        numImg = 5;
      }

      const imageURLs = new Array(numImg).fill(null);

      const imgPrompt = Machiery.createImagePrompt(outlines, imageType);

      const imageResponse = await OpenAIServices.imageGeneration(imgPrompt, numImg);
      const imageData = await imageResponse.json();
      for (let i = 0; i < numImg; i++) {
        console.log("response url: ", imageData.imgURL[i].url);
        imageURLs[i] = imageData.imgURL[i].url;
      }


      // rebuild paragrah
      const numPra = paragraphArray.length;
      const groupNUmber = 5;

      if (numPra > groupNUmber) {
        const goupSize = numPra / groupNUmber;
        const dividedParagraphs = [];

        for (i = 0; i < groupNUmber; i++) {
          const start = i * goupSize;
          let end = (i + 1) * goupSize;
          if (i == 4) {
            end = numPra; // Adjust 'end' if it exceeds the length of the array
          }
          const group = paragraphArray.slice(start, end);
          dividedParagraphs.push(group);
        }

        paragraphArray = dividedParagraphs;
      }

      console.log("group paragraphArray: ", paragraphArray);



      //=====================================================

      // Combine paragraphs and image URLs into an array of objects
      const storyData = paragraphArray.map((paragraph, index) => ({
        paragraph: paragraphArray[index],
        imageURL: imageURLs[index],
      }));

      // Set story data
      setGeneratedTitle(storyTitle);
      setIsError(false); // Reset error state if generation succeeds

      // Clear the timeout if the API request completes before the timeout
      clearTimeout(timeoutId);

      // Set loading state to false
      setIsLoading(false);

      // Navigate to the view story screen
      navigation.navigate('ViewStory', {
        theStoryTitle: storyTitle,
        theStoryData: storyData,
        theCoverURL: imageURLs[0],
        sGenre: genre,
        uAge: age,
        questionsResponse: questions
      });
    } catch (error) {
      console.error("1 ERROR:", error.message);
      setIsError(true);
      setIsLoading(false); // Set loading state to false
    }
  };



  //=====================


  return (
    <ImageBackground style={styles.backgroundImage}>
      {/*<View style={styles.container}>*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView contentContainerStyle={styles.container}>
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
                  title="Moral"
                  onPress={() => handleGenreSelect('moral')}
                  disabled={genre === 'moral'}
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
                  style={[styles.inputNumber, { marginLeft: 50 }]}
                  onChangeText={handleChangeAge}
                  keyboardType="numeric"
                  value={age}
                />

              </View>
              <View style={{ height: 20 }} />
              <View style={styles.storyParameterSelector}>
                <Text style={styles.inputLabel}>Total Paragraphs:</Text>

                <TextInput
                  style={[styles.inputNumber, { marginLeft: 80 }]}
                  onChangeText={handleParagraphsChange}
                  keyboardType="numeric"
                  value={paragraphs}
                />

              </View>
              <View style={styles.storyParameterSelector}>
                <Text style={styles.inputLabel}>Sentences per Paragraph:</Text>

                <TextInput
                  style={[styles.inputNumber, { marginLeft: 5 }]}
                  onChangeText={handleSentencesChange}
                  keyboardType="numeric"
                  value={sentences}
                />

              </View>
              <View style={styles.storyParameterSelector}>
                <Text style={styles.inputLabel}>Words per Sentence:</Text>

                <TextInput
                  style={[styles.inputNumber, { marginLeft: 50 }]}
                  onChangeText={handleWordsChange}
                  keyboardType="numeric"
                  value={words}
                />

              </View>
              <View style={{ height: 20 }} />
              <Text style={styles.inputLabel}>Enter your story prompt:</Text>

              <TextInput
                value={inputText}
                onChangeText={handleStoryPromptChange}
                multiline
                style={styles.inputText}
                placeholder="Type here..."
              />

              <View style={{ height: 20 }} />

              { isLoading ? ( <ActivityIndicator size="large" color="#bf150f" /> )
              : (
              <View>
                <Button
                title="Generate Illustrated Story"
                onPress={generateStory}
                color='#bf150f'

                disabled={isError || inputText.trim() === '' || age.trim() === '' || paragraphs.trim() === '' || sentences.trim() === '' || words.trim() === ''}
              />
              </View>
              )
            }
              


              {
                <Text style={styles.errorText}>
                  {inputText.trim() === '' && <Text>Story prompt cannot be empty.{"\n"}</Text>}
                  {age.trim() === '' && <Text>Age cannot be empty.{"\n"}</Text>}
                  {paragraphs.trim() === '' && <Text>Total Paragraphs cannot be empty.{"\n"} </Text>}
                  {sentences.trim() === '' && <Text>Sentences per Paragraph cannot be empty.{"\n"}</Text>}
                  {words.trim() === '' && <Text>Words per Sentence cannot be empty.{"\n"}</Text>}
                </Text>
              }



            </View>
            {/*</View>*/}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};