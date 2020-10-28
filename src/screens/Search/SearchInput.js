import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import { sv, s } from 'utils/helpers';

const SearchInput = ({
  onSearch,
  onSettings,
  onChangeText,
  value,
  onSubmitEditing,
  selectedFilter,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onSearch}
        activeOpacity={0.8}
        style={styles.searchButton}>
        <Image
          source={require('assets/search.png')}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder={'Company name'}
        placeholderTextColor="#b1b1b1"
        returnKeyType="done"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
      <TouchableOpacity
        onPress={onSettings}
        activeOpacity={0.8}
        style={styles.settingsButton}>
        {typeof selectedFilter === 'string' ? (
          <Text style={{ color: 'white', fontSize: s(17), fontWeight: 'bold' }}>
            {selectedFilter}
          </Text>
        ) : (
          <Image
            source={require('assets/settings.png')}
            style={styles.settingsIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    height: sv(45),
    width: width - s(32),
    borderWidth: 2,
    borderRadius: s(11),
    borderColor: 'rgba(115, 132, 191, 0.48)',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: '100%',
    fontSize: s(18),
    color: '#545454',
    padding: 0,
    includeFontPadding: false,
  },
  searchIcon: {
    width: sv(30),
    height: sv(30),
  },
  searchButton: {
    paddingLeft: s(11),
    paddingRight: s(15),
  },
  settingsIcon: {
    width: sv(38),
    height: sv(38),
  },
  settingsButton: {
    width: sv(45),
    height: sv(45),
    backgroundColor: '#7384BF',
    borderRadius: s(11),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: s(10),
  },
});
