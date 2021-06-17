import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import firebaseSetup from '../firebase/config.js';
import { windowWidth } from '../utils/Dimensions.js';
import leaderBoardSorter from '../utils/LeaderboardSorter';

const { db } = firebaseSetup;

function LeaderBoardScreen() {
  const [users, setUsers] = useState([]);
  const [hasUsers, setHasUsers] = useState(false);

  useEffect(() => {
    const usersArray = [];
    db.collection('users')
      .orderBy('handicap')
      .onSnapshot((usersGotten) => {
        usersGotten.forEach((user) => {
          const gottenUser = user.data();
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
            <Text style={{ fontSize: 22, fontWeight: '700' }}>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 30,
                  color: 'green',
                }}
              >
                {item.handicap}
              </Text>
            </Text>
            <Text style={{ fontSize: 17, opacity: 0.6 }}>{item.firstname}</Text>
            {/* <Image style={styles.avatar} source={item.avatar} /> */}
          </View>
        )}
        keyExtractor={(item, index) => 'key' + index}
        extraData={users}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default LeaderBoardScreen;
