import { useNavigation } from '@react-navigation/native';

import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Button from 'components/Button';
import ContactModal from 'components/ContactModal';
import ContactsList from 'components/ContactsList';
import { s } from 'utils/helpers';

import { CallerContext } from '../../CallerContext';

import BaseScreen from '../BaseScreen';

const ContactsScreen = () => {
  const navigation = useNavigation();
  const caller = useContext(CallerContext);
  const [visible, setVisible] = useState(false);
  const [contactIndex, setContactIndex] = useState(null);
  const { list } = useSelector(state => state.myContacts);

  const handleItemPress = (item, index) => {
    setVisible(true);
    setContactIndex(index);
  };

  const handleCall = contact => {
    caller.startCall(contact);
    navigation.navigate('Calling');
  };

  const handleEditPress = ({ id }, index) => {
    navigation.navigate('EditContact', { id });
  };

  return (
    <>
      <BaseScreen
        header={
          <Button
            text="Add number"
            onPress={() => navigation.navigate('AddContact')}
          />
        }>
        {list.length ? (
          <ContactsList
            withEdit
            format
            data={list.sort((a, b) =>
              a.companyname.localeCompare(b.companyname),
            )}
            onItemPress={handleItemPress}
            onEditPress={handleEditPress}
          />
        ) : (
          <View style={styles.emptyList}>
            <Text style={{ fontSize: s(18) }}>
              Your saved contacts will be here!
            </Text>
          </View>
        )}
      </BaseScreen>
      <ContactModal
        visible={visible}
        contact={list[contactIndex]}
        onClose={() => setVisible(false)}
        onCall={handleCall}
      />
    </>
  );
};

export default ContactsScreen;
const styles = StyleSheet.create({
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
});
