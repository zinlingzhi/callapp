import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { s } from 'utils/helpers';

import BaseField from './BaseField';

const InputField = ({
  label,
  placeholder,
  editable,
  value,
  onChangeText,
  onSubmitEditing,
  keyboardType,
}) => {
  return (
    <BaseField label={label}>
      <TextInput
        editable={editable}
        placeholder={placeholder || 'Company name'}
        placeholderTextColor="#b1b1b1"
        style={styles.textInput}
        onChangeText={onChangeText}
        returnKeyType="done"
        value={value}
        onSubmitEditing={onSubmitEditing}
        keyboardType={keyboardType}
      />
    </BaseField>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: s(18),
    color: '#545454',
  },
});
