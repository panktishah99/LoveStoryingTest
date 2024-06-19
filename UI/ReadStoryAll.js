import React from 'react';
import { View, Text, Button, ScrollView, Image, Pressable, ImageBackground } from 'react-native';
import styles from './CommonStyleSheet';
import MyImage from '../assets/bgimages/notebook.jpg';

export default function ViewStory({ navigation, route }) {
    const { item } = route.params;

    const goToQuestionnaire = async () => {
        navigation.navigate('Questionnaire', { storyTitleQues: item.title, questions: item.question});
    };


  return (
          <View style={[ styles.container, {padding:0, paddingTop:60}]}>
            <ImageBackground source={MyImage} style={styles.backgroundImage}>
              <ScrollView contentContainerStyle={styles.content} style={{backgroundColor: 'transparent'}}>
                  <Text style={[styles.title,{padding:20}]}>{item.title}</Text>
                  {item.storyData ? (
                      item.storyData.map((storyItem, index) => (
                          <View key={index} style={styles.storyContainer}>
                              <Text style={styles.content}>{storyItem.paragraph}</Text>
                              <Image source={{ uri: storyItem.imageURL }} style={styles.image} />
                          </View>
                      ))
                  ) : (
                      <Text>Sorry, no story data available</Text>
                  )}
              </ScrollView>
              <View style={{padding:20}}>
                <Pressable style={[styles.buttonStyle, {backgroundColor:'#256943',width:250,alignSelf:'center'}]} onPress={goToQuestionnaire}>
                    <Text style={styles.buttonText}>Ready to Answer Questions?</Text>
                </Pressable>
              </View>
            </ImageBackground>
          </View>
      );
  }

