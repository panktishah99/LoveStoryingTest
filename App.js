import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React,{ useEffect, useState } from 'react';

import Login from "./UI/Login";
import Dashboard from "./UI/Dashboard";
import CreateStory from "./UI/CreateStory";
import ViewStory from "./UI/ViewStory";
import Questionnaire from "./UI/Questionnaire";
import ReadStory from "./UI/ReadStory";

import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './components/FireBaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout(){
  return (
    <InsideStack.Navigator>
        <InsideStack.Screen name="Dashboard" component={Dashboard} />
        <InsideStack.Screen name="CreateStory" component={CreateStory} />
        <InsideStack.Screen name="ViewStory" component={ViewStory} />
        <InsideStack.Screen name="Questionnaire" component={Questionnaire} />
        <InsideStack.Screen name="ReadStory" component={ReadStory} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user,setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log('user',user); 
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        { user ? 
          ( <Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown : false }} /> )
          : ( <Stack.Screen name="Login" component={Login} options={{ headerShown : false }} /> )
        }
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );

}