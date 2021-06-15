import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';

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
                //   marginLeft: '14%',
              }}
            />
          );
        }}
        data={posts}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.FeedItem}>
            <Text>Course Name:{item.coursename}</Text>
            <Text>Score:{item.score}</Text>
            <Text>Date: {new Date(item.key.seconds).toString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key.toString()}
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
  },
});

export default Feed;
