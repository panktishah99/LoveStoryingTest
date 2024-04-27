import {StyleSheet} from 'react-native';

export default styles = StyleSheet.create({
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
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    height: 30,
    width: 200,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  content: {
    flexGrow: 1,
    paddingTop: 20,
  },
  storyParameterSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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