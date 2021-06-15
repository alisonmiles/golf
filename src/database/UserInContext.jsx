import React, { createContext, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import firebaseSetup from '../firebase/config.js';

export const UserContext = createContext({});

export default function UserInContext() {
  const { firebase, db } = firebaseSetup;
  const { user } = useContext(AuthContext);

  db.collection('users')
    .doc(user.uid)
    .get()
    .then((returnedUser) => {
      const userReturned = returnedUser.data();
      console.log(userReturned);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <View>
      <Text>Testing</Text>
    </View>
  );
}
