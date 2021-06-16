import React, { useState, useContext } from 'react';
import { AuthContext } from '../navigation/AuthProvider';
import { UserContext } from '../navigation/Routes';
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
import { windowWidth, windowHeight } from '../utils/Dimensions';

const { firebase, db } = firebaseSetup;

export default function PostRoundItem({
  item,
  setScore,
  score,
  parScore,
  setParScore,
  overUnder,
  setOverUnder,
}) {
  const { width } = useWindowDimensions();
  const [number, onChangeNumber] = useState(0);
  const [date, onChangeDate] = useState(0);

  const { user } = useContext(AuthContext);
  const { returnedUser } = useContext(UserContext);

  const navigation = useNavigation();

  const sendToDb = () => {
    db.collection('posts')
      .add({
        key: firebase.firestore.FieldValue.serverTimestamp(), //unchanged
        coursename: 'Heworth Golf Club', // will be hardcoded
        score: score, // gotten from state
        overUnderPar: overUnder, // ditto
        uid: user.uid, // gotten from user context
        avatar: returnedUser.avatar,
        username: returnedUser.username,
        firstname: returnedUser.firstname,
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
      <View
        style={{
          backgroundColor: '#FFF',
          width: windowWidth / 1.15,
          // height: windowHeight / 1.5,
          // alignItems: 'center',
          borderRadius: 5,
          padding: 20,
          borderRadius: 5,
          elevation: 3,
          // zIndex:999 - might need for IOS
          shadowColor: '#000',
          shadowOffset: {
            width: 5,
            height: 5,
          },
          shadowOpacity: 1,
          shadowRadius: 10,
        }}
      >
        {item.id === '1' ? (
          <View>
            <Text style={{ fontSize: 25, fontWeight: '700', marginBottom: 2 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>
              {item.option1.courseName}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              {item.option1.location}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '500', opacity: 0.6 }}>
              Par {item.option1.coursePar}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '500', opacity: 0.6 }}>
              Good luck!
            </Text>
          </View>
        ) : null}
        {item.id !== '1' ? (
          <View style={{}}>
            <Text style={{ fontSize: 25, fontWeight: '700' }}>
              {item.title}
            </Text>
            <View style={styles.holeInfo}>
              <Text style={{ flex: 1, textAlign: 'center' }}>
                PAR {item.par}
              </Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>
                {item.yards} YARDS
              </Text>
            </View>
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
                // setOverUnder(() => {
                //   console.log('score is', score, 'parScore is', parScore);
                //   return score - parScore;
                // });
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
              {score - parScore > 0 ? `+${score - parScore}` : score - parScore}
            </Text>
          </View>
        ) : null}

        {item.id === '19' ? (
          <Button
            title="Post My Round"
            onPress={() => {
              // setOverUnder(score - parScore);
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
  },
  holeInfo: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  input: {
    height: 60,
    width: 140,
    margin: 12,
    borderWidth: 1,
  },
});
