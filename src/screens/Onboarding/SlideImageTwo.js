import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';

import { ruler } from './utils';

const { width } = Dimensions.get('window');

export const SlideImageTwo = ({ anim }) => {
  const opacity = interpolate(anim, {
    inputRange: [0.8, 1],
    outputRange: [0, 1],
  });
  const transX1 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const transX2 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [-width * 2, 0],
  });
  const transY2 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [-width * 2, 0],
  });

  const transX3 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [-width, 0],
  });
  const transY3 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const transX4 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width, 0],
  });
  const transY4 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width, 0],
  });

  const transX5 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [width, 0],
  });
  const transY5 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [-width, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('assets/onboarding/slide2/4.png')}
        style={{
          opacity,
          ...ruler({
            width: 322.8,
            height: 251.6,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide2/1.png')}
        style={{
          transform: [{ translateX: transX1 }],
          ...ruler({
            width: 246.7,
            height: 204.38,
            anchorY: -52,
            anchorX: -3,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide2/2.png')}
        style={{
          transform: [{ translateX: transX2, translateY: transY2 }],
          ...ruler({
            width: 86.07,
            height: 29.63,
            anchorY: -128,
            anchorX: -78,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide2/6.png')}
        style={{
          transform: [{ translateX: transX2, translateY: transY2 }],
          ...ruler({
            width: 29.04,
            height: 12.97,
            anchorY: -78,
            anchorX: -128,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide2/3.png')}
        style={{
          transform: [{ translateX: transX3, translateY: transY3 }],
          ...ruler({
            width: 86.07,
            height: 29.63,
            anchorY: 78,
            anchorX: -73,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide2/5.png')}
        style={{
          transform: [{ translateX: transX3, translateY: transY3 }],
          ...ruler({
            width: 29.04,
            height: 12.97,
            anchorY: 50,
            anchorX: -112,
          }),
        }}
      />

      <Animated.Image
        source={require('assets/onboarding/slide2/7.png')}
        style={{
          transform: [{ translateX: transX4, translateY: transY4 }],
          ...ruler({
            width: 35.41,
            height: 35.53,
            anchorY: 52,
            anchorX: 142,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide2/8.png')}
        style={{
          transform: [{ translateX: transX4, translateY: transY4 }],
          ...ruler({
            width: 14.5,
            height: 14.5,
            anchorY: 78,
            anchorX: 65,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide2/9.png')}
        style={{
          transform: [{ translateX: transX5, translateY: transY5 }],
          ...ruler({
            width: 15.5,
            height: 15.5,
            anchorY: -115,
            anchorX: 115,
          }),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
