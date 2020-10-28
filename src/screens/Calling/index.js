/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';

import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { sv, s } from 'utils/helpers';

import { CallerContext, STATUS } from '../../CallerContext';

import CallingNumber from './CallingNumber';
import { ViewContactButton, PhoneButton } from './Controls';
import InCallControls from './InCallControls';
import KeypadView from './KeypadView';
import StatusText from './StatusText';
import WaveEffect from './WaveEffect';

const userIconDark = require('assets/user.png');
const userIconLight = require('assets/user_reverse.png');

const CallerScreen = props => {
  const navigation = useNavigation();
  const caller = useContext(CallerContext);

  const { phonenumber, companyname, status: callState } = useSelector(
    state => state.caller,
  );
  const isEnded =
    callState === STATUS.ended ||
    callState === STATUS.busy ||
    callState === STATUS.noResponse;

  return (
    <View style={styles.container}>
      {!isEnded && <WaveEffect altColor />}
      <SafeAreaView style={{ flex: 1 }}>
        <CallerContext.Consumer>
          {({ keyboard, dtmf, sendDtmf, duration }) => {
            return (
              <>
                <View style={styles.row1}>
                  <StatusText duration={duration} callState={callState} />
                </View>

                {keyboard && (
                  <View style={styles.keypadView}>
                    <KeypadView dtmfNumber={dtmf} onKeyPress={sendDtmf} />
                  </View>
                )}

                {!keyboard && (
                  <>
                    <View style={styles.row2}>
                      <CallingNumber
                        name={companyname}
                        number={phonenumber}
                        active={!isEnded}
                      />
                    </View>
                    <View style={styles.row3}>
                      <Image
                        source={isEnded ? userIconDark : userIconLight}
                        style={styles.userIcon}
                      />
                    </View>
                  </>
                )}
              </>
            );
          }}
        </CallerContext.Consumer>
        <View style={styles.row4}>
          <InCallControls disabled={isEnded} active={!isEnded} />
        </View>

        <View style={styles.row5}>
          <View style={styles.footer}>
            {isEnded ? (
              <ViewContactButton onPress={() => navigation.goBack()} />
            ) : (
              <View
                style={[
                  styles.callButtons,
                  callState !== STATUS.incoming && {
                    justifyContent: 'center',
                  },
                ]}>
                {callState === STATUS.incoming && (
                  <PhoneButton onPress={() => console.log(STATUS.active)} />
                )}
                <PhoneButton decline onPress={() => caller.endCall()} />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CallerScreen;

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },

  row1: { height: height * 0.08, borderWidth: 0 },
  row2: { height: height * 0.1, borderWidth: 0 },
  row3: { height: height * 0.4, borderWidth: 0 },
  row4: { height: height * 0.1, borderWidth: 0 },
  row5: { height: height * 0.2, borderWidth: 0 },

  keypadView: { height: height * 0.5 },

  footer: { flex: 1, justifyContent: 'center' },
  callButtons: {
    flexDirection: 'row',
    paddingHorizontal: s(50),
    justifyContent: 'space-between',
  },
  userIcon: {
    width: sv(163),
    height: sv(163),
    alignSelf: 'center',
    marginTop: sv(20),
  },
});
