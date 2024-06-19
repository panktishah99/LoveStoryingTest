import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import * as OpenAIServices from '../components/OpenAIServices';
import { firebaseAuth } from '../components/FireBaseConfig'; // Import firebaseAuth for logging out
import styles from './CommonStyleSheet'; // Import your common styles
import MyImage from '../assets/bgimages/Picture1.png'; // Import your background image

export default function Central({ navigation }) {
  const [stories, setStories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  //const navigation = useNavigation();
  const isFocused = useIsFocused(); // Check if the component is in focus

  useEffect(() => {
    const fetchAndStoreStories = async () => {
      try {
        const response = await OpenAIServices.gettingallstory("123");
        if (!response.ok) {
          throw new Error('Failed to fetch stories');
        }
        const responseData = await response.json();
        setStories(responseData);
      } catch (error) {
        console.error('Error fetching stories:', error);
        setErrorMessage('Error fetching stories');
      }
    };

    if (isFocused) {
      fetchAndStoreStories();
      const interval = setInterval(fetchAndStoreStories, 10000);
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  const handleTitlePress = (item) => {
    navigation.navigate('ReadStoryAll', { item });
    console.log(item);
  };

  const handleLogout = () => {
    firebaseAuth.signOut().then(() => {
      navigation.navigate('Login'); // Navigate to the login screen after logout
    }).catch(error => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <View style={localStyles.container}>
        <View style={{ flexDirection: 'row', marginBottom:10}}>
          <Pressable style={[styles.buttonStyle, { width: 150, marginHorizontal:10}]} onPress={() => navigation.navigate('My Library')}>
              <Text style={styles.buttonText}>My Library</Text>
          </Pressable>
          <Pressable style={[styles.buttonStyle, {backgroundColor:'#a8481e', width: 150, marginHorizontal:10}]} onPress={() => navigation.navigate('Create your own story')}>
              <Text style={styles.buttonText}>Create Story</Text>
          </Pressable>
        </View>

        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : (
		
<FlatList
  data={stories} // Display only the first 10 stories
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => handleTitlePress(item)}>
      <Image
        source={{ uri: item.coverURL }}
        style={localStyles.coverImage}
      />
      <Text style={localStyles.imageName}>{item.title}</Text>
    </TouchableOpacity>
  )}
/>
		  
        )}
        <View style={{padding:10}}>
          <Pressable style={[styles.buttonStyle, {backgroundColor:'#752a19', width:100, alignSelf:'center'}]} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adding a white background with opacity
    margin: 20, // Adding margin to avoid the container being too large
    borderRadius: 10, // Adding border radius for a better appearance
  },
  coverImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 10, // Adding border radius for images
  },
  imageName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
