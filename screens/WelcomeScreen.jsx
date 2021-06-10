import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
} from 'react-native';
import styles from '../style-sheet';
import { firebase, db } from '../src/firebase/config.js';

function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const docRef = db
    .collection('users')
    .doc('anna c')
    .collection('posts')
    .doc('first post');

  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log(doc.data());
    } else {
      console.log('no such document');
    }
  });

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.log(errorCode, errorMessage);
    });

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
    });

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
      <View>{user ? <Text>Hello</Text> : <Text>NO USER</Text>}</View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

export default WelcomeScreen;
