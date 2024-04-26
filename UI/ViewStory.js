import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import styles from "./CommonStyleSheet"

export default function ViewStory({navigation}) {
	return (
		<View style={styles.container}>
	      <Text>Hello World! This is the View Story page</Text>
	      <View style={{ height: 20 }} />
	      <Button
	        title="Go back to Create Story"
	        onPress={() => navigation.navigate('CreateStory')}
	      />
        <View style={{ height: 20 }} />
        <Button
          title="Ready to Answer Questions?"
          onPress={() => navigation.navigate('Questionnaire')}
        />
	    </View>
	);
}

// - read data from api - see function in CreateStory.js
// - format text and image 
// - Add save story button
