import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-web';
//show saved stories

export default function Dashboard({ navigation }) {
	[storyTitles, setListTiles] = useState([]);
	const remove = async () => {
		try {
		  await AsyncStorage.removeItem("Test Title"); // TODO: match the current list of stories
		} catch(err) {
		  alert(err);
		} /*finally {
		  setName("");
		}*/
	  };
	  
	  const refreshDashboard = async () => {
		try {
			let titlesJSONString = await AsyncStorage.getItem("titles");
			// If no titles saved yet, initialize an empty array
			let titlesArray = titlesJSONString ? JSON.parse(titlesJSONString) : [];
			setListTiles(titlesArray);

		} catch(err) {
		  alert(err);
		}
	  };
	 
	  useEffect(()=>{
		refreshDashboard();
	  }, []);

	return (
		<View style={styles.container}>
			{ }
			<Text>Hello World! This is the Dashboard</Text>
			<FlatList
			data = {storyTitles}
			/>
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