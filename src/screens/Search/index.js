import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

import ContactModal from 'components/ContactModal';

import ListItem from 'components/ContactsList/ListItem';
import Modal from 'components/PickerList/AnimatedModal';
import StatePicker from 'components/PickerList/StatePicker';
import SafeArea from 'components/SafeArea';
import { loadIndustries } from 'store/actions/myContacts';
import {
  loadCompanies,
  loadMoreCompanies,
  setCompanyName,
  setStateRegion,
} from 'store/actions/search';

import { useAction } from 'store/actions/useAction';

import { s } from 'utils/helpers';

import { CallerContext } from '../../CallerContext';

import BaseScreen from '../BaseScreen';

import SearchInput from './SearchInput';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}

const CONTACT = 'contact';
const STATE_PICKER = 'statePicker';

const SearchScreen = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [contactIndex, setContactIndex] = useState(null);
  const caller = useContext(CallerContext);
  const setName = useAction(setCompanyName);
  const setRegion = useAction(setStateRegion);
  const getCompanies = useAction(loadCompanies);
  const getMoreCompanies = useAction(loadMoreCompanies);
  const getIndustries = useAction(loadIndustries);

  const {
    companyName,
    region,
    data,
    loading,
    loadingMore,
    total,
    offset,
    limit,
  } = useSelector(state => state.search);

  const { industryLoading, industries } = useSelector(
    state => state.myContacts,
  );

  const debouncedSearch = useDebounce(companyName, 500);

  useEffect(() => {
    getIndustries();
  }, [getIndustries]);

  useEffect(() => {
    getCompanies({ companyname: debouncedSearch, state: region?.value });
  }, [debouncedSearch, getCompanies, region]);

  const hidePicker = () => setVisible(null);

  const handleItemPress = (item, index) => {
    setVisible(CONTACT);
    setContactIndex(index);
  };

  const handleCall = contact => {
    caller.startCall(contact);
    navigation.navigate('Calling');
  };

  const handleStateSelect = state => {
    setRegion(state ? { ...state.item, index: state.index } : null);

    setTimeout(() => {
      hidePicker();
    }, 300);
  };

  const handleLoadMore = () => {
    if (loading || loadingMore) {
      return;
    }
    if (data.length < total) {
      getMoreCompanies(
        { companyname: debouncedSearch, state: region?.value },
        offset + limit,
      );
    }
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.emptyList}>
          <ActivityIndicator size="large" color={'#7384BF'} />
        </View>
      );
    }
    return (
      <View style={styles.emptyList}>
        <Image
          source={require('assets/illustration.png')}
          style={{ width: s(330), height: s(250) }}
        />
        <Text style={{ fontSize: s(16) }}>
          There are no results that match your search
        </Text>
      </View>
    );
  };

  const renderList = () => {
    if (!debouncedSearch && !region) {
      return (
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 20,
              paddingVertical: 50,
            }}>
            {industries.map((item, index) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => setName(item.value)}
                  key={index}
                  style={{
                    borderWidth: 1,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 5,
                    borderColor: '#cecece',
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#333333',
                    }}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      );
    }

    return (
      <FlatList
        data={data}
        style={styles.container}
        keyExtractor={(_, index) => index.toString()}
        renderItem={item => (
          <ListItem {...item} onItemPress={handleItemPress} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty()}
        ListFooterComponent={
          <View style={{ height: 30 }}>
            {loadingMore && (
              <ActivityIndicator size="large" color={'#7384BF'} />
            )}
            <SafeArea />
          </View>
        }
      />
    );
  };

  return (
    <>
      <BaseScreen
        header={
          <SearchInput
            onChangeText={setName}
            value={companyName}
            selectedFilter={region?.value}
            onSettings={() => setVisible(STATE_PICKER)}
          />
        }>
        {renderList()}
      </BaseScreen>
      <ContactModal
        visible={visible === CONTACT}
        contact={data[contactIndex]}
        onClose={() => setVisible(false)}
        onCall={handleCall}
      />
      <Modal visible={visible === STATE_PICKER} onClose={hidePicker}>
        <StatePicker
          visible
          onClose={hidePicker}
          onSelect={handleStateSelect}
          selectedIndex={region?.index}
          onReset={() => handleStateSelect(null)}
        />
      </Modal>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  emptyList: { flex: 1, alignItems: 'center', paddingTop: 50 },
});
