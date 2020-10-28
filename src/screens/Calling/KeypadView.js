import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { s } from 'utils/helpers';

import { Keypad } from '../Dialing/Keypad';

const height = Dimensions.get('window').height;

const KeypadModal = ({ dtmfNumber, onKeyPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputDisplay}>
        <Text style={styles.text}>{dtmfNumber}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.keypad}>
        <Keypad dtmf onKeyPress={onKeyPress} />
      </View>
      <View style={styles.separator} />
    </View>
  );
};

export default KeypadModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#93A2D0',
    borderTopLeftRadius: 46,
    borderTopRightRadius: 46,
  },
  inputDisplay: {
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  text: {
    color: 'white',
    fontSize: s(38),
    fontWeight: 'bold',
  },
  keypad: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: '#A8B3D9',
    opacity: 0.5,
    alignSelf: 'center',
  },
});
