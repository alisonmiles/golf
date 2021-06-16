import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import firebaseSetup from '../firebase/config.js';
import { windowWidth } from '../utils/Dimensions.js';

const { db } = firebaseSetup;

function Feed() {
  const [posts, setPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);

  useEffect(() => {
    const postsArray = [];
    db.collection('posts').onSnapshot((postsGotten) => {
      postsGotten.forEach((post) => {
        const gottenPost = post.data();
        postsArray.push(gottenPost);
      });
      setPosts(postsArray);
      setHasPosts(true);
    });
  }, [hasPosts]);

  if (hasPosts === false) return <Text>Posts Loading...</Text>;
  else {
    return (
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
        data={posts}
        numColumns={1}
        renderItem={({ item, index }) => (
          <View style={styles.FeedItem}>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>
              {item.username}
            </Text>
            <Text style={{ fontSize: 17, opacity: 0.6 }}>
              {item.coursename}
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
              </View>
              <View style={styles.figures}>
                <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                  Gross Score
                </Text>
                <Text style={{ flex: 1, textAlign: 'center', opacity: 0.7 }}>
                  Over/Under Par
                </Text>
              </View>
            </View>
            {/* <Text>Date: {new Date(item.key.seconds * 1000).toString()}</Text> */}
            {/* <Image source={require(`../../assets/${item.avatar}`)} /> */}
            <View>
              <Image style={styles.avatar} source={item.avatar} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => 'key' + index}
        extraData={posts}
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

export default Feed;
