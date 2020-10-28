/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Sound from 'react-native-sound';

import { sv, s } from 'utils/helpers';

const { width } = Dimensions.get('screen');

const PADDING = s(16);
const PAD_WIDTH = (width - PADDING * 2) / 3;

const beep = new Sound(require('../../assets/beep1.wav'), '', error => {
  console.log('Sound', error);
});

const Row = ({ children, dtmf }) => (
  <View style={[styles.row, dtmf && { height: styles.row.height - s(5) }]}>
    {children}
  </View>
);

const Pad = ({
  children,
  sign,
  firstRow,
  lastRow,
  firstCol,
  lastCol,
  onPress,
  onPressed,
  dtmf,
}) => {
  const [isPressed, setPressed] = useState(false);
  const handlePressIn = () => {
    setPressed(true);
    if (onPressed) {
      onPressed();
    }
  };

  const handleOnPress = () => {
    if (onPress) {
      onPress(sign);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={() => setPressed(false)}
      onPress={handleOnPress}>
      <View
        style={[
          styles.pad,
          {
            borderColor: dtmf ? '#A8B3D9' : '#ececec',
            width: dtmf ? PAD_WIDTH - s(15) : PAD_WIDTH,
            paddingLeft: firstCol ? s(10) : 0,
            paddingRight: lastCol ? s(10) : 0,
            borderBottomWidth: lastRow ? 0 : 1,
            borderRightWidth: lastCol ? 0 : 1,
          },
        ]}>
        {isPressed && <View style={styles.padUnderlay} />}
        {children || (
          <Text
            style={[
              styles.sign,
              dtmf && { color: '#FFFFFF', fontSize: sv(36) },
            ]}>
            {sign}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const Keypad = ({ dtmf, onTap = () => {}, onKeyPress = () => {} }) => {
  const [dialNum, setDialNum] = useState('');

  const handleTap = sign => {
    if (sign) {
      onKeyPress(sign);
      if (dialNum.length === 11) {
        return;
      }
      beep.setVolume(0.3);
      beep.play();
      const nextNum = dialNum.concat(sign);
      setDialNum(nextNum);
      onTap(nextNum);
      return;
    } else if (!sign && dialNum.length) {
      const lastRemoved = dialNum.slice(0, -1);
      setDialNum(lastRemoved);
      onTap(lastRemoved);
    }
  };

  return (
    <View style={styles.container}>
      <Row dtmf={dtmf} larger>
        <Pad dtmf={dtmf} sign="1" firstRow firstCol onPress={handleTap} />
        <Pad dtmf={dtmf} sign="2" firstRow onPress={handleTap} />
        <Pad dtmf={dtmf} sign="3" firstRow lastCol onPress={handleTap} />
      </Row>
      <Row dtmf={dtmf}>
        <Pad dtmf={dtmf} sign="4" firstCol onPress={handleTap} />
        <Pad dtmf={dtmf} sign="5" onPress={handleTap} />
        <Pad dtmf={dtmf} sign="6" lastCol onPress={handleTap} />
      </Row>
      <Row dtmf={dtmf}>
        <Pad dtmf={dtmf} sign="7" firstCol onPress={handleTap} />
        <Pad dtmf={dtmf} sign="8" onPress={handleTap} />
        <Pad dtmf={dtmf} sign="9" lastCol onPress={handleTap} />
      </Row>
      <Row dtmf={dtmf} larger>
        <Pad dtmf={dtmf} sign="+" lastRow firstCol onPress={handleTap} />
        <Pad dtmf={dtmf} sign="0" lastRow onPress={handleTap} />
        {dtmf ? (
          <Pad dtmf={dtmf} sign="#" lastRow onPress={handleTap} />
        ) : (
          <Pad lastRow lastCol onPressed={handleTap}>
            <Image source={require('assets/arrow1.png')} style={styles.arrow} />
          </Pad>
        )}
      </Row>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},

  row: {
    flexDirection: 'row',
    height: sv(75),
  },

  pad: {
    borderColor: '#ececec',
    height: '100%',
    width: PAD_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padUnderlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(115, 131, 191,0.1)',
  },

  sign: {
    fontSize: sv(46),
    color: '#7384BF',
  },

  arrow: { width: sv(40), height: sv(40) },
});
