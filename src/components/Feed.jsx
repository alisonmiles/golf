import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import firebaseSetup from '../firebase/config.js';
import { windowWidth } from '../utils/Dimensions.js';

const { db } = firebaseSetup;

function Feed() {
  const [posts, setPosts] = useState([]);
  const [hasPosts, setHasPosts] = useState(false);

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
    const postsArray = [];
    db.collection('posts').onSnapshot((postsGotten) => {
      postsGotten.forEach((post) => {
        let gottenPost = post.data();
        if (gottenPost.avatar === '../../assets/golfer.png') {
          gottenPost.imgSrc = avatar.img1.uri;
        } else if (gottenPost.avatar === '../../assets/golfer(1).png') {
          gottenPost.imgSrc = avatar.img2.uri;
        } else if (gottenPost.avatar === '../../assets/golfer(2).png') {
          gottenPost.imgSrc = avatar.img3.uri;
        } else gottenPost.imgSrc = avatar.img4.uri;
        // const date = gottenPost.key.toDate().toLocaleTimeString();
        // gottenPost.date = date;
        // console.log(gottenPost);
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
                // backgroundColor: '#f5f5f1',
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
            <View style={styles.Row}>
              <Text style={{ fontSize: 22, fontWeight: '700' }}>
                {item.firstname}
              </Text>
              <Image source={item.imgSrc} style={styles.avatar} />
            </View>
            <Text style={{ fontSize: 17, opacity: 0.6 }}>
              {item.coursename}
            </Text>
            {/* <Text>Date: {item.date}</Text> */}
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
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  figures: {
    flexDirection: 'row',
    textAlign: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    margin: 6,
  },
});

export default Feed;
