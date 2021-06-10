import React from 'react';
import styles from '../../style-sheet';
import { firebase, db } from '../firebase/config.js';
import { Button } from 'react-native';

function PostingScreen() {
  function pressButton() {
    db.collection('users')
      .doc('mr heworth')
      .collection('posts')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        coursename: 'Im a cat',
        scores: 70,
        username: 'mr heworth',
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
