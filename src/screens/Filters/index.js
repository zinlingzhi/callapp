import React from 'react';
import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

import InputField from 'components/Fields/InputField';
import TouchableField from 'components/Fields/TouchableField';
import Header from 'components/Header';

import Modal from 'components/PickerList/AnimatedModal';
import CityPicker from 'components/PickerList/CityPicker';
import StatePicker from 'components/PickerList/StatePicker';
import SafeArea from 'components/SafeArea';

import { setCompanyName, setStateRegion, setCity } from 'store/actions/search';
import { useAction } from 'store/actions/useAction';

import { sv, s, isIOS } from 'utils/helpers';

import BaseScreen from '../BaseScreen';

const CITY_PICKER = 'cityPicker';
const STATE_PICKER = 'statePicker';

const FiltersScreen = () => {
  const [visible, setVisible] = useState(null);

  const { companyName, region, city } = useSelector(state => state.search);
  const setName = useAction(setCompanyName);
  const setRegion = useAction(setStateRegion);
  const selectCity = useAction(setCity);

  const hidePicker = () => setVisible(null);

  const handleStateSelect = ({ item, index }) => {
    setRegion({ ...item, index });
    hidePicker();
    setTimeout(() => {
      setVisible(CITY_PICKER);
    }, 300);
  };

  const handleCitySelect = ({ item, index }) => {
    selectCity({ ...item, index });

    setTimeout(() => {
      hidePicker();
    }, 300);
  };

  const handleToggleCity = keyID => {
    if (region) {
      setVisible(keyID);
    } else {
      Alert.alert('', 'Please select the State first!', [
        { text: 'Ok', onPress: () => setVisible(STATE_PICKER) },
        { text: 'Cancel' },
      ]);
    }
  };

  return (
    <>
      <BaseScreen header={<Header title={'Filters'} />}>
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <View style={styles.container}>
            <InputField
              label="Company"
              onChangeText={setName}
              value={companyName}
            />
            <TouchableField
              label="State"
              placeholder="Select state"
              keyID={STATE_PICKER}
              active={visible === STATE_PICKER}
              selected={region?.label}
              onToggle={setVisible}
            />

            <TouchableField
              selected={city?.label}
              keyID={CITY_PICKER}
              onToggle={handleToggleCity}
              label="City"
              active={visible}
              placeholder="Select city"
            />
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.buttonText}>Search</Text>
            </TouchableOpacity>
            <SafeArea />
          </View>
        </ScrollView>
      </BaseScreen>

      <Modal visible={!!visible} onClose={hidePicker}>
        <StatePicker
          visible={visible === STATE_PICKER}
          onClose={hidePicker}
          onSelect={handleStateSelect}
          selectedIndex={region?.index}
        />

        <CityPicker
          visible={visible === CITY_PICKER}
          region={region?.label}
          onClose={hidePicker}
          onSelect={handleCitySelect}
          selectedIndex={city?.index}
        />
      </Modal>
    </>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  footer: { marginTop: 50 },
  searchButton: {
    backgroundColor: '#3A71FF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: sv(30),
    height: sv(53),
    width: sv(254),
    borderRadius: sv(57),
  },
  buttonText: {
    fontSize: s(20),
    color: 'white',
    fontWeight: isIOS ? '900' : 'bold',
  },
});
