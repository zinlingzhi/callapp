import React from 'react';
import { View, StyleSheet } from 'react-native';

import { sv } from 'utils/helpers';

const BaseScreen = ({ header, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>{header}</View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default BaseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    minHeight: sv(65),
    justifyContent: 'center',
    paddingVertical: sv(10),
  },

  content: {
    flex: 1,
    borderTopWidth: 2,
    borderTopColor: '#ECECEC',
    backgroundColor: 'white',
  },
});

/**
 *
 import { BannerAd, BannerAdSize } from '@react-native-firebase/admob';
 import { BannerId } from '../../Services/DataService';
  <BannerAd
    unitId={BannerId}
    size={BannerAdSize.BANNER}
    requestOptions={{
        requestNonPersonalizedAdsOnly: true,
    }}
    onAdLoaded={() => {
        console.log('Advert loaded');
    }}
    onAdFailedToLoad={(error) => {
        console.log('Advert failed to load: ', error);
    }}
/>
 */
