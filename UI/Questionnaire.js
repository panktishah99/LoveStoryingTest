import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import { RadioButton } from 'react-native-paper';
import styles from "./CommonStyleSheet";
import LottieView from 'lottie-react-native';
import MyImage from '../assets/bgimages/landscape1.jpg';

export default function Questionnaire({ navigation, route }) {
  const { storyTitleQues, questions } = route.params;
  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const [score, setScore] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDragon, setShowDragon] = useState(false);

  // Function to shuffle the answers array
  const shuffleAnswers = (answers) => {
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }
    return answers;
  };

  useEffect(() => {
    const getQuestionAndAnswer = async () => {
      // Initialize an array to store question and answer pairs
      const questionAndAnswerArray = [];

      // Extract the text from the API response
      const text = questions;

      // Split the text into lines
      const lines = text.split('\n').filter(line => line.trim() !== '');

      // Iterate over the lines in groups of five
      for (let i = 0; i < lines.length; i += 5) {
        // Extract the question (first line)
        const question = lines[i];
        // Extract the four answers (next four lines)
        const oldAnswers = lines.slice(i + 1, i + 5).map(answer => answer.slice(3).trim());
        const rightAnswer = oldAnswers[0];
        const answers = shuffleAnswers(oldAnswers);

        // Add the question and its answers to the questionAndAnswer array
        questionAndAnswerArray.push({ question, answers, rightAnswer });
      }

      // Set the questionAndAnswer state
      setQuestionAndAnswer(questionAndAnswerArray);

      // Initialize the userSelections state with an array filled with null values
      setUserSelections(Array(questionAndAnswerArray.length).fill(null));
    };

    getQuestionAndAnswer();
  }, [questions]);

  const handleChange = (index, answer) => {
    const newSelections = [...userSelections];
    newSelections[index] = answer;
    setUserSelections(newSelections);
  };

  const handleSubmit = () => {
    let tempScore = 0;
    const wrongQuestions = [];

    for (let i = 0; i < questionAndAnswer.length; i++) {
      if (userSelections[i] === questionAndAnswer[i].rightAnswer) {
        tempScore++;
      } else {
        wrongQuestions.push({ question: questionAndAnswer[i].question, correctAnswer: questionAndAnswer[i].rightAnswer });
      }
    }

    // Set score state
    setScore(tempScore);
    // Set wrong answers state
    setWrongAnswers(wrongQuestions);
    /*
        if (tempScore > 0) {
    
        }*/
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Confetti lasts for 3 seconds
    setShowDragon(true);
    //setTimeout(() => setShowDragon(false));
  };

  return (
    <View style={[ styles.container, {padding:0, paddingTop:60}]}>
      <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <ScrollView contentContainerStyle={[styles.content,{padding:0}]}>
        <Text style={styles.qtitle}>Questions for: '{storyTitleQues}'</Text>
          
        {questionAndAnswer.map((qa, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{qa.question}</Text>
            <View style={styles.answerContainer}>
              {qa.answers.map((answer, i) => (
                <View key={i} style={styles.radioButtonContainer}>
                  <RadioButton
                    uncheckedColor='#000000'
                    color='#000000'
                    value={answer}
                    status={userSelections[index] === answer ? 'checked' : 'unchecked'}
                    onPress={() => handleChange(index, answer)}
                  />
                  <Text>{answer}</Text>
                </View>
              ))}
            </View>
            {score !== null && wrongAnswers.find(wrongAnswer => wrongAnswer.question === qa.question) && (
              <Text style={[styles.correctAnswer, { color: 'red', fontWeight: 'bold' }]}>Correct Answer: {qa.rightAnswer}</Text>
            )}
          </View>
        ))}
      </ScrollView>
      
      <View style={{paddingBottom:20}}>
        <Pressable style={[styles.buttonStyle, { width: 170, marginTop: 10, alignSelf: 'center' }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Answers</Text>
          {showConfetti && (
            <LottieView
              source={require('../assets/confetti2.json')}
              autoPlay
              loop={false}
              onAnimationFinish={() => setShowConfetti(false)}
              style={styles.lottie}
            />
          )}
        </Pressable>
        {score !== null && (
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>Score: {score}/{questionAndAnswer.length}</Text>
          </View>

        )}
      </View>
      </ImageBackground>
    </View>
  );

}
