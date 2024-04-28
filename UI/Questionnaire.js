import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import styles from "./CommonStyleSheet"
import React, { useState, useEffect } from 'react';
import MyImage from '../assets/bgimages/Picture2.png';

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
		<ImageBackground source={MyImage} style={styles.backgroundImage}>
			<View style={[styles.container,{zIndex:1}]}>
		      <Text style={[styles.title,{ color: '#ffef87'}]}>Questions for: '{storyTitle}'</Text>
		      <View style={{ height: 20 }} />
		      {questionsArray.map((question, index) => (
		        <View key={index} style={styles.question}>
		          <Text style={styles.question}>{question}</Text>
		          <TextInput
		            style={styles.loginInput}
		            onChangeText={(text) => handleChange(text, index)}
		          />
		        </View>
		      ))}
		      <Button title="Submit Answers" onPress={handleSubmit} color='#803e18' />
		      <View style={{ height: 20 }} />
				{isSubmitted && (
		        <Text style={{fontSize:20, color:'#ffef87'}}>You scored {score} out of {answersArray.length}.</Text>
		      )}
		    </View>
	    </ImageBackground>
	    
	);
}


