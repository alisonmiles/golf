import React from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

export default function PostRoundItem({ item }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Text>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
