import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import styles from "./CommonStyleSheet"
import React, { useState, useEffect } from 'react';

export default function Questionnaire({navigation,route}) {
	const { storyTitle, questionsArray, answersArray } = route.params;
	const [userAnswers, setUserAnswers] = useState(Array(answersArray.length).fill(''));
	const [score, setScore] = useState(0);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (text, index) => {
	    userAnswers[index] = text;
	    setUserAnswers([...userAnswers]);
  	};

	const handleSubmit = (event) => {
		let tempScore = 0;
	    for (let i = 0; i < answersArray.length; i++){
	    	if (answersArray[i].toLowerCase() === userAnswers[i].toLowerCase()){
	    		tempScore++;
	    	} 
	    }
	    setScore(tempScore);
	    setIsSubmitted(true);
	 };

	return (
		<View style={styles.container}>
	      <Text style={styles.title}>Questions for {storyTitle}</Text>
	      <View style={styles.container}>
	      {questionsArray.map((question, index) => (
	        <View key={index} style={stylesnew.questionItem}>
	          <Text style={stylesnew.questionText}>{question}</Text>
	          <TextInput
	            style={stylesnew.textInput}
	            onChangeText={(text) => handleChange(text, index)}
	          />
	        </View>
	      ))}
	      <Button title="Submit Answers" onPress={handleSubmit} />
	      <View style={{ height: 20 }} />
			{isSubmitted && (
	        <Text style={stylesnew.successText}>Your score is {score}.</Text>
	      )}
	      </View>
	    </View>
	    
	);
}

const stylesnew = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  questionItem: {
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
  },
});

