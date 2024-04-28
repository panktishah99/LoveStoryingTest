import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage:{
    flex: 1, // Cover the entire view
    resizeMode: 'stretch', // Adjust how the image fits (e.g., 'cover', 'contain', 'stretch')
    zIndex: -1,
    backgroundColor: 'transparent',
  
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputLabel: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
  },
  loginInput: {
    height: 50,
    width: 270,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: '#f5faf9',
    fontSize: 18,
  },
  inputNumber: {
    height: 30,
    width: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: '#f5faf9',
    fontSize: 20,
  },
  inputText: {
    height: 100,
    width: 300,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: '#f5faf9',
    fontSize: 18,
  },
  content: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 14,
    fontSize: 18,

  },
  storyParameterSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  buttonStyle: {
    fontSize: 18,
    height: 50,
    backgroundColor: '#fcc73f',
  },
  buttonStyle1: {
	  borderWidth: 1,
	  backgroundColor: '#575DD9',
	  alignItems: "center",
	  justifyContent: "center",
	  alignSelf: "stretch",
	  marginTop: 32,
	  marginHorizontal: 32,
	  borderRadius: 6,
	  paddingVertical: 12,
	  paddingHorizontal: 32,
	} 
});