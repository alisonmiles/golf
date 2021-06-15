import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Feed from '../components/Feed';
import { AuthContext } from '../navigation/AuthProvider';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome {user.uid}</Text>
      <Feed />
    </SafeAreaView>
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
