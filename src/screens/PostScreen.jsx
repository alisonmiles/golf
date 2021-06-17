import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import PostRound from '../components/PostRound';

export default function PostScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <ImageBackground
      source={require('../../assets/allb.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <PostRound />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f5f5f1',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  background: {
    flex: 1,
    alignItems: 'center',
  },
});
