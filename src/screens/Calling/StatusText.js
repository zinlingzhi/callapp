import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { s } from 'utils/helpers';
import { getDuration } from 'utils/string';

import { STATUS } from '../../CallerContext';

const STATUS_TEXT = {
  [STATUS.outgoing]: 'Calling...',
  [STATUS.incoming]: 'Incoming call',
  [STATUS.active]: '',
  [STATUS.ended]: ' Call ended',
  [STATUS.busy]: 'Line busy',
  [STATUS.noResponse]: 'No response, time out',
};
const acceptIcon = require('assets/accept_call.png');
const declineIcon = require('assets/decline_call.png');

const getStatusStyle = state => {
  if (
    state === STATUS.ended ||
    state === STATUS.busy ||
    state === STATUS.noResponse
  ) {
    return { color: '#E32121', icon: declineIcon };
  }
  if (state === STATUS.active) {
    return { color: '#71BC64', icon: acceptIcon };
  }
  return { color: 'white', icon: undefined };
};

const StatusText = ({ callState = 1, duration }) => {
  const { color, icon } = getStatusStyle(callState);

  const showDuration =
    callState === STATUS.active || callState === STATUS.ended;
  return (
    <View style={styles.container}>
      {!!icon && <Image source={icon} style={styles.icon} />}
      <Text style={[styles.text, { color }]}>
        {showDuration ? `${getDuration(duration)} ` : ''}
        {STATUS_TEXT[callState]}
      </Text>
    </View>
  );
};

export default StatusText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: s(18),
  },
  icon: {
    width: s(18),
    height: s(18),
    marginRight: s(10),
  },
});
