import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import _loadFontsAsync from './CustomFonts';

import WelcomeScreen from './src/screens/Welcome/WelcomeScreen';
import SignupScreen from './src/screens/Authentication/SignupScreen';
import SigninScreen from './src/screens/Authentication/SigninScreen';
import HomeScreen from './src/screens/Home/HomeScreen';

import { Provider as AuthProvider } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

const App = ()=>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{
            headerShown : false
          }}
        />
        <Stack.Screen 
          name="Signin" 
          component={SigninScreen}
          options={{
            headerShown : false
          }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen}
          options={{
            headerShown : false
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            headerShown : false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ()=>{
  
  [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(()=>{
    _loadFontsAsync();
  }, []);

  if(!fontsLoaded){
    return null;
  }

  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
