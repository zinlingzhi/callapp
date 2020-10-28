import { useNavigation, StackActions } from '@react-navigation/native';

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import SaveButton from 'components/Button';
import ContactForm from 'components/ContactForm';

import Header from 'components/Header';

import SafeArea from 'components/SafeArea';
import {
  setContactPhone,
  setContactName,
  setContactState,
  addContact,
} from 'store/actions/myContacts';
import { useAction } from 'store/actions/useAction';
import { sv, uniqueId } from 'utils/helpers';
import { formatNumber } from 'utils/string';

import BaseScreen from '../BaseScreen';

import { validate } from './utils';

const AddNumberScreen = props => {
  const {
    phonenumber,
    companyname,
    region,
    city,

    list,
  } = useSelector(state => state.myContacts);

  const nav = useNavigation();

  const setPhone = useAction(setContactPhone);
  const setName = useAction(setContactName);
  const setRegion = useAction(setContactState);

  const saveContact = useAction(addContact);

  const handleAddContact = () => {
    const isValid = validate({ phonenumber, companyname, region }, list, false);

    if (!isValid) {
      return;
    }

    saveContact({
      id: uniqueId(),
      phonenumber,
      companyname,
      state: region?.value,
      city: city?.value,

      location: city ? `${city.value}, ${region.value}` : region?.label,
      region,
    });
    nav.dispatch(StackActions.popToTop());
    nav.navigate('Contacts');
  };

  return (
    <>
      <BaseScreen header={<Header title="Add contact" />}>
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <ContactForm
            phonenumber={phonenumber}
            setPhone={setPhone}
            companyname={companyname}
            setName={setName}
            region={region}
            setRegion={setRegion}
          />
          <View style={{ marginTop: 35 }}>
            <SaveButton
              onPress={handleAddContact}
              text="Save"
              style={styles.saveButton}
            />
            <SafeArea />
          </View>
        </ScrollView>
      </BaseScreen>
    </>
  );
};

export default AddNumberScreen;

const styles = StyleSheet.create({
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  saveButton: { marginBottom: 25, width: '90%', height: sv(45) },
});
