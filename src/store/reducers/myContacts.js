import t from '../actionTypes';

const initialState = {
  phonenumber: '',
  companyname: '',
  region: null,
  city: null,
  industry: null,

  industryLoading: false,
  industries: [],

  list: [],
};

export function myContacts(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case t.SET_MY_CONTACT_PHONE:
      return {
        ...state,
        phonenumber: action.payload,
        formatted: action.formatted,
        companyname: '',
        region: null,
        city: null,
        industry: null,
      };
    case t.SET_MY_CONTACT_NAME:
      return {
        ...state,
        companyname: action.payload,
      };
    case t.SET_MY_CONTACT_STATE:
      return {
        ...state,
        region: action.payload,
        city: null,
      };
    case t.SET_MY_CONTACT_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case t.SET_MY_CONTACT_INDUSTRY:
      return {
        ...state,
        industry: action.payload,
      };
    case t.ADD_CONTACT:
      return {
        ...state,
        phonenumber: null,
        companyname: '',
        region: null,
        city: null,
        industry: null,
        list: [...state.list, action.payload],
      };

    case t.EDIT_CONTACT:
      return {
        ...state,
        list: state.list.map(item => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case t.DELETE_CONTACT:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload.id),
      };
    case t.LOAD_INDUSTRIES:
      return {
        ...state,
        industryLoading: true,
      };
    case t.LOAD_INDUSTRIES_SUCCESS:
      return {
        ...state,
        industryLoading: false,
        industries: action.payload,
      };
    case t.LOAD_INDUSTRIES_FAIL:
      return {
        ...state,
        industryLoading: false,
      };
    default:
      return state;
  }
}
