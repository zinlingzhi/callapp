import React from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useCode,
  set,
  add,
  cond,
  call,
  eq,
  Value,
  and,
} from 'react-native-reanimated';
import { usePanGestureHandler } from 'react-native-redash';

import { withDecay } from './AnimationHelpers';
import { ITEM_HEIGHT } from './Constants';

const GestureHandler = ({ value, max, defaultValue, callback }) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();
  const snapPoints = new Array(max).fill(0).map((_, i) => i * -ITEM_HEIGHT);
  const { translateY, state: decayState } = withDecay({
    value: translation.y,
    velocity: velocity.y,
    state,
    snapPoints,
  });

  const flag = new Value(0);

  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [
        set(flag, 1),
        call([translateY], val => {
          if (typeof callback === 'function') {
            const index = snapPoints.findIndex(i => i === val[0]);
            if (index !== -1) {
              callback(index);
            }
          }
        }),
      ]),
      set(value, add(translateY, ITEM_HEIGHT * 2)),
      cond(
        and(decayState.finished, flag),
        call([translateY], val => {
          if (typeof callback === 'function') {
            const index = snapPoints.findIndex(i => i === val[0]);
            if (index !== -1) {
              callback(index);
            }
            flag.setValue(0);
          }
        }),
      ),
    ],
    [],
  );
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
