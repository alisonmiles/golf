import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
} from 'react-native';

export default function PostRoundItem({ item, setScore }) {
  const { width } = useWindowDimensions();
  const [number, onChangeNumber] = useState(null);

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
              currScore + number;
              console.log('currScore is', currScore);
              console.log('number is', number);
            });
          }}
          // console.log(score);
          // console.log(number);

          placeholder="Enter your score"
          keyboardType="numeric"
          textAlign="center"
        ></TextInput>
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
