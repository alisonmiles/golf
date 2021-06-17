import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { UserContext } from '../navigation/Routes';
import firebaseSetup from '../firebase/config.js';
import { useEffect, useState } from 'react/cjs/react.development';
import Loading from '../components/Loading';

const { db } = firebaseSetup;

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { returnedUser } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);

  let avatar;

  if (returnedUser.avatar === '../../assets/golfer(2).png') {
    avatar = require('../../assets/golfer(2).png');
  } else if (returnedUser.avatar === '../../assets/golfer.png') {
    avatar = require('../../assets/golfer.png');
  } else if (returnedUser.avatar === '../../assets/golfer(1).png') {
    avatar = require('../../assets/golfer(1).png');
  } else {
    avatar = require('../../assets/golfer(3).png');
  }

  useEffect(() => {
    const userPostsArray = [];
    db.collection('posts')
      .where('uid', '==', user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((post) => {
          userPostsArray.push(post.data());
        });
        setUserPosts(userPostsArray);
        setHasPosts(true);
      });
  }, [hasPosts]);

  if (!returnedUser || hasPosts === false) {
    return <Loading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <FormButton
        style={styles.logoutButton}
        buttonTitle="Logout"
        onPress={() => logout()}
      />
      {/* <View style={styles.container}> */}
      <Text style={styles.text}>Hello {returnedUser.firstname}</Text>
      <Text style={styles.text}>Username: {returnedUser.username}</Text>
      <Text style={styles.text}>Handicap: {returnedUser.handicap}</Text>
      <Image source={avatar} style={styles.avatar}></Image>
      {/* </View> */}
      <Text>Your Previous Rounds:</Text>
      <FlatList
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 20,
                width: '100%',
                backgroundColor: '#f5f5f1',
              }}
            />
          );
        }}
        data={userPosts}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Text>Course Name: {item.coursename}</Text>
            <Text>Gross Score: {item.score}</Text>
            <Text>Over/Under Par: {item.overUnderPar} </Text>
            <Text>Date: {new Date(item.key.seconds * 1000).toString()}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        extraData={userPosts}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
    // </View>
  );
}

const styles = StyleSheet.create({
  FeedItem: {
    flex: 1,
    backgroundColor: '#FFF',
    //need to work out how to make each post fill more of the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1',
  },
  logoutButton: {
    textAlign: 'right',
  },
  text: {
    fontSize: 20,
    color: '#333333',
  },
  avatar: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    margin: 6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1',
    top: 50,
  },
});
