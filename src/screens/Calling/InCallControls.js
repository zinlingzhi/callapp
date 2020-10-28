import React from 'react';
import { View, StyleSheet } from 'react-native';

import { s } from 'utils/helpers';

import { CallerContext } from '../../CallerContext';

import { ButtonMute, ButtonHandsfree, ButtonKeyboard } from './Controls';

const InCallControls = ({ disabled, active }) => (
  <CallerContext.Consumer>
    {({
      mute,
      handsfree,
      keyboard,
      toggleMute,
      toggleHandsfree,
      toggleKeyboard,
    }) => (
      <View style={styles.container}>
        <ButtonMute
          disabled={disabled}
          active={mute}
          light={active}
          onPress={toggleMute}
        />
        <ButtonHandsfree
          disabled={disabled}
          active={handsfree}
          light={active}
          onPress={toggleHandsfree}
        />
        <ButtonKeyboard
          disabled={disabled}
          active={keyboard}
          light={active}
          onPress={toggleKeyboard}
        />
      </View>
    )}
  </CallerContext.Consumer>
);

export default InCallControls;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: s(20),
  },
});
