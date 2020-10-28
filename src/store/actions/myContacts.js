import { getIndustries } from '../../api';
import t from '../actionTypes';

export const loadIndustries = () => async dispatch => {
  dispatch({ type: t.LOAD_INDUSTRIES });
  try {
    const payload = await getIndustries();
    return dispatch({ type: t.LOAD_INDUSTRIES_SUCCESS, payload });
  } catch (e) {
    return dispatch({ type: t.LOAD_INDUSTRIES_FAIL, payload: e.message });
  }
};

export const setContactPhone = (payload, formatted) => ({
  type: t.SET_MY_CONTACT_PHONE,
  payload,
  formatted,
});

export const setContactName = payload => ({
  type: t.SET_MY_CONTACT_NAME,
  payload,
});

export const setContactState = payload => ({
  type: t.SET_MY_CONTACT_STATE,
  payload,
});

export const setContactCity = payload => ({
  type: t.SET_MY_CONTACT_CITY,
  payload,
});

export const setContactIndustry = payload => ({
  type: t.SET_MY_CONTACT_INDUSTRY,
  payload,
});

export const addContact = payload => ({
  type: t.ADD_CONTACT,
  payload,
});

export const editMyContact = payload => ({
  type: t.EDIT_CONTACT,
  payload,
});

export const deleteMyContact = payload => ({
  type: t.DELETE_CONTACT,
  payload,
});
