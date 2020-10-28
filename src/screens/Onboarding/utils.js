import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { sv } from 'utils/helpers';
import { getStatusBarHeight } from 'utils/iphoneX';

export const rulerHeight =
  Dimensions.get('screen').height - getStatusBarHeight(true);
export const rulerWidth = Dimensions.get('screen').width;
export const ruler = ({
  width = 1,
  height = 1,
  anchorX = 0,
  anchorY = 0,
} = {}) => {
  const center = { top: rulerHeight * 0.28, left: rulerWidth / 2 };
  const targetWidth = sv(width);
  const targetHeight = sv(height);
  return {
    left: center.left - targetWidth / 2 + sv(anchorX),
    top: center.top - targetHeight / 2 + sv(anchorY),
    width: targetWidth,
    height: targetHeight,
    position: 'absolute',
  };
};

export const ScreenRuler = () => (
  <View pointerEvents="none" style={rulerStyles.ruler}>
    <View style={rulerStyles.h} />
    <View style={rulerStyles.v} />
  </View>
);

const rulerStyles = StyleSheet.create({
  ruler: {
    ...StyleSheet.absoluteFillObject,
    height: rulerHeight,
    marginTop: getStatusBarHeight(true),
  },
  h: {
    height: rulerHeight,
    width: 1,
    backgroundColor: 'red',
    position: 'absolute',
    left: '50%',
  },
  v: {
    position: 'absolute',
    height: 1,
    top: rulerHeight * 0.28,
    width: rulerWidth,
    backgroundColor: 'red',
  },
});
