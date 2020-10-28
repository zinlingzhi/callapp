import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { s } from 'utils/helpers';
import { formatNumber } from 'utils/string';

const CallingNumber = ({ active, name, number }) => {
  return (
    <View style={styles.container}>
      <Text
        numberOfLines={1}
        style={[styles.nameText, active && styles.activeText]}>
        {name}
      </Text>

      <Text style={[styles.phoneText, active && styles.activeText]}>
        {formatNumber(number)}
      </Text>
    </View>
  );
};

export default CallingNumber;

const styles = StyleSheet.create({
  container: { flex: 1 },
  nameText: {
    fontSize: s(24),
    color: '#545454',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: s(19),
    paddingHorizontal: s(20),
  },
  phoneText: {
    fontSize: s(24),
    color: '#545454',
    textAlign: 'center',
  },
  activeText: { color: 'white' },
});
