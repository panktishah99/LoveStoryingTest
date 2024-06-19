import React, { useState, useEffect } from 'react';
import * as OpenAIServices from '../components/OpenAIServices';
import * as Machiery from '../components/machinery';
import styles from './CommonStyleSheet';
import MyImage from '../assets/bgimages/landscape3.jpg';
import { View, Text, TextInput, Button, ImageBackground, Alert, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, SafeAreaView, ActivityIndicator, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
//import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
//import ModalPicker from 'react-native-modal-picker';
//import { StatusBar } from 'expo-status-bar';


export default function CreateStory({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [genre, setGenre] = useState('fiction');
  const [imageType, setImageType] = useState('illustration');

  const [age, setAge] = useState('6');
  const [paragraphs, setParagraphs] = useState('2');
  const [sentences, setSentences] = useState('2');
  const [words, setWords] = useState('10');
  const [isError, setIsError] = useState(false);

  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(12);
  const [fieldName, setFieldName] = useState('');

  const [firstLaunch, setLaunch] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [apiErrorText, setApiErrorText] = useState('');

  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(false);

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

  // List of genres
  const data = [
    { label: 'Fiction', value: 'fiction' },
    { label: 'Adventure', value: 'adventure' },
    { label: 'Moral Story', value: 'moral' },
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'Poem', value: 'poem' },
  ];

  // List of image types
  const imageTypeData = [
    { label: 'Illustration', value: 'illustration' },
    { label: 'Historical', value: 'historical image' },
    { label: 'Photorealistic', value: 'picture' },
  ];

  useEffect(() => {
    // Set default input text based on selected genre
    const defaultText = {
      fiction: "a cat and a mouse were best friends...",
      poem: "a poem about my favorite city Seattle",
      adventure: "a boy named John climbs the top of the hill only to find...",
      moral: "Pinocchio's nose grew longer and longer as he...",
      fantasy: "Voldemort was the most powerful wizard of all time, but his one weakness was..."
    };
    setInputText(defaultText[genre]);
  }, [genre]);

  // TODO: Check if when app is launched for first time loadSaveData doesn't make any errors. I solved the problem commenting and uncommenting loadSavedData 
  // Load saved data on launch
  useEffect(() => {
    // console.log("2")
    loadSavedData();
  }, []);

  // Update on storyData and inputText change
  useEffect(() => {
    // console.log("3")
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
    handleInputChange(setParagraphs, text, 2, 6, "Paragraphs");
    storyData.paragraphsInText = text;
  };
  const handleSentencesChange = (text) => {
    handleInputChange(setSentences, text, 2, 5, "Sentences");
    storyData.sentencesInParagraph = text;
  };
  const handleWordsChange = (text) => {
    handleInputChange(setWords, text, 5, 25, "Words");
    storyData.wordsInSentence = text;
  };

  const handleChangeAge = (text) => {
    handleInputChange(setAge, text, 1, 12, "Age");
    storyData.childAge = text;
  };


  const handleStoryPromptChange = (text) => {
    //const isValidInput = /[a-zA-Z][0-9a-zA-Z\s.,!?'"-]*/.test(text); // Updated regex pattern to disallow numbers
    //const isValidInput = /^[a-zA-Z\s.,!?'"-]*$/.test(text);
    const isValidInput = /^[a-zA-Z\s.,!?'"’-]*$/.test(text);
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


  // Function to convert blob to Base64
  const convertBlobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
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
      // console.log("TESTING 1", storyResponse);
      const responseData = await storyResponse.json(); // Remove leading and trailing whitespaces 
      // const responseData = storyResponse;
      // console.log("TESTING 2", responseData);
      const story = responseData.text.trim();
      //console.log("TESTING 3", story);


      // Generate Title
      const titlePrompt = Machiery.createTitlePrompt(story);
      const responseTitle = await OpenAIServices.textCompletion(titlePrompt, 300, 0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const dataTitle = await responseTitle.json();
      const storyTitle = dataTitle.text.replace(/^"|"$/g, '');
      console.log(storyTitle);
      //const storyTitle = 'dear cat';


      // Generate Questions
      const questionPrompt = Machiery.createQuestions(story);
      const responseQuestion = await OpenAIServices.textCompletion(questionPrompt, 400, 0.5, 0.5, 0, 0, 'gpt-3.5-turbo-instruct');
      const dataQuestion = await responseQuestion.json();
      const questions = dataQuestion.text;
      console.log(questions);
      //const questions = 'how to do it';
      // console.log("TESTING 5 - Questions generated successfully");



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

      // console.log("original paragraphArray: ", paragraphArray);

      // Generate images <= 5
      numImg = paragraphArray.length;
      if (numImg > 5) {
        numImg = 5;
      }

      const imageURLs = new Array(numImg).fill(null);

      const imgPrompt = Machiery.createImagePrompt(outlines, imageType);

      const imageResponse = await OpenAIServices.imageGeneration(imgPrompt, numImg);
      const imageData = await imageResponse.json();
      // console.log(imageData);
      // Old version with URLs
      /*for (let i = 0; i < numImg; i++) {
        console.log("response url: ", imageData.imgURL[i].url);
        imageURLs[i] = imageData.imgURL[i].url;
      }*/
      // New version that stores image as base64
      console.log("Response generated successfully");
      for (let i = 0; i < numImg; i++) {
        console.log("response url: ", imageData.imgURL[i].url);
        //const response = await fetch(imageData.imgURL[i].url);
        const response = await fetch(imageData.imgURL[i].url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        //console.log("FETCH", response);
        const imageBlob = await response.blob();
        const base64Image = await convertBlobToBase64(imageBlob);
        imageURLs[i] = base64Image;
        console.log("base64 image ", i);
      }

      console.log("Images successfully converted to base64");

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

      //console.log("group paragraphArray: ", paragraphArray);



      //=====================================================

      // Combine paragraphs and image URLs into an array of objects
      const storyData = paragraphArray.map((paragraph, index) => ({
        paragraph: paragraphArray[index],
        imageURL: imageURLs[index],
      }));
      console.log("Generated storyData");
      // Set story data
      setGeneratedTitle(storyTitle);
      setIsError(false); // Reset error state if generation succeeds

      // Clear the timeout if the API request completes before the timeout
      clearTimeout(timeoutId);

      // Set loading state to false
      setIsLoading(false);

      console.log("Before navigate ViewStory");
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
      console.log(error);
      setApiErrorText(error.message);
      setIsError(true);
      setIsLoading(false); // Set loading state to false
    }
  };



  //=====================


  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      {/*<View style={styles.container}>*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container} >
              <View style={styles.topContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.inputLabel}>Select Genre:   </Text>
                  {Platform.OS === 'ios' ? (
                    <Dropdown
                      style={styles.dropdown}
                      data={data}
                      labelField="label"
                      valueField="value"
                      placeholder="Select genre"
                      value={genre}
                      onChange={(item) => handleGenreSelect(item.value)}
                    />
                  ) : (
                    <Picker
                      style={styles.pickerStyle}
                      selectedValue={genre}
                      onValueChange={(itemValue) => handleGenreSelect(itemValue)}
                    >
                      {data.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                    </Picker>
                  )}
                </View>
                <View style={{ height: 10 }} />
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.inputLabel}>Select Image Type:   </Text>
                  {Platform.OS === 'ios' ? (
                    <Dropdown
                      style={styles.dropdown}
                      data={imageTypeData}
                      labelField="label"
                      valueField="value"
                      placeholder="Select image type"
                      value={imageType}
                      onChange={(item) => handleImageSelect(item.value)}
                    />
                  ) : (
                    <Picker
                      style={styles.pickerStyle}
                      selectedValue={imageType}
                      onValueChange={(itemValue) => handleImageSelect(itemValue)}
                    >
                      {imageTypeData.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                    </Picker>
                  )}
                </View>
                <View style={{ height: 10 }} />
                <View>
                  <Text style={styles.inputLabel}>Enter the Child's Age: {age}</Text>
                  <Slider
                    style={{ width: 200, height: 20 }}
                    minimumValue={1}
                    maximumValue={12}
                    minimumTrackTintColor="#ffffff"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#bf150f"
                    onValueChange={(value) => handleChangeAge(value)}
                    step={1}
                    value={Number(age)}
                  />
                </View>
                <View style={{ height: 10 }} />
                <View>
                  <Text style={styles.inputLabel}>Total Paragraphs: {paragraphs}  </Text>
                  <Slider
                    style={{ alignSelf:'center',width: 200, height: 10 }}
                    minimumValue={2}
                    maximumValue={6}
                    minimumTrackTintColor="#ffffff"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#fc9803"
                    onValueChange={(value) => handleParagraphsChange(value)}
                    step={1}
                    value={Number(paragraphs)}
                  />
                  {/*<TextInput
                    style={[styles.inputNumber, { marginLeft: 80 }]}
                    onChangeText={handleParagraphsChange}
                    keyboardType="numeric"
                    value={paragraphs}
                      />*/}

                </View>
                <View>
                  <Text style={styles.inputLabel}>Sentences per Paragraph: {sentences}   </Text>
                  <Slider
                    style={{ alignSelf:'center',width: 200, height: 10 }}
                    minimumValue={2}
                    maximumValue={5}
                    minimumTrackTintColor="#ffffff"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#319455"
                    onValueChange={(value) => handleSentencesChange(value)}
                    step={1}
                    value={Number(sentences)}
                  />
                  {/*<TextInput
                    style={[styles.inputNumber, { marginLeft: 5 }]}
                    onChangeText={handleSentencesChange}
                    keyboardType="numeric"
                    value={sentences}
                    />*/}

                </View>
                <View >
                  <Text style={styles.inputLabel}>Words per Sentence: {words}</Text>
                  <Slider
                    style={{ alignSelf:'center',width: 200, height: 10 }}
                    minimumValue={5}
                    maximumValue={25}
                    minimumTrackTintColor="#ffffff"
                    maximumTrackTintColor="#000000"
                    //thumbTintColor="#bf150f"
                    thumbTintColor="#3c5b91"
                    onValueChange={(value) => handleWordsChange(value)}
                    step={1}
                    value={Number(words)}
                  />
                  {/*<TextInput
                    style={[styles.inputNumber, { marginLeft: 50 }]}
                    onChangeText={handleWordsChange}
                    keyboardType="numeric"
                    value={words}
                  />*/}

                </View>
                <View style={{ height: 10 }} />
                <Text style={styles.inputLabel}>Enter your story prompt:</Text>

                <TextInput
                  value={inputText}
                  onChangeText={handleStoryPromptChange}
                  multiline
                  style={styles.inputText}
                  placeholder="Type here..."
                />

                <View style={{ height: 20 }} />

                {isLoading ? (<ActivityIndicator size="large" color="#bf150f" />)
                  : (
                    <Pressable style={[styles.buttonStyle, { backgroundColor: '#bf150f' }]} onPress={generateStory} disabled={inputText.trim() === '' || age === '' || paragraphs === '' || sentences === '' || words === ''}>
                      <Text style={styles.buttonText}>Generate Illustrated Story</Text>
                    </Pressable>
                  )
                }

                {isError ?
                  (<Text style={styles.errorText}>
                    {inputText.trim() === '' && <Text>Story prompt cannot be empty.{"\n"}</Text>}
                    {age === '' && <Text>Age cannot be empty.{"\n"}</Text>}
                    {paragraphs === '' && <Text>Total Paragraphs cannot be empty.{"\n"} </Text>}
                    {sentences === '' && <Text>Sentences per Paragraph cannot be empty.{"\n"}</Text>}
                    {words === '' && <Text>Words per Sentence cannot be empty.{"\n"}</Text>}
                    {apiErrorText}
                  </Text>
                  ) :
                  (<View style={{ height: 10 }} />)
                }

              </View>
              {/*</View>*/}
            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
