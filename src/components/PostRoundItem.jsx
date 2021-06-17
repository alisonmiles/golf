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

  const handicapUpdate = () => {
    db.collection('users')
      .doc(user.uid)
      .update({
        handicap: returnedUser.handicap + handicapCalculation(),
      })
      .then(() => {
        console.log('Handicap updated');
      });
  };

  const handicapCalculation = () => {
    let netScore = score - Math.floor(returnedUser.handicap);
    if (netScore < parScore) {
      const handicapboost = (parScore - netScore) / 10;
      console.log(handicapboost);
      console.log('parscor is', parScore);
      console.log('netscore is', netScore);
      // Alert(`Handicap BOOST, -${handicapboost}`);
      return -handicapboost;
    } else if (netScore > parScore) {
      console.log('0.1');
      return 0.1;
    }
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
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  opacity: 0.7,
                }}
              >
                PAR
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  opacity: 0.7,
                }}
              >
                YARDS
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  opacity: 0.7,
                }}
              >
                S.I
              </Text>
            </View>
            <View style={styles.holeInfo}>
              <Text style={{ flex: 1, textAlign: 'center' }}>{item.par}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>{item.yards}</Text>
              <Text style={{ flex: 1, textAlign: 'center' }}>
                {item.strokeIndex}
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
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
                placeholder="Enter score"
                keyboardType="numeric"
                alignItems="center"
                textAlign="center"
                returnKeyType="done"
              ></TextInput>
            </View>
            <View style={styles.holeInfo}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'green',
                }}
              >
                {score}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'green',
                }}
              >
                {score - parScore > 0
                  ? `+${score - parScore}`
                  : score - parScore}
              </Text>
            </View>
            <View style={styles.holeInfo}>
              <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                Gross Score
              </Text>
              <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                Over/Under
              </Text>
            </View>
          </View>
        ) : null}

        {item.id === '19' ? (
          <Button
            title="Post My Round"
            onPress={() => {
              // setOverUnder(score - parScore);
              handicapUpdate();
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
    height: 120,
    width: 140,
    margin: 20,
    borderWidth: 1,
    fontSize: 25,
  },
});
