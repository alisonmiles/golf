import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Animated } from 'react-native';
import postSlides from '../postSlides';
import PostRoundItem from './PostRoundItem';

export default function PostRound({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [parScore, setParScore] = useState(0);
  const [overUnder, setOverUnder] = useState(0);

  useEffect(() => {
    setOverUnder(score - parScore);
  }, [score, parScore]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    //setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post a round</Text>
      <FlatList
        data={postSlides}
        renderItem={({ item }) => (
          <PostRoundItem
            item={item}
            setScore={setScore}
            score={score}
            parScore={parScore}
            setParScore={setParScore}
            overUnder={overUnder}
            setOverUnder={setOverUnder}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={true}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    top: 70,
    fontSize: 30,
  },
});
