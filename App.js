import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';

import Login from "./UI/Login";
import CreateAccount from "./UI/CreateAccount";
import Dashboard from "./UI/Dashboard";
import CreateStory from "./UI/CreateStory";
import ViewStory from "./UI/ViewStory";
import Questionnaire from "./UI/Questionnaire";
import ReadStory from "./UI/ReadStory";

import ReadStoryAll from "./UI/ReadStoryAll";
import Central from "./UI/Central";

import { User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './components/FireBaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="My Library">
      <InsideStack.Screen name="My Library" component={Dashboard} />
      <InsideStack.Screen name="Create your own story" component={CreateStory}/>
      <InsideStack.Screen name="ViewStory" component={ViewStory} options={{ headerShown: false }}/>
      <InsideStack.Screen name="Questionnaire" component={Questionnaire} options={{ headerShown: false }}/>
      <InsideStack.Screen name="ReadStory" component={ReadStory} options={{ headerShown: false }}/>
  	  <InsideStack.Screen name="Community Stories" component={Central}/>
  	  <InsideStack.Screen name="ReadStoryAll" component={ReadStoryAll} options={{ headerShown: false }}/>
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      //console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
  <RootSiblingParent>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ?
            (<Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }} />)
            : ( <>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="CreateAccount" component={CreateAccount}/>
                </>
              )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </RootSiblingParent>
  );

}