import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';

import { sv, s, isAndroid, isIOS } from 'utils/helpers';

const ListItem = ({
  item,
  index,
  onItemPress,
  withEdit,
  format,
  onEditPress,
}) => (
  <View style={styles.container}>
    <View style={styles.wrap}>
      <Text style={styles.name}>{item.companyname}</Text>
      {format ? (
        <TextInputMask
          editable={false}
          style={[styles.phone, isIOS && { marginTop: s(5) }]}
          value={item.phonenumber || ''}
          mask={'[0]-[000]-[000]-[0000]'}
        />
      ) : (
        <Text style={[styles.phone, isAndroid && { marginTop: s(5) }]}>
          {item.phonenumber}
        </Text>
      )}
    </View>
    {withEdit && (
      <TouchableOpacity
        onPress={() => onEditPress && onEditPress(item, index)}
        activeOpacity={0.8}
        style={[styles.callButton, { marginRight: 15 }]}>
        <Image
          source={require('assets/pencil-create.png')}
          style={[styles.callIcon, { tintColor: 'white' }]}
        />
      </TouchableOpacity>
    )}
    <TouchableOpacity
      onPress={() => onItemPress(item, index)}
      activeOpacity={0.8}
      style={styles.callButton}>
      <Image source={require('assets/call.png')} style={styles.callIcon} />
    </TouchableOpacity>
  </View>
);

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
  },
  phone: {
    padding: 0,
    includeFontPadding: false,
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
  callIcon: {
    width: sv(23),
    height: sv(23),
  },
});
