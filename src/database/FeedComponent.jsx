import React, { useState } from 'react';
import styles from '../../style-sheet';
import { firebase, db } from '../firebase/config.js';
import { View, FlatList } from 'react-native';
function FeedComponent() {
  const [posts, setPosts] = useState([]);
  const [usernames, setUsernames] = useState([]);
  // be refactored to use database structure with posts in their own separate collection
  // but linked to user via uid
  db.collection('users')
    .get()
    .then((usersInCollection) => {
      const usernamesArray = [];
      usersInCollection.forEach((user) => {
        usernamesArray.push(user.data().username);
      });
      return usernamesArray;
    })
    .then((usernamesArray) => {
      if (usernames.length === 0) setUsernames(usernamesArray);
    });
  if (usernames.length > 0) {
    const postsArray = [];
    for (let i = 0; i < usernames.length; i++) {
      db.collection('users')
        .doc(usernames[i])
        .collection('posts')
        .onSnapshot((posts) => {
          posts.forEach((post) => {
            postsArray.push(post.data());
          });
        });
    }
    for (let i = 0; i < postsArray.length; i++) {
      postsArray[i].timestamp = post.data().timestamp.toDate();
      console.log(postsArray);
    }
  }
  return <View>{/* <FlatList data={} renderItem={}/> */}</View>;
}
export default FeedComponent;
