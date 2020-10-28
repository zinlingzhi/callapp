import t from '../actionTypes';

const initialState = {
  companyname: '',
  phonenumber: '',
  status: -1,
};

export function caller(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case t.CALL_START:
      return {
        ...state,
        companyname: action.payload.companyname || '',
        phonenumber: action.payload.phonenumber,
      };
    case t.CALL_END:
      return {
        ...state,
        status: action.payload.status,
      };
    case t.CALL_STATUS_CHANGE:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
