import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import styles from "./CommonStyleSheet"
//login validation to add 

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // const handleLoginButtonClick () => {
    
  // }

	return (
		<View style={styles.container}>
	      <Text>Welcome to LoveStorying!</Text>
        <View style={{ height: 30 }} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={setUserName}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          keyboardType="email-address"
          // value={userNumber}
        />
        <View style={{ height: 20 }} />
	      <Button
	        title="Login"
	        onPress={() => navigation.navigate('Dashboard')}
	      />
	    </View>
	);
}
