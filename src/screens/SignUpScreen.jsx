import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  return (
    <ImageBackground
      source={require('../../assets/golfBackground.jpg')}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>
        <FormInput
          value={email}
          placeholderText="Email"
          onChangeText={(userEmail) => setEmail(userEmail)}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <FormInput
          value={password}
          placeholderText="Password"
          onChangeText={(userPassword) => setPassword(userPassword)}
          secureTextEntry={true}
        />
        <FormButton
          buttonTitle="Signup"
          onPress={() => {
            register(email, password);
          }}
        />
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  inputField: {
    backgroundColor: '#FFF',
  },
});
