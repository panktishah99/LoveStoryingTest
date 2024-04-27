import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from "./UI/Login";
import Dashboard from "./UI/Dashboard";
import CreateStory from "./UI/CreateStory";
import ViewStory from "./UI/ViewStory";
import Questionnaire from "./UI/Questionnaire";
import ReadStory from "./UI/ReadStory";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="CreateStory" component={CreateStory} />
        <Stack.Screen name="ViewStory" component={ViewStory} />
        <Stack.Screen name="Questionnaire" component={Questionnaire} />
        <Stack.Screen name="ReadStory" component={ReadStory} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}