import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { s } from 'utils/helpers';

const BaseField = ({ label, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.field}>{children}</View>
    </View>
  );
};

export default BaseField;

const styles = StyleSheet.create({
  container: {
    marginTop: s(20),
    marginHorizontal: s(16),
  },
  label: {
    fontSize: s(18),
    fontWeight: 'bold',
    color: '#303030',
    marginBottom: s(16),
  },
  field: {
    height: s(45),
    borderWidth: 1,
    borderColor: '#ececec',
    borderRadius: s(9),
    paddingLeft: s(13),
    paddingRight: s(5),
  },
});
