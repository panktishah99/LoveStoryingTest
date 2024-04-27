import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"
//show saved stories

export default function Dashboard({ navigation }) {
	const remove = async () => {
		try {
		  await AsyncStorage.removeItem("TestTitle"); // TODO: match the current list of stories
		} catch(err) {
		  alert(err);
		} /*finally {
		  setName("");
		}*/
	  };

	return (
		<View style={styles.container}>
			{ }
			<Text>Hello World! This is the Dashboard</Text>
			<View style={{ height: 20 }} />
			<Button
				title="Go to Create Story Page"
				onPress={() => navigation.navigate('CreateStory')}
			/>
			<Button
				title="Go to Read Story Page"
				onPress={() => navigation.navigate('ReadStory')}
			/>
			<TouchableOpacity style={styles.buttonStyle1} onPress={() => remove()}>
				<Text style={{ color: "white" }}>Remove my story!</Text>
			</TouchableOpacity>
		</View>
	);
}