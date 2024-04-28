import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground,KeyboardAvoidingView } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import styles from "./CommonStyleSheet"
import MyImage from '../assets/bgimages/login.jpg';
//login validation to add 

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setisError] = useState(false);


  const handleLogin = () => {

    if (userName === 'Admin' && password === '12345') {
      setPassword('');
      setisError(false);
      navigation.navigate('Dashboard');
    } else {
      // Display error message or notification for invalid credentials
      setisError(true);
      console.log('Invalid credentials');
    }
  };

	return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
		<View style={styles.container}>
	      <Text style={[styles.title,{color: '#0b756e'}]}>Welcome to LoveStorying!</Text>
        <View style={{ height: 30 }} />
        <TextInput
          style={styles.loginInput}
          placeholder="Username"
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
	      <Button
	        title="Login"
          color='#0b756e'
	        onPress={handleLogin}
	      />
        <View style={{ height: 20 }} />
        {isError && (
          <Text style={{fontSize:18}}>Invalid Credentals. Please try again.</Text>
        )}
	    </View>
    </ImageBackground>
	);
}
