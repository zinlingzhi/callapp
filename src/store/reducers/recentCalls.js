import t from '../actionTypes';

const initialState = {
  calls: [],
};

export function recent(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case t.SET_RECENT_CALL:
      return {
        ...state,
        calls: [action.payload, ...state.calls],
      };
    case t.UPDATE_RECENT_CALL:
      return {
        ...state,
        calls: state.calls.map(item => {
          if (item.callId === action.payload.callId) {
            return {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
