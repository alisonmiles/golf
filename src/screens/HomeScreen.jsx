import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Feed from '../components/Feed';
import { UserContext } from '../navigation/Routes';
import { AuthContext } from '../navigation/AuthProvider';
import Loading from '../components/Loading';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const { returnedUser } = useContext(UserContext);

  console.log(returnedUser);

  if (!returnedUser) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {returnedUser.username}</Text>
      <Feed />
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
