import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';

import TextInputMask from 'react-native-text-input-mask';

import { s } from 'utils/helpers';

import BaseField from './BaseField';

const PhoneInput = ({ value, onChangeText, label = 'Phone' }) => {
  // const input = useRef();

  return (
    <BaseField label={label}>
      <TextInputMask
        // refInput={input}
        placeholderTextColor="#b1b1b1"
        style={styles.textInput}
        placeholder="Company phone number"
        keyboardType={'phone-pad'}
        value={value}
        onChangeText={(formatted, extracted) => {
          // console.log(formatted); // +1 (123) 456-78-90
          // console.log(extracted); // 1234567890
          onChangeText && onChangeText(extracted, formatted); // 1234567890
        }}
        mask={'[0]-[000]-[000]-[0000]'}
      />
    </BaseField>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: s(18),
    color: '#545454',
  },
});
