import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import styles from "./CommonStyleSheet"
import MyImage from '../assets/bgimages/dashboard.jpg';
//show saved stories

export default function Dashboard({ navigation }) {
	return (
		<ImageBackground source={MyImage} style={styles.backgroundImage}>
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
		</View>
		</ImageBackground>
	);
}
