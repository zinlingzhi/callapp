import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { s, sv } from 'utils/helpers';

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require('assets/arrow.png')} style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    position: 'absolute',
    color: '#545454',
    fontSize: s(22),
    textAlign: 'center',
    left: 0,
    right: 0,
  },
  arrowIcon: { width: sv(42), height: sv(42), marginLeft: s(8) },
});
