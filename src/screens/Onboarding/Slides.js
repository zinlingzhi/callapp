import { useNavigation, StackActions } from '@react-navigation/native';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Animated, {
  Value,
  timing,
  Easing,
  interpolate,
  spring,
} from 'react-native-reanimated';
import {
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { s, sv, isIOS } from 'utils/helpers';

import React, {
  useRef,
  useState,
  useEffect,
} from '../../../node_modules/react';

import { SlideImageOne } from './SlideImageOne';
import { SlideImageThree } from './SlideImageThree';
import { SlideImageTwo } from './SlideImageTwo';

import { rulerHeight } from './utils';

const { width: windowWidth } = Dimensions.get('window');
const slides = [
  {
    title: 'Free Calling',
    description:
      'A large of Toll free numbers will\nallow you to make free calling\nto US and Canada.',
    imageStyle: { width: sv(382), height: sv(329) },
  },
  {
    title: 'Quick Finding',
    description:
      'The Only Toll Free Directory\non Mobile APP. This application\nwill help you quickly find the\nnumber you need.',
    imageStyle: { width: sv(352), height: sv(318) },
  },
  {
    title: '',
    description: '',
    imageStyle: { width: sv(364), height: sv(291), marginTop: sv(55) },
  },
];

const config = {
  toValue: 1,
  damping: 15,
  mass: 0.5,
  stiffness: 35,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};

const config2 = {
  duration: 750,
  toValue: 1,
  easing: Easing.inOut(Easing.ease),
};

const Button = ({ text, onPress, disabled, variant = 'text' }) => {
  const buttonStyle =
    variant === 'text' ? styles.buttonVarText : styles.buttonPrimary;
  const buttonTextStyle =
    variant === 'text'
      ? [styles.buttonText, disabled && styles.disabled]
      : styles.buttonTextPrimary;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      onPress={onPress}
      style={buttonStyle}>
      <Text style={buttonTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

const Slide = ({ anim, position, onPress }) => {
  const { title, description } = slides[position];
  const transX1 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [windowWidth, 40],
  });

  const transX2 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [windowWidth + 200, 40],
  });

  const transX3 = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [windowWidth, 0],
  });

  const AnimatedImages = {
    0: SlideImageOne,
    1: SlideImageTwo,
    2: SlideImageThree,
  };

  const SlideImage = AnimatedImages[position];
  return (
    <View style={styles.slide}>
      <View style={styles.slidesContainer}>
        {SlideImage && <SlideImage anim={anim} />}
      </View>

      <View style={styles.top} />

      <View style={styles.bottom}>
        <Animated.Text
          style={[styles.title, { transform: [{ translateX: transX1 }] }]}>
          {title}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            { transform: [{ translateX: transX2 }] },
          ]}>
          {description}
        </Animated.Text>

        {position === slides.length - 1 && (
          <Animated.View style={[{ transform: [{ translateX: transX3 }] }]}>
            <Button
              variant="primary"
              text="Query immediately"
              onPress={onPress}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const SlidesScreen = props => {
  const [position, setPosition] = useState(0);

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const anim = useRef(new Value(0)).current;
  // const entranceAnimation = timing(anim, config2);
  const exitAnimation = timing(anim, { ...config2, toValue: 0 });
  const inAnimation = spring(anim, config);
  // const outAnimation = spring(anim, { ...config, toValue: 0 });

  useEffect(() => {
    inAnimation.start();
  }, [inAnimation]);

  const handleNext = () => {
    exitAnimation.start(({ finished }) => {
      if (finished) {
        setPosition(position + 1);
      }
    });
  };

  const navHome = () => navigation.dispatch(StackActions.replace('Home'));

  return (
    <SafeAreaView style={styles.container}>
      <Slide onPress={navHome} {...{ position, anim }} />

      <View style={[styles.footer, { marginBottom: insets.bottom }]}>
        <Button text="SKIP" onPress={navHome} />

        <View style={styles.pager}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, position === index && styles.activeDot]}
            />
          ))}
        </View>

        <Button
          text="NEXT"
          onPress={handleNext}
          disabled={position === slides.length - 1}
        />
      </View>
      {/* <ScreenRuler /> */}
    </SafeAreaView>
  );
};

export default SlidesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slide: {
    flex: 1,
  },
  slidesContainer: {
    ...StyleSheet.absoluteFillObject,
    height: rulerHeight,
    bottom: 0,
  },
  top: {
    flex: 1.25,
  },
  bottom: { flex: 1 },
  title: {
    fontWeight: 'bold',
    fontSize: sv(24),
    lineHeight: sv(28),
    textTransform: 'capitalize',
    color: '#515D86',
    marginBottom: sv(25),
  },
  description: {
    fontSize: sv(21),
    lineHeight: sv(25),
    color: '#545454',
  },
  footer: {
    position: 'absolute',
    bottom: sv(20),
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: s(20),
  },
  pager: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: sv(12),
    height: sv(12),
    borderRadius: sv(6),
    backgroundColor: '#C4C4C4',
    marginHorizontal: s(7),
  },
  activeDot: {
    backgroundColor: '#7384BF',
  },

  buttonPrimary: {
    marginTop: sv(65),
    width: sv(282),
    height: sv(63),
    backgroundColor: '#3A71FF',
    borderRadius: s(30),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonVarText: {
    paddingHorizontal: s(16),
    paddingVertical: s(5),
  },
  buttonText: {
    fontWeight: isIOS ? '900' : 'bold',
    fontSize: sv(20),
    lineHeight: sv(25),
    textTransform: 'uppercase',
    color: '#6C6C6C',
  },
  buttonTextPrimary: {
    fontWeight: isIOS ? '900' : 'bold',
    fontSize: s(20),
    lineHeight: s(25),
    color: '#fff',
  },
  disabled: { color: '#ECECEC' },
});
