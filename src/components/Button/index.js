import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { s, sv } from 'utils/helpers';

const Button = ({ text, disabled, onPress, reversed, style, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.8}
    style={[
      styles.addButton,
      style,
      disabled && styles.disabledButton,
      reversed && styles.reversedButton,
    ]}>
    <Text
      style={[
        styles.addButtonText,
        disabled && styles.disabledText,
        reversed && styles.reversedText,
        textColor && { color: textColor },
      ]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  addButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: sv(38),
    minWidth: sv(85),
    paddingHorizontal: s(20),
    borderRadius: sv(13),
    backgroundColor: 'rgba(115, 131, 191, 1)',
  },
  disabledButton: { backgroundColor: 'rgba(115, 131, 191, 0.1)' },
  reversedButton: { backgroundColor: '#fff' },

  addButtonText: {
    color: '#fff',
    fontSize: s(18),
    fontWeight: 'bold',
  },
  disabledText: { color: '#ccc' },
  reversedText: { color: '#545454' },
});
