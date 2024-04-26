import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import styles from "./CommonStyleSheet"

export default function Questionnaire({navigation}) {
	return (
		<View style={styles.container}>
	      <Text>Hello World! This is the Questionnaire</Text>
	      <View style={{ height: 20 }} />
	      <Button
	        title="Go back to View Story"
	        onPress={() => navigation.navigate('ViewStory')}
	      />
	    </View>
	);
}

