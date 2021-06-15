import React, { useContext, useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import firebaseSetup from '../firebase/config.js';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../components/Loading';
const { firebase, db } = firebaseSetup;

export const UserContext = createContext({});

export default function Routes() {
  const [returnedUser, setReturnedUser] = useState();
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((returnedUser) => {
          const userReturned = returnedUser.data();
          setReturnedUser(() => {
            return userReturned;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      <UserContext.Provider value={{ returnedUser }}>
        {user ? <HomeStack /> : <AuthStack />}
      </UserContext.Provider>
    </NavigationContainer>
  );
}
