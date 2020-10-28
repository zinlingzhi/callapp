import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { s } from 'utils/helpers';

import BaseField from './BaseField';

const PickerField = ({
  label,
  placeholder,
  selected,
  onToggle,
  active,
  keyID,
}) => {
  return (
    <BaseField label={label}>
      <TouchableOpacity
        onPress={() => onToggle && onToggle(keyID)}
        activeOpacity={0.8}
        style={styles.row}>
        <Text style={[styles.placeholderText, selected && styles.selectedText]}>
          {selected || placeholder}
        </Text>
        <Image
          source={require('assets/arrow.png')}
          style={[
            styles.icon,
            { transform: [{ rotate: active ? '90deg' : '-90deg' }] },
          ]}
        />
      </TouchableOpacity>
    </BaseField>
  );
};

export default PickerField;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  placeholderText: { fontSize: s(18), color: '#b1b1b1' },
  selectedText: { fontSize: s(18), color: '#545454' },

  icon: {
    width: s(42),
    height: s(42),
    tintColor: '#7384BF',
  },
});
