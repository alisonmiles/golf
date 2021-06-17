import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import { UserContext } from '../navigation/Routes';
import firebaseSetup from '../firebase/config.js';
import { useEffect, useState } from 'react/cjs/react.development';
import Loading from '../components/Loading';
import { windowWidth } from '../utils/Dimensions.js';

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
      <ImageBackground
        source={require('../../assets/allb.jpeg')}
        style={styles.background}
      >
        <View style={{ alignItems: 'center' }}>
          <View style={styles.profileInfo}>
            <Image source={avatar} style={styles.avatar}></Image>
            <View style={{ alignItems: 'center', top: 20 }}>
              <Text style={{ fontSize: 30, color: 'green' }}>
                {returnedUser.handicap}
              </Text>
              <Text style={styles.text}>Handicap</Text>
            </View>
          </View>

          <Text style={styles.text}>Hello {returnedUser.firstname}</Text>
          <Text style={styles.text}>Username: {returnedUser.username}</Text>

          <Text style={styles.RoundHeader}>Your Previous Rounds</Text>
        </View>

        <FlatList
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 15,
                  width: windowWidth / 1.15,
                  backgroundColor: '#f5f5f1',
                }}
              />
            );
          }}
          contentContainerStyle={{
            padding: 10,
          }}
          data={userPosts}
          numColumns={1}
          renderItem={({ item }) => (
            <View style={styles.RoundInfo}>
              <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                {item.coursename}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  opacity: 0.7,
                  marginTop: 10,
                }}
              >
                {new Date(item.key.seconds * 1000).toDateString()}
              </Text>
              <View style={{ marginTop: 15 }}>
                <View style={styles.figures}>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 30,
                      color: 'green',
                    }}
                  >
                    {item.score}
                  </Text>
                </View>
                <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                  Over/Under Par:{' '}
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 30,
                      color: 'green',
                    }}
                  >
                    {item.overUnderPar}
                  </Text>
                </Text>
                <View style={styles.figures}>
                  <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                    Gross Score
                  </Text>
                  <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                    Over/Under Par
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          extraData={userPosts}
          showsVerticalScrollIndicator={false}
        />

        <View style={{ marginBottom: 60 }}>
          <FormButton buttonTitle="Logout" onPress={() => logout()} />
        </View>
      </ImageBackground>
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
  RoundHeader: {
    fontSize: 22,
  },
  RoundInfo: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  background: {
    flex: 1,
    alignItems: 'center',
  },
  figures: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  profileInfo: {
    flexDirection: 'row',
  },
});
