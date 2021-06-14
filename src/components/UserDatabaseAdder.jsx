import React, { useContext, useState } from 'react';
import firebaseSetup from '../firebase/config.js';
import { AuthContext } from '../navigation/AuthProvider.jsx';
import { Text, TextInput, StyleSheet, View, Button } from 'react-native';
import AvatarRadioButton from './AvatarRadioButton.jsx';
function UserDatabaseAdder() {
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [handicap, setHandicap] = useState([]);

  function createUser() {
    firebaseSetup.db
      .collection('users')
      .doc(user.uid)
      .set({
        userid: user.uid,
        username: userName,
        firstname: firstName,
        handicap: handicap,
        avatar: selectedAvatar,
      })
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(event) => {
          setUserName(event);
        }}
        placeholder='username'
        value={userName}
        style={styles.inputField}
      />
      <TextInput
        onChangeText={(event) => {
          setFirstName(event);
        }}
        placeholder='first name'
        value={firstName}
        style={styles.inputField}
      />
      <TextInput
        onChangeText={(event) => {
          setHandicap(event);
        }}
        placeholder='your current handicap'
        value={handicap}
        style={styles.inputField}
      />
      <AvatarRadioButton
        selectedAvatar={selectedAvatar}
        setSelectedAvatar={setSelectedAvatar}
      />
      {userName.length > 0 &&
      firstName.length > 0 &&
      selectedAvatar.length > 0 &&
      handicap.length > 0 ? (
        <Button
          title='Submit'
          onPress={() => {
            createUser();
          }}
        />
      ) : (
        <Text>Please fill in all fields</Text>
      )}
    </View>
  );
}
export default UserDatabaseAdder;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  inputField: {
    backgroundColor: '#FFF',
  },
});
