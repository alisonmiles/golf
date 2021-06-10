import React, { useState } from 'react';
import styles from '../style-sheet';
import { View, Text, ImageBackground } from 'react-native';
import { firebase, db } from '../src/firebase/config.js';

function HomeScreen() {
  const [users, setUsers] = useState([]);

  db.collection('users')
    .get()
    .then((usersInCollection) => {
      const usersArray = [];
      usersInCollection.forEach((user) => {
        usersArray.push(user.data());
      });
      return usersArray;
    })
    .then((usersArray) => {
      if (users.length === 0) setUsers(usersArray);
    });
  if (users.length > 0) {
    db.collection('users')
      .doc(users[0].username)
      .collection('posts')
      .onSnapshot((posts) => {
        posts.forEach((post) => {
          console.log(post.data());
        });
      });
  }

  return (
    <ImageBackground
      source={require('../assets/golf-background.jpeg')}
      style={styles.background}
    >
      <View>
        <Text style={styles.homeText}>GOLF TIME</Text>
      </View>
      <View>
        <Text style={styles.homeText}>Hello</Text>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen;
