import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';

import { ruler } from './utils';

const { width } = Dimensions.get('window');

export const SlideImageThree = ({ anim }) => {
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

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('assets/onboarding/slide3/2.png')}
        style={{
          opacity,
          ...ruler({
            width: 324.68,
            height: 220.32,
            anchorY: 31,
            anchorX: -5,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/1.png')}
        style={{
          transform: [{ translateX: transX1 }],
          ...ruler({
            width: 181.11,
            height: 265.65,
            anchorY: 9,
            anchorX: -15,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/3.png')}
        style={{
          transform: [{ translateX: transX3, translateY: transY3 }],
          ...ruler({
            width: 86.07,
            height: 29.63,
            anchorY: 85,
            anchorX: -125,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/4.png')}
        style={{
          transform: [{ translateX: transX4, translateY: transY2 }],
          ...ruler({
            width: 88.32,
            height: 36.83,
            anchorY: -65,
            anchorX: 75,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/5.png')}
        style={{
          transform: [{ translateX: transX3, translateY: transY3 }],
          ...ruler({
            width: 38.17,
            height: 38.17,
            anchorY: 16,
            anchorX: -139,
          }),
        }}
      />

      <Animated.Image
        source={require('assets/onboarding/slide3/6.png')}
        style={{
          transform: [{ translateX: transX2, translateY: transY2 }],
          ...ruler({
            width: 31.3,
            height: 13.97,
            anchorY: 100,
            anchorX: -49,
          }),
        }}
      />

      <Animated.Image
        source={require('assets/onboarding/slide3/7.png')}
        style={{
          transform: [{ translateX: transX4, translateY: transY4 }],
          ...ruler({
            width: 42.7,
            height: 42.7,
            anchorY: 90,
            anchorX: 100,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/8.png')}
        style={{
          transform: [{ translateX: transX4, translateY: transY4 }],
          ...ruler({
            width: 15.9,
            height: 28.65,
            anchorY: -35,
            anchorX: 130,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/9.png')}
        style={{
          opacity,
          ...ruler({
            width: 16.3,
            height: 16.3,
            anchorY: 130,
            anchorX: -30,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/10.png')}
        style={{
          opacity,
          ...ruler({
            width: 16.3,
            height: 16.3,
            anchorY: 35,
            anchorX: 75,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/11.png')}
        style={{
          opacity,
          ...ruler({
            width: 16.3,
            height: 16.3,
            anchorY: 35,
            anchorX: 149,
          }),
        }}
      />
      <Animated.Image
        source={require('assets/onboarding/slide3/11.png')}
        style={{
          opacity,
          ...ruler({
            width: 16.3,
            height: 16.3,
            anchorY: -15,
            anchorX: 49,
          }),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
