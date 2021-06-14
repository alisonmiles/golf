import React, { createContext, useState, useContext } from 'react';
import firebaseSetup from '../firebase/config.js';
import { AuthContext } from '../navigation/AuthProvider.jsx';

const { firebase, db } = firebaseSetup;

export const LoggedInUserContext = createContext({});

const LoggedInUserSetter = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const { user } = useContext(AuthContext);

  db.collection('users')
    .doc(user.uid)
    .get()
    .then((returnedUser) => {
      console.log(returnedUser);
    });

//   const loggedInUserSetter = () => {
//     setLoggedInUser({});
//   };

  return null;
};

export default LoggedInUserSetter;
