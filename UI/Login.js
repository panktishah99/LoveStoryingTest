import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import styles from "./CommonStyleSheet"
import MyImage from '../assets/bgimages/login.jpg';
//login validation to add 

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // const handleLoginButtonClick () => {
    
  // }

	return (
    <ImageBackground source={MyImage} style={styles.backgroundImage}>
		<View style={styles.container}>
	      <Text style={styles.title}>Welcome to LoveStorying!</Text>
        <View style={{ height: 30 }} />
        <TextInput
          style={styles.loginInput}
          placeholder="Username"
          onChangeText={setUserName}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Password"
          onChangeText={setPassword}
          keyboardType="email-address"
          // value={userNumber}
        />
        <View style={{ height: 20 }} />
	      <Button
	        title="Login"
          style={{ backgroundColor: '#1f1b13' }}
	        onPress={() => navigation.navigate('Dashboard')}
	      />
	    </View>
    </ImageBackground>
	);
}
