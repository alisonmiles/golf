import React, { useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Feed from '../components/Feed';
import { UserContext } from '../navigation/Routes';
import { AuthContext } from '../navigation/AuthProvider';
import Loading from '../components/Loading';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const { returnedUser } = useContext(UserContext);

  if (!returnedUser) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Welcome {returnedUser.username}</Text>
      <Feed />
    </SafeAreaView>
  );
};

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
