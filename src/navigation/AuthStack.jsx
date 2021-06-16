import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LogInScreen';
import SecondSignUpScreen from '../screens/SecondSignUpScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen
        name="SecondSignUp"
        component={SecondSignUpScreen}
        options={{ title: 'Signup' }}
      />
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
