import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react/cjs/react.development';
import firebaseSetup from '../firebase/config.js';

const { db, firebase } = firebaseSetup;

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
  }, []);

  //   const data = posts;
  console.log(data, 'data', posts, 'posts');

  const data = [
    {
      uid: 'SbVQIGfzvBh2xwaMAA7mq21Xp2s2',
      coursename: 'whatever',
      scores: 54,
    },
    { coursename: 'hello' },
  ];

  // flatlist will not render data that comes from state
  // nchelp??

  return (
    <View>
      <FlatList
        data={data}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Text>{item.coursename}</Text>
            <Text>{item.score}</Text>
          </View>
        )}
        listKey={(item) => {
          item.key;
        }}
        extraData={hasPosts}
      />
    </View>
  );
}
// }

export default Feed;
