import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Animated, { interpolate, timing, Easing } from 'react-native-reanimated';

import { sv, s, isIOS } from 'utils/helpers';

const AnimatedModal = ({ visible, onClose, children }) => {
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

  const opacity = interpolate(anim, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

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
        <View style={styles.box}>
          <View style={styles.boxContent}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

export default AnimatedModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.73)',
  },
  emptySpace: {
    ...StyleSheet.absoluteFillObject,
  },
  box: {
    backgroundColor: '#7384BF',
    borderRadius: sv(18),
    paddingTop: s(13),
    paddingBottom: s(13),
    paddingHorizontal: 4,
  },
  boxContent: {
    backgroundColor: '#fff',
    borderRadius: sv(18),
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
