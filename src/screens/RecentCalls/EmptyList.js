import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

const failIcon = require('assets/mdi_phone-cancel.png');
const successIcon = require('assets/mdi_phone-talk.png');

const EmptyList = ({ allCalls }) => {
  const title = allCalls
    ? 'All your dialed numbers will appear here'
    : 'Your dialed numbers will appear here';
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={successIcon} style={styles.icon} />
        {allCalls && <Image source={failIcon} style={styles.icon} />}
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  iconContainer: { flexDirection: 'row', marginBottom: 10 },
  icon: { width: 35, height: 35 },
  text: { fontSize: 16 },
});
