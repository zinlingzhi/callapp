import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  timing,
  spring,
  Value,
  Easing,
} from 'react-native-reanimated';

import { s, isIOS } from 'utils/helpers';

const bg2 = require('assets/background.png');
const bg1 = require('assets/background1.png');
const Logo = require('assets/logo.png');

const config = {
  toValue: 1,
  damping: 10,
  mass: 1,
  stiffness: 75,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

const config2 = {
  duration: 500,
  toValue: 1,
  easing: Easing.inOut(Easing.ease),
};

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const animEnter = useRef(new Value(0)).current;
  const animExit = useRef(new Value(0)).current;
  const springAnimation = spring(animEnter, config);
  const timingAnimation = timing(animExit, config2);

  useEffect(() => {
    springAnimation.start();
  }, [springAnimation]);

  const handleNextPress = () => {
    timingAnimation.start(({ finished }) => {
      if (finished) {
        navigation.navigate('Slides');
      }
    });
  };

  const scale = interpolate(animEnter, {
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });

  const translateY = interpolate(animEnter, {
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const opacity = interpolate(animEnter, {
    inputRange: [0.5, 1],
    outputRange: [0, 1],
  });

  const mainOpacity = interpolate(animExit, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <Animated.View style={[styles.container, { opacity: mainOpacity }]}>
      <Animated.Image source={bg1} style={[styles.bgImage]} />
      <Animated.Image source={bg2} style={[styles.bgImage, { opacity }]} />
      <View style={styles.logoContainer}>
        <Animated.Image source={Logo} style={[ styles.logo, { transform: [{ scale, translateY }] } ]}/>
      </View>

      <Animated.View style={[styles.button, { opacity }]}>
        <TouchableOpacity onPress={handleNextPress} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7384BF',
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '24%',
    width: s(254),
    height: s(63),
    backgroundColor: '#FFFFFF',
    borderRadius: s(30),
  },
  buttonText: {
    fontSize: s(36),
    fontWeight: isIOS ? '900' : 'bold',
    color: '#7384BF',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: s(163),
    height: s(124),
    resizeMode: 'contain',
  },
});
