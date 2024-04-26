import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';

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




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Swansea',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: 'stretch',
    fontFamily: 'Swansea',
  },
  genreSelector: {
    fontFamily: 'Swansea',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  error: {
    color: 'red',
    marginBottom: 20,
  },
  content: {
    fontFamily: 'Swansea',
    flexGrow: 1,
    paddingTop: 20,
  },
  storyContainer: {
    marginBottom: 20,
  },
  storyTitle: {
    fontFamily: 'Swansea',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  storyText: {
    fontFamily: 'Swansea',
    fontSize: 16,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});