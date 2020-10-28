/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  Clock,
  useCode,
  block,
  interpolate,
  Easing,
  set,
} from 'react-native-reanimated';
import { loop } from 'react-native-redash';
import { useMemoOne } from 'use-memo-one';

import { sv, s } from 'utils/helpers';

const acceptIcon = require('assets/accept_call.png');
const declineIcon = require('assets/decline_call.png');
const keyboard = require('assets/keyboard.png');
const micInactive = require('assets/mic_inactive.png');
const speakerActive = require('assets/speaker.png');
const userIcon = require('assets/user2.png');

const activeColor = '#82EC80';
const getColor = light => {
  return light ? 'white' : '#7384BF';
};
const ToggleButton = ({
  tintColor,
  light,
  icon,
  text,
  onPress,
  iconStyle,
  style,
  disabled,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    disabled={disabled}
    style={[styles.toggleButton, style]}>
    <Image
      source={icon}
      style={{
        tintColor: tintColor || getColor(light),
        width: sv(40),
        height: sv(40),
        ...iconStyle,
      }}
    />
    <Text style={[styles.toggleText, { color: getColor(light) }]}>{text}</Text>
  </TouchableOpacity>
);

export const ButtonMute = ({ disabled, light, onPress, active }) => {
  return (
    <View style={{ flex: 1 }}>
      <ToggleButton
        disabled={disabled}
        onPress={onPress}
        light={light}
        icon={micInactive}
        text={'Mute'}
        iconStyle={styles.micIcon}
        tintColor={active && activeColor}
      />
    </View>
  );
};

export const ButtonHandsfree = ({ disabled, active, light, onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <ToggleButton
        disabled={disabled}
        onPress={onPress}
        light={light}
        icon={speakerActive}
        text={'Hands-free'}
        iconStyle={styles.speakerIcon}
        tintColor={active && activeColor}
      />
    </View>
  );
};

export const ButtonKeyboard = ({ disabled, active, light, onPress }) => {
  return (
    <View style={{ flex: 1 }}>
      <ToggleButton
        disabled={disabled}
        onPress={onPress}
        light={light}
        icon={keyboard}
        text={active ? 'Hide' : 'Keyboard'}
        iconStyle={styles.keyboardIcon}
        tintColor={active && activeColor}
      />
    </View>
  );
};

export const ViewContactButton = ({ onPress }) => {
  return (
    <ToggleButton
      onPress={onPress}
      icon={userIcon}
      text={'View contact'}
      iconStyle={styles.userIcon}
    />
  );
};

export const PhoneButton = ({ decline, onPress }) => {
  const { progress, clock } = useMemoOne(
    () => ({
      progress: new Animated.Value(0),
      clock: new Clock(),
    }),
    [],
  );

  const loopConfig = {
    clock,
    duration: 1000,
    easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
    boomerang: true,
  };

  useCode(
    () =>
      block([
        // cond(and(not(clockRunning(clock)), isPlaying), startClock(clock)),
        // cond(and(clockRunning(clock), not(isPlaying)), stopClock(clock)),
        set(progress, loop(loopConfig)),
      ]),
    [],
  );

  const scale = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0.7, 1],
  });

  return (
    <View style={styles.phoneButtonContainer}>
      <Animated.View
        style={[styles.animatedView, { transform: [{ scale }] }]}
      />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.phoneButton}>
        <Image
          source={decline ? declineIcon : acceptIcon}
          style={styles.callIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  phoneButtonContainer: {
    width: sv(98),
    height: sv(98),
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneButton: {
    width: sv(70),
    height: sv(70),
    borderRadius: sv(35),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callIcon: {
    width: sv(49),
    height: sv(49),
  },
  animatedView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(190, 201, 231, 0.27)',
    width: sv(98),
    height: sv(98),
    borderRadius: sv(49),
  },

  toggleButton: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: sv(68),
  },
  toggleText: {
    fontSize: s(14),
  },

  micIcon: { width: sv(40), height: sv(40) },
  speakerIcon: { width: sv(43), height: sv(36.4), marginTop: s(3) },
  keyboardIcon: { width: sv(44), height: sv(45) },
  userIcon: {
    width: sv(46),
    height: sv(45.89),
  },
});
