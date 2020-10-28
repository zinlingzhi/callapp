import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';

import { ruler } from './utils';

const { width } = Dimensions.get('window');

export const SlideImageOne = ({ anim }) => {
  const opacity = interpolate(anim, {
    inputRange: [0.8, 1],
    outputRange: [0, 1],
  });
  const opacity1 = interpolate(anim, {
    inputRange: [0.9, 1],
    outputRange: [0, 1],
  });

  const transX1 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width * 2, 0],
  });

  const transX2 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [-width * 2, 0],
  });
  const transY = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [-width * 2, 0],
  });

  const transX3 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width * 4, 0],
  });

  const transX4 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width * 2, 0],
  });
  const transY4 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width / 2, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('assets/onboarding/slide1/6.png')}
        style={{
          opacity,
          ...ruler({
            width: 325.94,
            height: 242.09,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide1/1.png')}
        style={{
          transform: [{ translateX: transX1 }],
          ...ruler({
            width: 205.4,
            height: 200.06,
            anchorY: -32,
            anchorX: 8,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide1/2.png')}
        style={{
          transform: [{ translateX: transX2, translateY: transY }],
          ...ruler({
            width: 116.71,
            height: 48.74,
            anchorX: -100,
            anchorY: -100,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide1/3.png')}
        style={{
          opacity: opacity1,
          ...ruler({
            width: 31,
            height: 36,
            anchorX: 65,
            anchorY: -70,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide1/4.png')}
        style={{
          transform: [{ translateX: transX3 }],
          ...ruler({
            width: 98.87,
            height: 33.98,
            anchorX: 113,
            anchorY: 45,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide1/5.png')}
        style={{
          opacity,
          transform: [{ translateX: transX4, translateY: transY4 }],
          ...ruler({
            width: 25,
            height: 25,
            anchorX: 25,
            anchorY: 95,
          }),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
});
