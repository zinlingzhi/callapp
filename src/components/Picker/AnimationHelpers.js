import { State } from 'react-native-gesture-handler';
import {
  Clock,
  Value,
  add,
  block,
  cond,
  eq,
  set,
  startClock,
  and,
  not,
  timing,
  Easing,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

export const withDecay = params => {
  const { value, velocity, state: gestureState, offset, snapPoints } = {
    offset: new Value(0),
    ...params,
  };
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: new Value(1000),
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  };
  return {
    state,
    translateY: block([
      startClock(clock),
      cond(eq(gestureState, State.BEGAN), set(offset, state.position)),
      cond(eq(gestureState, State.ACTIVE), [
        set(state.position, add(offset, value)),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(state.finished, 0),
        set(config.toValue, snapPoint(state.position, velocity, snapPoints)),
      ]),
      cond(and(not(state.finished), eq(gestureState, State.END)), [
        timing(clock, state, config),
      ]),
      state.position,
    ]),
  };
};
