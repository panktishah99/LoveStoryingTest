import { View, Text, TextInput, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Platform, Pressable } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
// import { stringMd5 } from 'react-native-quick-md5';
import styles from "./CommonStyleSheet"
import MyImage from '../assets/bgimages/login.png';
import { firebaseAuth } from '../components/FireBaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getApp, getAuth } from "../components/FireBaseConfig";
import getFirebaseErrorMessage from "./AuthenticationErrors";


//login validation to add 

export default function CreateAccount({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;

  const [isError, setisError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [autoLog, setAutoLog] = useState(false);

 
  // Handles user registration
  const signUp = async () => {
    setLoading(true);
    //setAutoLog(false);
    try {
      const response = await createUserWithEmailAndPassword(auth, userName, password);
      //console.log(response);
      setisError(false);
    } catch (error) {
      setisError(true);
      console.log(error);
      setErrorMsg(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };


  return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/*<KeyboardAvoidingView style={styles.container} behaviour='padding'>*/}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <Text style={[styles.title, { color: '#0b756e' }]}>Welcome to LoveStorying!</Text>
          <View style={{ height: 30 }} />
          <TextInput
            style={styles.loginInput}
            placeholder="Email"
            onChangeText={setUserName}
            keyboardType="default"
            value={userName}
          />
          <TextInput
            style={styles.loginInput}
            placeholder="Password"
            onChangeText={setPassword}
            keyboardType="default"
            value={password}
            secureTextEntry
          />
          <View style={{ height: 20 }} />
          {loading ? (<ActivityIndicator size="large" color="#0b756e" />)
            : (
              <View>
                <View style={{ height: 20 }} />
                <Pressable style={styles.buttonStyle} onPress={signUp}>
                  <Text style={styles.buttonText}>Sign me up!</Text>
                </Pressable>
              </View>
            )
          }
          <View style={{ height: 20 }} />
          {isError && (
            <Text style={{ fontSize: 18 }}>{errorMsg}</Text>
          )}
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
