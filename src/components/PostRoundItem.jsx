import React, { useState, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import firebaseSetup from '../firebase/config';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

const { firebase, db } = firebaseSetup;

export default function PostRoundItem({
  item,
  setScore,
  score,
  parScore,
  setParScore,
}) {
  const { width } = useWindowDimensions();
  const [number, onChangeNumber] = useState(0);
  const [overUnder, setOverUnder] = useState(0);

  const { user } = useContext(AuthContext);

  const navigation = useNavigation();

  console.log(overUnder);

  const sendToDb = () => {
    db.collection('posts')
      .add({
        key: firebase.firestore.FieldValue.serverTimestamp(), //unchanged
        coursename: 'Heworth Golf Club', // will be hardcoded
        score: score, // gotten from state
        overUnderPar: overUnder, // ditto
        uid: user.uid, // gotten from user context
      })
      .then((documentReference) => {
        console.log('done');
      })
      .catch((err) => {
        Alert.alert('An Error Occured :(');
        console.log(err);
      });
  };

  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Text>{item.title}</Text>
        {item.id === '1' ? (
          <View>
            <Text>{item.option1.courseName}</Text>
            <Text>{item.option1.location}</Text>
            <Text>Par {item.option1.coursePar}</Text>
          </View>
        ) : null}
        {item.id !== '1' ? (
          <View>
            <Text>PAR {item.par}</Text>
            <Text>{item.yards} YARDS</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              // value={number}
              onSubmitEditing={() => {
                setScore((currScore) => {
                  return currScore + parseInt(number);
                });
                setParScore((currPar) => {
                  return currPar + item.par;
                });
              }}
              placeholder="Enter your score"
              keyboardType="numeric"
              textAlign="center"
              returnKeyType="done"
            ></TextInput>

            <Text>Total: {score}</Text>
            <Text>
              {' '}
              Over/Under{' '}
              {score - parScore > 0
                ? `+ ${score - parScore}`
                : score - parScore}
            </Text>
          </View>
        ) : null}

        {item.id === '19' ? (
          <Button
            title="Post My Round"
            onPress={() => {
              setOverUnder(score - parScore);
              sendToDb();
              navigation.navigate('Home', {});
            }}
          ></Button>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
  input: {
    height: 60,
    width: 140,
    margin: 12,
    borderWidth: 1,
  },
});
