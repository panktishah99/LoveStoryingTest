import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    zIndex: -1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    opacity: 0.5,
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
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#f5efe6',
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'center',
    alignItems: 'center',
    zIndex: 0,
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
    paddingHorizontal: 20,
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
    backgroundColor: '#0b756e',
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
  },
  buttonStyle1: {
    borderWidth: 1,
    backgroundColor: '#256943',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 32,
    marginHorizontal: 32,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  pullButton: {
    borderWidth: 1,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 1,
    marginHorizontal: 32,
    borderRadius: 6,
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  imageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  imageInfo: {
    flexDirection: 'row',
    alignItems: 'stretch',
    width: 250,
  },
  imageName: {
    marginTop: 5,
    marginLeft: 5,
    marginRight: 10,
    marginBottom: 5,
    textAlign: 'left',
    width: 160,
    fontSize: 16,
  },
  // New style for error container
  errorContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  errorText: {
    // backgroundColor: 'white',
    color: 'red', // Adjust the text color as needed
    padding: 5, // Add padding for better readability
    marginTop: 5, // Add some space between the error message and the input field
  },
  pickerStyle: {
    width:180,
    height:20,
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 150,
    backgroundColor: 'white'
  },
  qcontainer: {
    flexGrow: 1,
    padding: 10,
  },
  scoreContainer: {
    alignSelf:'center',
    marginTop: 20,
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf:'center',
  },
  questionContainer: {
    marginVertical:10,
    backgroundColor: '#f7ecc1',
    borderRadius:5,
  },
  question: {
    fontSize: 16,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#8de2f7',
  },
  answerContainer: {
    flexDirection: 'column',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  correctAnswer: {
    fontSize: 14,
    marginHorizontal:10,
    marginVertical: 5,
  },
  wrongAnswersContainer: {
    marginTop: 20,
  },
  wrongAnswersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 15,
},
deleteButton: {
    backgroundColor: 'red',
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
},
selectStory:{
  height:115, 
  borderRadius: 10, 
  alignItems: 'center',
},
lottie: {
  width: 300,
  height: 300,
  position: 'absolute',
},
});

