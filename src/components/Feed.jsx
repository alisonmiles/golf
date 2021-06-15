import React from 'react';
import { View, Text, FlatList } from 'react-native';
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
        data={posts}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Text>Course Name:{item.coursename}</Text>
            <Text>Score:{item.scores}</Text>
            <Text>Date: {new Date(item.key.seconds).toString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key.toString()}
        extraData={posts}
      />
    );
  }
}

export default Feed;
