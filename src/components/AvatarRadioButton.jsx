import React from 'react';
import { FlatList, View, Button, Image } from 'react-native';

export default function AvatarRadioButton({
  selectedAvatar,
  setSelectedAvatar,
}) {
  const options = [
    {
      id: 'maleGolferShaded',
      img: require('../../assets/golfer.png'),
      imgFileName: 'golfer.png',
    },
    {
      id: 'maleGolferOutlined',
      img: require('../../assets/golfer(1).png'),
      imgFileName: 'golfer(1).png',
    },
    {
      id: 'femaleGolferOutlined',
      img: require('../../assets/golfer(2).png'),
      imgFileName: 'golfer(2).png',
    },
    {
      id: 'femaleGolferShaded',
      img: require('../../assets/golfer(3).png'),
      imgFileName: 'golfer(3).png',
    },
  ];

  return (
    <FlatList
      data={options}
      numColumns={4}
      renderItem={({ item }) => (
        <View>
          <Image
            source={item.img}
            style={
              selectedAvatar === item.imgFileName
                ? {
                    width: 100,
                    height: 100,
                    resizeMode: 'contain',
                    margin: 6,
                  }
                : {
                    width: 75,
                    height: 75,
                    resizeMode: 'contain',
                    margin: 6,
                  }
            }
            keyExtractor={(item) => item.id}
          />
          <Button
            title="select"
            onPress={() => {
              setSelectedAvatar(item.imgFileName);
            }}
          />
        </View>
      )}
    />
  );
}
