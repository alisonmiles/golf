import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import PostRound from '../components/PostRound';

export default function PostScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <PostRound />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
});
