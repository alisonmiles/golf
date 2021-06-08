import React from 'react';
import { Text, View, StatusBar } from 'react-native';
import styles from '../style-sheet';

function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeStyle}>Welcome to the Golf App!!</Text>
      </View>
      <StatusBar style='auto' />
    </View>
  );
}

export default WelcomeScreen;
