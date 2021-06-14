import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  TextInput,
  Button,
} from 'react-native';

export default function PostRoundItem({ item, setScore, score }) {
  const { width } = useWindowDimensions();
  const [number, onChangeNumber] = useState(0);

  console.log(item.id);
  return (
    <View style={[styles.container, { width }]}>
      <View>
        <Text>{item.title}</Text>
        {item.id !== '1' ? (
          <View>
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

            <Text>Total: {score}</Text>
          </View>
        ) : null}

        {item.id === '19' ? <Button title="Post My Round"></Button> : null}
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
    height: 60,
    width: 140,
    margin: 12,
    borderWidth: 1,
  },
});
