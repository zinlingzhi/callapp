import t from '../actionTypes';

const initialState = {
  companyName: '',
  region: null,
  city: null,

  loading: false,
  laodingMore: false,

  total: 0,
  limit: 0,
  offset: 0,
  data: [],
};

export function search(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case t.SET_SEARCH_COMPANY_NAME:
      return {
        ...state,
        companyName: action.payload,
      };
    case t.SET_SEACH_STATE_REGION:
      return {
        ...state,
        region: action.payload,
        city: null,
      };
    case t.SET_SEARCH_CITY:
      return {
        ...state,
        city: action.payload,
      };

    case t.LOAD_SEARCH:
      return {
        ...state,
        loading: true,
      };
    case t.LOAD_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case t.LOAD_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        total: 0,
        limit: 0,
        offset: 0,
        data: [],
      };
    case t.LOAD_MORE_SEARCH:
      return {
        ...state,
        laodingMore: true,
      };
    case t.LOAD_MORE_SEARCH_SUCCESS:
      return {
        ...state,
        laodingMore: false,
        total: action.payload.total,
        limit: action.payload.limit,
        offset: action.payload.offset,
        data: state.data.concat(action.payload.data),
      };
    case t.LOAD_MORE_SEARCH_FAIL:
      return {
        ...state,
        laodingMore: false,
      };
    default:
      return state;
  }
}
