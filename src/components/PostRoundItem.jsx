import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
} from 'react-native';

export default function PostRoundItem({ item, setScore, score }) {
  const { width } = useWindowDimensions();
  const [number, onChangeNumber] = useState(0);
  console.log(score);

  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Text>{item.title}</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          onSubmitEditing={() => {
            setScore((currScore) => {
              // console.log(typeof number);
              return currScore + Number(number);
              //item.id
              console.log('currScore is', currScore);
              console.log('number is', number);
            });
          }}
          // console.log(number);

          placeholder="Enter your score"
          keyboardType="numeric"
          textAlign="center"
        ></TextInput>
        <Text>Total {score}</Text>
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
  input: {
    height: 100,
    margin: 12,
    borderWidth: 1,
  },
});
