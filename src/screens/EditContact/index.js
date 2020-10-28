import {
  useRoute,
  useNavigation,
  StackActions,
} from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';

import Button from 'components/Button';
import ContactForm from 'components/ContactForm';

import Header from 'components/Header';

import SafeArea from 'components/SafeArea';

import { editMyContact, deleteMyContact } from 'store/actions/myContacts';

import { useAction } from 'store/actions/useAction';
import { sv, uniqueId } from 'utils/helpers';
import { formatNumber } from 'utils/string';

import { validate } from '../AddNumber/utils';
import BaseScreen from '../BaseScreen';

const EditContactScreen = props => {
  const route = useRoute();
  const nav = useNavigation();

  const { list } = useSelector(state => state.myContacts);
  const contact = list.find(item => item.id === route.params.id);

  const [phone, setPhone] = useState(contact?.phonenumber);
  const [name, setName] = useState(contact?.companyname);
  const [region, setRegion] = useState(contact?.region);

  const saveContact = useAction(editMyContact);
  const deleteContact = useAction(deleteMyContact);

  const handleSaveContact = () => {
    const isValid = validate(
      { phonenumber: phone, companyname: name, region },
      list.filter(item => item.id !== contact?.id),
      false,
    );

    if (!isValid) {
      return;
    }

    saveContact({
      ...contact,
      phonenumber: phone,
      companyname: name,
      state: region?.value,
      location: region?.label,
      region,
    });

    nav.goBack();
  };

  const handleDeleteContact = () => {
    deleteContact({ id: contact.id });
    nav.goBack();
  };

  const prompDelete = () =>
    Alert.alert(
      'Delete contact?',
      'Are you sure you want to delete contact',
      [
        { text: 'Yes', onPress: handleDeleteContact },
        { text: 'No', style: 'cancel' },
      ],
      { cancelable: true },
    );

  return (
    <BaseScreen header={<Header title="Edit contact" />}>
      <ScrollView contentContainerStyle={styles.contentStyle}>
        <ContactForm
          phonenumber={phone}
          setPhone={setPhone}
          companyname={name}
          setName={setName}
          region={region}
          setRegion={setRegion}
        />
        <View style={{ marginTop: 35 }}>
          <Button
            onPress={prompDelete}
            text="Delete"
            textColor="#f56342"
            style={styles.button}
          />
          <Button
            onPress={handleSaveContact}
            text="Save"
            style={styles.button}
          />
          <SafeArea />
        </View>
      </ScrollView>
    </BaseScreen>
  );
};

export default EditContactScreen;

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  button: { marginBottom: 25, width: '50%', height: sv(45) },
});
