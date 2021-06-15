import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from '../../style-sheet';
import firebaseSetup from '../firebase/config.js';

const {firebase} = firebaseSetup;

function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode, errorMessage);
      });
  };

  const logIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
      });
  };

  const user = firebase.auth().currentUser;

  return (
    <ImageBackground
      source={require('../assets/golf-background.jpeg')}
      style={styles.background}
    >
      <View style={styles.welcomeHeader}>
        <Text style={styles.welcomeText}>Golf App</Text>
      </View>
      <View style={styles.welcomeInput}>
        <TextInput
          placeholder="Email Address"
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
      </View>
      <View style={styles.welcomeInput}>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={styles.logInButton}
        onPress={() => {
          logIn(email, password);
        }}
      >
        Log in
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => {
          signUp(email, password);
        }}
      >
        Sign up
      </TouchableOpacity>
      <View>{user ? <Text>Hello</Text> : <Text>NO USER</Text>}</View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default WelcomeScreen;
