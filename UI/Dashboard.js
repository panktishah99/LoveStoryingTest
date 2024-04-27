import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import styles from "./CommonStyleSheet"
//show saved stories

export default function Dashboard({ navigation }) {
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
		</View>
	);
}
