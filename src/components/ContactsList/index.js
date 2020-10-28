import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import SafeArea from 'components/SafeArea';

import ListItem from './ListItem';

const ContactsList = ({ data, onItemPress, withEdit, format, onEditPress }) => {
  return (
    <FlatList
      data={data}
      style={styles.container}
      keyExtractor={(_, index) => index.toString()}
      renderItem={item => (
        <ListItem
          {...item}
          format={format}
          withEdit={withEdit}
          onItemPress={onItemPress}
          onEditPress={onEditPress}
        />
      )}
      ListFooterComponent={<SafeArea />}
    />
  );
};

export default ContactsList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
});
