import React from 'react';
import styles from '../../style-sheet';
import firebaseSetup from '../firebase/config.js';
import { Button } from 'react-native';
const { firebase, db } = firebaseSetup;


function PostingScreen() {
  const [scores, setScores] = useState();
  function pressButton() {
    firebaseSetup.db
      .collection('posts')
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), //unchanged
        coursename: 'Im a cat', // will be hardcoded
        score: score, // gotten from state
        overUnderPar: 2, // ditto
        uid: user.uid, // gotten from user context
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
