import MaskedView from '@react-native-community/masked-view';
import React from 'react';
import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
  call,
  block,
  useCode,
} from 'react-native-reanimated';
import { useValue, translateZ } from 'react-native-redash';

import { VISIBLE_ITEMS, ITEM_HEIGHT } from './Constants';
import GestureHandler from './GestureHandler';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: width,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: 'hidden',
    backgroundColor: '#F4F4F4',
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  maskSecondary: {
    height: ITEM_HEIGHT * 2,
    backgroundColor: 'rgba(115, 132, 191, 0.3)',
  },
  maskMain: { height: ITEM_HEIGHT, backgroundColor: '#242424' },

  borderLines: {
    borderColor: 'rgba(0, 0, 0, 0.04)',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    top: ITEM_HEIGHT * 2,
    height: ITEM_HEIGHT,
  },
});

const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

const Picker = ({ values, defaultValue, onChange }) => {
  if (!values.length) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <Text style={[styles.label, { color: '#545454' }]}>No data</Text>
      </View>
    );
  }
  const translateY = useValue(0);
  const maskElement = (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {values.map((v, i) => {
        const y = interpolate(
          divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
          {
            inputRange: [i - RADIUS_REL, i, i + RADIUS_REL],
            outputRange: [-1, 0, 1],
            extrapolate: Extrapolate.CLAMP,
          },
        );
        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
        const transform = [
          { perspective },
          { rotateX },
          translateZ(perspective, z),
        ];
        return (
          <Animated.View key={v.value} style={[styles.item, { transform }]}>
            <Text style={styles.label}>{v.label}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <MaskedView {...{ maskElement }}>
        <View style={styles.maskSecondary} />
        <View style={styles.maskMain} />
        <View style={styles.maskSecondary} />
      </MaskedView>
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.borderLines} />
      </View>
      <GestureHandler
        max={values.length}
        value={translateY}
        callback={value => {
          if (typeof onChange === 'function') {
            onChange(values[value], value);
          }
        }}
        {...{ defaultValue }}
      />
    </View>
  );
};

export default Picker;
