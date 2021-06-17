import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import firebaseSetup from '../firebase/config.js';
import { windowWidth } from '../utils/Dimensions.js';
import leaderBoardSorter from '../utils/LeaderboardSorter';

const { db } = firebaseSetup;

function LeaderBoardScreen() {
  const [users, setUsers] = useState([]);
  const [hasUsers, setHasUsers] = useState(false);

  const avatar = {
    img1: {
      uri: require('../../assets/golfer.png'),
    },
    img2: {
      uri: require('../../assets/golfer(1).png'),
    },
    img3: {
      uri: require('../../assets/golfer(2).png'),
    },
    img4: {
      uri: require('../../assets/golfer(3).png'),
    },
  };

  useEffect(() => {
    const usersArray = [];
    db.collection('users')
      .orderBy('handicap')
      .onSnapshot((usersGotten) => {
        usersGotten.forEach((user) => {
          const gottenUser = user.data();
          console.log(gottenUser);
          if (gottenUser.avatar === '../../assets/golfer.png') {
            gottenUser.imgSrc = avatar.img1.uri;
          } else if (gottenUser.avatar === '../../assets/golfer(1).png') {
            gottenUser.imgSrc = avatar.img2.uri;
          } else if (gottenUser.avatar === '../../assets/golfer(2).png') {
            gottenUser.imgSrc = avatar.img3.uri;
          } else gottenUser.imgSrc = avatar.img4.uri;
          usersArray.push(gottenUser);
        });
        leaderBoardSorter(usersArray);
        setUsers(usersArray);
        setHasUsers(true);
      });
  }, [hasUsers]);

  if (hasUsers === false) return <Text>Leader Board Loading...</Text>;
  else {
    return (
      <ImageBackground
        source={require('../../assets/allb.jpeg')}
        style={styles.background}
      >
        <View styles={styles.container}>
          <Text style={styles.header}></Text>
          <Text style={styles.header}>Leader Board</Text>

          <FlatList
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 15,
                    width: windowWidth / 1.15,
                    // backgroundColor: '#f5f5f1',
                  }}
                />
              );
            }}
            contentContainerStyle={{
              padding: 10,
            }}
            data={users}
            numColumns={1}
            renderItem={({ item, index }) => (
              <View style={styles.FeedItem}>
                <Text style={{ fontSize: 22, fontWeight: '700' }}>
                  {`Position ${item.position}`}
                </Text>
                <Text style={{ fontSize: 17, opacity: 0.6 }}>
                  {item.firstname}
                </Text>

                <Text style={{ fontSize: 22, fontWeight: '700' }}>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontSize: 20,
                      color: 'green',
                    }}
                  >
                    {item.handicap} Handicap
                  </Text>
                </Text>
                <Image style={styles.avatar} source={item.imgSrc} />
              </View>
            )}
            keyExtractor={(item, index) => 'key' + index}
            extraData={users}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
  },
  FeedItem: {
    backgroundColor: '#FFF',
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
  },
  avatar: {
    width: 30,
    height: 30,
  },
  figures: {
    flexDirection: 'row',
    textAlign: 'center',
  },

  background: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    // top: 70,
    fontSize: 30,
    textAlign: 'center',
  },
});

export default LeaderBoardScreen;
