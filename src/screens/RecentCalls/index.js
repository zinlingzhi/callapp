import Viewpager from '@react-native-community/viewpager';
import { useNavigation } from '@react-navigation/native';

import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import Button from 'components/Button';

import { CallerContext } from '../../CallerContext';

import BaseScreen from '../BaseScreen';

import EmptyList from './EmptyList';
import ListItem from './ListItem';

const RecentCallsScreen = props => {
  const navigation = useNavigation();
  const caller = useContext(CallerContext);

  const { calls } = useSelector(state => state.recent);

  const [position, setPosition] = useState(0);
  const swiper = useRef();

  const onPageChange = ({ nativeEvent }) => {
    setPosition(nativeEvent.position);
  };

  const handleCall = contact => {
    console.log('contact', contact);
    caller.startCall(contact);
    navigation.navigate('Calling');
  };

  const renderItem = ({ item, index }) => {
    return <ListItem item={item} index={index} onItemPress={handleCall} />;
  };

  const connectedNumbers = calls.filter(i => i.connected);
  return (
    <BaseScreen
      header={
        <View style={styles.header}>
          <Button
            text="All"
            reversed={position === 1}
            style={styles.mr}
            onPress={() => {
              if (swiper.current) {
                swiper.current.setPage(0);
              }
            }}
          />
          <Button
            text="Connected"
            reversed={position === 0}
            style={styles.ml}
            onPress={() => {
              if (swiper.current) {
                swiper.current.setPage(1);
              }
            }}
          />
        </View>
      }>
      <Viewpager
        ref={swiper}
        onPageSelected={onPageChange}
        style={{ flex: 1 }}
        initialPage={0}>
        <FlatList
          data={calls}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderItem}
          contentContainerStyle={connectedNumbers.length > 0 ? {} : { flex: 1 }}
          ListEmptyComponent={<EmptyList allCalls />}
        />
        <FlatList
          data={connectedNumbers}
          keyExtractor={(_, i) => i.toString()}
          renderItem={ListItem}
          contentContainerStyle={connectedNumbers.length > 0 ? {} : { flex: 1 }}
          ListEmptyComponent={<EmptyList />}
        />
      </Viewpager>
    </BaseScreen>
  );
};

export default RecentCallsScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ml: { marginLeft: 5 },
  mr: { marginRight: 5 },
});
