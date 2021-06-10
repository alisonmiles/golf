import React from 'react';
import styles from '../style-sheet';
import { firebase, db } from '../src/firebase/config.js';
import { Button } from 'react-native';

function PostingScreen() {
  function pressButton() {
    db.collection('users')
      .doc('anna c')
      .collection('posts')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        coursename: 'showing off test',
        scores: 89,
        username: 'anna c',
      })
      .then((documentReference) => {
        console.log(documentReference);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Button
      onPress={() => {
        pressButton();
      }}
      title="POST"
    ></Button>
  );
}

export default PostingScreen;
