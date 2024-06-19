import { View, Text, TextInput, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableWithoutFeedback, Platform, Pressable, Button } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import Toast from 'react-native-root-toast';
// import { stringMd5 } from 'react-native-quick-md5';
import styles from "./CommonStyleSheet"
import MyImage from '../assets/bgimages/login.png';
import { firebaseAuth } from '../components/FireBaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getApp, getAuth } from "../components/FireBaseConfig";
import getFirebaseErrorMessage from "./AuthenticationErrors";



//login validation to add 

export default function Login({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;

  const [isError, setisError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [autoLog, setAutoLog] = useState(false);


  // Handles user Log in using Firebase Authentication
  const handleLogin = async () => {
	setLoading(false);
	//navigation.navigate('Central')  
	  
    setLoading(true);
    //setAutoLog(false);
	
	

    try {
      const response = await signInWithEmailAndPassword(auth, userName, password);
      //console.log("TOKEN: ", response.user.uid);
      setisError(false);
    } catch (error) {
      setisError(true);
      console.log(error);
      setErrorMsg(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
	
	
  };


  // Sends password rest email to user
  const resetPassword = async () => {
    // setLoading(true);
    //setAutoLog(false);

    try {
      const response = await sendPasswordResetEmail(auth, userName);
      //console.log("TOKEN: ", response.user.uid);
      setisError(false);
      let toast = Toast.show('Follow the link in your email to reset your password.', {
        duration: Toast.durations.LONG,
      });
      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 5000);
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
                <Pressable style={[styles.buttonStyle, {width:100,alignSelf:'center'}]} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                
              </View>
            )
          }
          <View style={{ height: 20 }} />
          {isError && (<Text style={{ fontSize: 18 }}>{errorMsg}</Text>)}
          <View style={{ height: 30 }} />
          <Pressable style={[styles.buttonStyle, {alignSelf:'center',width:170,backgroundColor:'#7e8591'}]} onPress={resetPassword}>
            <Text style={styles.buttonText}>Forgot Password?</Text>
          </Pressable>
          <View style={{ height: 30 }} />
          <Text style={{fontSize:16, marginTop:10,marginBottom:10}}>Don't have an account with us?</Text>
          <Pressable style={[styles.buttonStyle, {alignSelf:'center',width:190,backgroundColor:'#1a5c96'}]} onPress={() => navigation.navigate('CreateAccount')}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
          
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
