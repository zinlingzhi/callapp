import React, { useRef, useEffect, useContext } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';

import Animated, { interpolate, timing, Easing } from 'react-native-reanimated';

import SafeArea from 'components/SafeArea';

import { sv, s, isIOS } from 'utils/helpers';

const CallIcon = require('assets/call.png');

const CloseIcon = require('assets/cross.png');
const LocationIcon = require('assets/location.png');
const UserIcon = require('assets/user.png');

const ContactModal = ({ visible, onClose, onCall, contact }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const timingAnimation = timing(anim, {
    duration: 300,
    toValue: 1,
    easing: Easing.inOut(Easing.ease),
  });

  useEffect(() => {
    if (!visible) {
      anim.setValue(0);
    } else {
      timingAnimation.start();
    }
  }, [anim, timingAnimation, visible]);

  const handleClose = () => {
    anim.setValue(0);
    if (onClose) {
      onClose();
    }
  };

  const handleCallPress = () => {
    handleClose();
    if (onCall) {
      onCall(contact);
    }
  };

  const opacity = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const renderContact = () => {
    if (!contact) {
      return null;
    }
    return (
      <View style={styles.box}>
        <View style={styles.boxContent}>
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
            onPress={handleClose}
            style={styles.closeButton}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>

          <View style={[styles.row, styles.firstRow]}>
            <Image source={UserIcon} style={styles.userIcon} />
            <Text style={styles.nameText}>{contact.companyname}</Text>
          </View>

          <View style={styles.row}>
            <Image source={CallIcon} style={styles.callIcon} />
            <Text text={styles.phoneText}>{contact.phonenumber}</Text>
          </View>

          <View style={styles.row}>
            <Image source={LocationIcon} style={styles.locationIcon} />
            <Text text={styles.phoneText}>{contact.location}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCallPress}
            style={styles.callButton}>
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
          <SafeArea />
        </View>
      </View>
    );
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={handleClose}>
      <Animated.View
        pointerEvents="none"
        style={[styles.underlay, { opacity }]}
      />
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.emptySpace} />
        </TouchableWithoutFeedback>

        {renderContact()}
      </View>
    </Modal>
  );
};

export default ContactModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.73)',
  },
  emptySpace: {
    flex: 1,
  },
  box: {
    backgroundColor: '#7384BF',
    borderTopRightRadius: sv(18),
    borderTopLeftRadius: sv(18),
    paddingTop: s(13),
  },
  boxContent: {
    backgroundColor: '#fff',
    padding: s(20),
    borderTopRightRadius: sv(18),
    borderTopLeftRadius: sv(18),
  },
  callButton: {
    width: sv(192),
    height: sv(45),
    borderRadius: sv(23),
    marginVertical: sv(15),
    backgroundColor: '#3A71FF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  callText: {
    fontWeight: isIOS ? '900' : 'bold',
    fontSize: s(20),
    color: 'white',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: s(15),
    paddingRight: 5,
  },

  firstRow: { marginBottom: s(25), marginTop: -s(5) },

  nameText: {
    fontSize: s(18),
    fontWeight: 'bold',
    color: '#545454',
    flex: 1,
  },

  phoneText: {
    fontSize: sv(20),
    color: '#545454',
  },

  userIcon: {
    width: sv(67),
    height: sv(66),
    marginRight: s(20),
  },
  callIcon: {
    width: sv(23),
    height: sv(23),
    tintColor: '#7384BF',
    marginRight: sv(26),
  },
  locationIcon: {
    width: sv(29),
    height: sv(29),
    tintColor: '#7384BF',
    marginRight: s(22),
  },
  closeIcon: {
    width: sv(21),
    height: sv(20),
  },

  closeButton: {
    alignSelf: 'flex-end',
    // position: 'absolute',
    // top: s(13),
    // right: s(20),
  },
});
