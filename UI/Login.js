import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, KeyboardAvoidingView, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
// import { stringMd5 } from 'react-native-quick-md5';
import {AsyncStorage, ReactNativeAsyncStorage} from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"
import MyImage from '../assets/bgimages/login.png';
import { firebaseAuth } from '../components/FireBaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
/*const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});*/

//login validation to add 

export default function Login({ navigation }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const auth = firebaseAuth;

  const [isError, setisError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [autoLog, setAutoLog] = useState(false);

  // const curUser = 'Admin';
  // const curPassword = '12345'
  // const credentialsKey = "userCredentials"; // User credentials key in AsyncStorage
  // const storageExpirationTime = 15; // Expiration time in minutes 

  // useEffect(() => {
  //   //console.log(userName);
  //   //console.log(password);
  //   getCredentials();
  // }, []);

  // // This redirects the user to dashboard when credentials are stored
  // useEffect(() => {
  //   if (autoLog && userName === curUser && password === curPassword) {
  //     navigation.navigate('Dashboard');
  //   }
  // }, [autoLog && userName && password]);

  // // This will check for non expired credentials
  // const getCredentials = async () => {
  //   try {
  //     let savedData = await AsyncStorage.getItem(credentialsKey);
  //     if (savedData !== null) {
  //       // check if we got a valid data before calling JSON.parse
  //       let curData = JSON.parse(savedData);
  //       const currentTimestamp = Math.floor(Date.now() / 1000); // get current UNIX timestamp. Divide by 1000 to get seconds and round it down
  //       // Remove the saved data if it expires.
  //       // Check if expiryTime exists with the optional chaining operator `?`
  //       // then, we check if the current ‘now’ time is still behind expiryTime
  //       // if not, it means the storage data has expired and needs to be removed
  //       if (currentTimestamp >= curData?.expiryTime) {
  //         AsyncStorage.removeItem(credentialsKey);
  //         setPassword('');
  //         setAutoLog(false);
  //         //setCurExpTime(-1);
  //         setisError(true);
  //       }
  //       else {
  //         setUserName(curData.userId);
  //         setPassword(curData.pass);
  //         setAutoLog(true);
  //         //setCurExpTime(curData.expiryTime);
  //         setisError(false);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving data:', error);
  //     Alert.alert('Error', 'Failed to retrieve input');
  //   }
  // }

  // const handleLogin = async () => {
  //   setAutoLog (false);
  //   try {
  //     //
  //     if (userName === curUser && password === curPassword) {
  //       //if (userName === 'Admin' && password === '12345') {
  //       //setPassword('');
  //       setisError(false);

  //       // Save credentials and set an expiration date
  //       const now = new Date();
  //       now.setMinutes(now.getMinutes() + storageExpirationTime); // add the expiration time to the current Date time
  //       const expiryTimeInTimestamp = Math.floor(now.getTime() / 1000); // convert the expiry time in UNIX timestamp

  //       const data = {
  //         userId: userName, // example of data you need to store
  //         pass: password,
  //         expiryTime: expiryTimeInTimestamp
  //       };

  //       // Store the data with expiration time in AsyncStorage
  //       await AsyncStorage.setItem(credentialsKey, JSON.stringify(data));

  //       navigation.navigate('Dashboard');
  //     } else {
  //       // Display error message or notification for invalid credentials
  //       setisError(true);
  //       console.log('Invalid credentials');
  //       AsyncStorage.removeItem(credentialsKey);
  //     }
  //   } catch (err) {
  //     console.log("error")
  //   }
  // };

  const handleLogin = async () => {
    setLoading(true);
    setAutoLog (false);
    Keyboard.dismiss();
    try {
        const response = await signInWithEmailAndPassword(auth,userName,password);
        console.log(response);
        setisError(false);
        // setPassword('');
        // navigation.navigate('Dashboard');
    } catch (error) {
      setisError(true);
      console.log(error);
      setErrorMsg(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    setAutoLog (false);
    Keyboard.dismiss();
    try {
        const response = await createUserWithEmailAndPassword(auth,userName,password);
        console.log(response);
        setisError(false);
        // navigation.navigate('Dashboard');
    } catch (error) {
      setisError(true);
      console.log(error);
      setErrorMsg(getFirebaseErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  function getFirebaseErrorMessage(errorCode){
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'; 
      case 'auth/invalid-credential':
        return 'The email or password you entered is incorrect.'; 
      case 'auth/email-already-in-use':
        return 'The email is already in use by an existing user.';
      case 'auth/missing-password' :
        return 'Please enter the password.' ;
      default:
        return 'An error occurred. Please try again.'; // Generic message for unknown errors
    }
  }


  return (
        <ImageBackground source={MyImage} style={styles.backgroundImage}>
          <KeyboardAvoidingView style={styles.container} behaviour='padding'>
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
            { loading ? ( <ActivityIndicator size="large" color="#0000ff" /> )
              : (
              <View>
                <Button
                  title="Login"
                  color='#0b756e'
                  onPress={handleLogin}
                />
                <View style={{ height: 20 }} />
                <Button
                  title="Create Account"
                  color='#0b756e'
                  onPress={signUp}
                />
              </View>
              )
            }
            <View style={{ height: 20 }} />
            {isError && (
              <Text style={{ fontSize: 18 }}>{errorMsg}</Text>
            )}
          </KeyboardAvoidingView>
        </ImageBackground>
  );
}
