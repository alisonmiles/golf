import React, { useState } from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TextInput,
} from 'react-native';
import styles from '../style-sheet';

function WelcomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          placeholder='Email Address'
          onChangeText={(email) => setEmail(email)}
        ></TextInput>
      </View>
      <View style={styles.welcomeInput}>
        <TextInput
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        ></TextInput>
      </View>
      <StatusBar style='auto' />
    </ImageBackground>
  );
}

export default WelcomeScreen;
