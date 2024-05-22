import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function Questionnaire({ navigation, route }) {
  const {storyTitleQues, questions } = route.params;
  const [questionAndAnswer, setQuestionAndAnswer] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  const [score, setScore] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState([]);

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
  };

return (
  <ScrollView contentContainerStyle={styles.container}>
    {score !== null && (
      <View style={styles.scoreContainer}>
        <Text style={styles.score}>Score: {score}/{questionAndAnswer.length}</Text>
      </View>
    )}
    <Text style={styles.title}>Questions for: '{storyTitleQues}'</Text>
    {questionAndAnswer.map((qa, index) => (
      <View key={index} style={styles.questionContainer}>
        <Text style={styles.question}>{qa.question}</Text>
        <View style={styles.answerContainer}>
          {qa.answers.map((answer, i) => (
            <View key={i} style={styles.radioButtonContainer}>
              <RadioButton
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
    <Button title="Submit Answers" onPress={handleSubmit} />
  </ScrollView>
);


}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  scoreContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: 'column',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctAnswer: {
    fontSize: 14,
    marginBottom: 5,
  },
  wrongAnswersContainer: {
    marginTop: 20,
  },
  wrongAnswersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});