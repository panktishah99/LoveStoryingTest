import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import styles from "./CommonStyleSheet"

export default function ReadStory({navigation}) {
	return (
		<View style={styles.container}>
	      <Text>Hello World! This is the Read Story page</Text>
        <View style={{ height: 20 }} />
        <Button
          title="Ready to Answer Questions?"
          onPress={() => navigation.navigate('Questionnaire')}
        />
	    </View>
	);
}