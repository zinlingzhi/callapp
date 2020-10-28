import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Button from 'components/Button';
import SafeAre from 'components/SafeArea';
import { setContactPhone } from 'store/actions/myContacts';
import { useAction } from 'store/actions/useAction';

import { sv, s } from 'utils/helpers';
import { formatNumber } from 'utils/string';

import { CallerContext } from '../../CallerContext';

import BaseScreen from '../BaseScreen';

import { Keypad } from './Keypad';

const { width } = Dimensions.get('screen');

const DialKeypadScreen = () => {
  const caller = useContext(CallerContext);
  const setPhone = useAction(setContactPhone);
  const navigation = useNavigation();
  const [phonenumber, setNum] = useState('');

  const handleDial = () => {
    caller.startCall({ phonenumber });
    navigation.navigate('Calling');
  };

  const handleAddToContactPress = () => {
    setPhone(phonenumber);
    navigation.navigate('AddNumber');
  };

  return (
    <BaseScreen
      header={
        <Button text="Add to contacts" onPress={handleAddToContactPress} />
      }>
      <View style={styles.content}>
        <View style={styles.dialDisplay}>
          <Text style={styles.displayText}>{formatNumber(phonenumber)}</Text>
        </View>
        <View style={styles.keypadContainer}>
          <View style={styles.underlay} />
          <View style={styles.overlay}>
            <Keypad onTap={setNum} />

            <TouchableOpacity
              disabled={!phonenumber.length}
              onPress={handleDial}
              activeOpacity={0.7}
              style={styles.button}>
              <Image
                source={require('assets/call.png')}
                style={styles.callImage}
              />
            </TouchableOpacity>
            <SafeAre />
          </View>
        </View>
      </View>
    </BaseScreen>
  );
};

export default DialKeypadScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  dialDisplay: {
    height: sv(130),
    width,
    paddingHorizontal: s(10),
    justifyContent: 'center',
  },

  displayText: {
    textAlign: 'center',
    color: '#545454',
    fontSize: s(42),
  },

  keypadContainer: {
    flex: 1,
  },

  underlay: {
    ...StyleSheet.absoluteFillObject,
    bottom: 50,
    top: 0,
    backgroundColor: '#7384BF',
    borderTopLeftRadius: sv(36),
    borderTopRightRadius: sv(36),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    top: sv(18),
    backgroundColor: '#fff',
    borderTopLeftRadius: sv(36),
    borderTopRightRadius: sv(36),
    paddingTop: sv(25),
    paddingLeft: s(16),
    paddingRight: s(16),
  },

  button: {
    width: sv(66),
    height: sv(66),
    borderRadius: sv(33),
    backgroundColor: '#3A71FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: sv(30),
  },
  callImage: { width: sv(29), height: sv(29) },
});
