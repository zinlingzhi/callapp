import moment from 'moment';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { sv, s } from 'utils/helpers';
import { getDuration, formatNumber } from 'utils/string';

const failIcon = require('assets/mdi_phone-cancel.png');
const successIcon = require('assets/mdi_phone-talk.png');

const ListItem = ({ item, index, onItemPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onItemPress(item)}
      style={styles.container}>
      <View style={styles.wrap}>
        {!!item.companyname && (
          <Text style={styles.name}>{item.companyname}</Text>
        )}
        <View style={styles.phoneRow}>
          <View style={styles.row}>
            <Image
              source={item.connected ? successIcon : failIcon}
              style={styles.callIcon}
            />
            <Text style={styles.phone}>{formatNumber(item.phonenumber)}</Text>
          </View>
          <Text style={styles.phone}>{getDuration(item.duration)}</Text>
        </View>
        <Text style={styles.phone}>{moment(item.date).fromNow()}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    minHeight: sv(76),
    borderTopWidth: 1,
    borderColor: '#ececec',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: s(16),
    paddingVertical: s(15),
  },
  wrap: { flex: 1 },
  name: {
    fontSize: s(18),
    fontWeight: 'bold',
    color: '#545454',
    marginBottom: 8,
  },
  phoneRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(5),
    marginBottom: s(5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phone: {
    fontSize: s(14),
    color: '#b6b6b6',
  },
  callButton: {
    width: sv(48),
    height: sv(48),
    backgroundColor: '#7384BF',
    borderRadius: sv(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  callIcon: { width: s(18), height: s(18), marginRight: 5 },
});
