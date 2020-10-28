import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import InputField from 'components/Fields/InputField';
import PhoneInput from 'components/Fields/PhoneInput';
import TouchableField from 'components/Fields/TouchableField';

import Modal from 'components/PickerList/AnimatedModal';
import StatePicker from 'components/PickerList/StatePicker';

const STATE_PICKER = 'statePicker';

const ContactForm = ({
  phonenumber,
  setPhone,
  companyname,
  setName,
  region,
  setRegion,
}) => {
  const [visible, setVisible] = useState(null);

  const hidePicker = () => setVisible(null);
  const handleStateSelect = state => {
    if (setRegion) {
      setRegion(state ? { ...state.item, index: state.index } : null);
    }

    setTimeout(() => {
      hidePicker();
    }, 300);
  };
  return (
    <>
      <View style={styles.container}>
        <PhoneInput value={phonenumber} onChangeText={setPhone} />
        {/* <InputField
          label="Phone"
          placeholder="Company phone number"
          keyboardType={'phone-pad'}
          value={phonenumber}
          onChangeText={setPhone}
        /> */}
        <InputField
          label="Name"
          onChangeText={setName}
          value={companyname}
          onSubmitEditing={() => {
            if (!region) {
              setVisible(STATE_PICKER);
            }
          }}
        />
        <TouchableField
          label="State"
          placeholder="Select state"
          keyID={STATE_PICKER}
          active={visible === STATE_PICKER}
          selected={region?.label}
          onToggle={setVisible}
        />
      </View>
      <Modal visible={!!visible} onClose={hidePicker}>
        <StatePicker
          visible={visible === STATE_PICKER}
          onClose={hidePicker}
          onSelect={handleStateSelect}
          selectedIndex={region?.index}
          onReset={() => handleStateSelect(null)}
        />
      </Modal>
    </>
  );
};

export default ContactForm;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
