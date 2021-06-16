import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import firebaseSetup from '../firebase/config.js';

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
    });
    setPosts(postsArray);
    setHasPosts(true);
  }, [hasPosts]);

  if (hasPosts === false) return <Text>Posts Loading...</Text>;
  else {
    return (
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
        data={posts}
        numColumns={1}
        renderItem={({ item, index }) => (
          <View style={styles.FeedItem}>
            <Text>Course Name:{item.coursename}</Text>
            <Text>Gross Score:{item.score}</Text>
            <Text>Over/Under Par: {item.overUnderPar}</Text>
            {/* <Text>Date: {new Date(item.key.seconds * 1000).toString()}</Text> */}
            <Text>Golfer: {item.username}</Text>
            {/* <Image source={require(`../../assets/${item.avatar}`)} /> */}
            <View>
              <Image style={styles.avatar} source={item.avatar} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => 'key' + index}
        extraData={posts}
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
    //need to work out how to make each post fill more of the screen
  },
  avatar: {
    width: 30,
    height: 30,
  },
});

export default Feed;
