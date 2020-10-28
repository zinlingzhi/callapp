import { getCompanies } from '../../api';
import t from '../actionTypes';

export const setCompanyName = payload => ({
  type: t.SET_SEARCH_COMPANY_NAME,
  payload,
});

export const setStateRegion = payload => ({
  type: t.SET_SEACH_STATE_REGION,
  payload,
});

export const setCity = payload => ({
  type: t.SET_SEARCH_CITY,
  payload,
});

export const loadCompanies = query => async dispatch => {
  dispatch({ type: t.LOAD_SEARCH });
  try {
    const payload = await getCompanies(query);
    return dispatch({ type: t.LOAD_SEARCH_SUCCESS, payload });
  } catch (e) {
    return dispatch({ type: t.LOAD_SEARCH_FAIL, payload: e.message });
  }
};

export const loadMoreCompanies = (query, page) => async dispatch => {
  dispatch({ type: t.LOAD_MORE_SEARCH });
  try {
    const payload = await getCompanies(query, page);
    return dispatch({ type: t.LOAD_MORE_SEARCH_SUCCESS, payload });
  } catch (e) {
    return dispatch({ type: t.LOAD_MORE_SEARCH_FAIL, payload: e.message });
  }
};
