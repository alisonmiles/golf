import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  return (
    <ImageBackground
      source={require('../../assets/golf-background.jpeg')}
      style={styles.container}
    >
      <View style={styles.logoPosition}>
        <Image
          style={styles.logo}
          source={require('../../assets/ParTee-Logo.png')}
        ></Image>
      </View>
      <View style={styles.container}>
        <FormInput
          style={styles.textInput}
          value={email}
          placeholderText='Email'
          placeholderTextColor='#FFF'
          onChangeText={(userEmail) => setEmail(userEmail)}
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
        <FormInput
          style={styles.textInput}
          value={password}
          placeholderText='Password'
          placeholderTextColor='#FFF'
          onChangeText={(userPassword) => setPassword(userPassword)}
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.button}
          buttonTitle='Login'
          onPress={() => login(email, password)}
        >
          <Text style={styles.navButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          //buttonTitle='Sign Up'
          //style={styles.navButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.navButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    flex: 0.2,
    alignItems: 'center',
    width: 300,
    margin: 20,
    borderWidth: 2,
    borderColor: 'white',
    color: 'white',
    fontSize: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 25,
    color: 'white',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    margin: 6,
  },
  logoPosition: {
    flex: 1,
  },
  button: {
    flex: 0.1,
    alignItems: 'center',
    backgroundColor: '#7fcb27',
    width: 200,
    marginTop: 20,
    padding: 15,
    borderRadius: 50,
  },
});
