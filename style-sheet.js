import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeHeader: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    color: 'green',
    fontSize: 30,
  },
  welcomeInput: {
    top: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '20%',
    height: '10%',
    marginBottom: 10,
  },
  // homeHeader: {
  //   flex: 1,
  //   position: 'absolute',
  //   top: 20,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  homeText: {
    textAlign: 'center',
    color: 'green',
    fontSize: 30,
  },
});

export default styles;
