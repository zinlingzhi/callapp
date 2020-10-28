import t from '../actionTypes';

export const startCalling = payload => ({
  type: t.CALL_START,
  payload,
});

export const endCalling = payload => ({
  type: t.CALL_END,
  payload,
});

export const setCallStatus = payload => ({
  type: t.CALL_STATUS_CHANGE,
  payload,
});

export const setRecentCall = payload => ({
  type: t.SET_RECENT_CALL,
  payload,
});
export const updateRecentCall = payload => ({
  type: t.UPDATE_RECENT_CALL,
  payload,
});
