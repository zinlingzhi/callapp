import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeArea = ({ position, style }) => {
  const insets = useSafeAreaInsets();
  const height = insets[position] || insets.bottom;
  return <View style={{ height, ...style }}>{/*  */}</View>;
};

export default SafeArea;
