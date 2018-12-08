import * as types from './types';

export const requestStart = payload => ({
  type: types.__REQUEST_START,
  payload
});

export const requestEnd = payload => ({
  type: types.__REQUEST_END,
  payload
});

export const requestError = payload => ({
  type: types.__REQUEST_ERROR,
  payload
});

export const requestNetworkError = payload => ({
  type: types.__REQUEST_NETWORK_ERROR,
  payload
});

export const errorCleared = () => ({ type: types.__ERROR_CLEARED });

export const loggedIn = payload => ({
  type: types.__LOGGED_IN,
  payload
});

export const loggedOut = () => ({
  type: types.__LOGGED_OUT
});

export const menuFetched = payload => ({
  type: types.__MENU_FETCHED,
  payload
});

export const oneTimesFetched = payload => ({
  type: types.__ONE_TIMES_FETCHED,
  payload
});

// TODO: Remove this, as we should probably just lock orientation
export const layoutChanged = (width, height) => {
  return {
    type: types.__ORIENTATION_CHANGED,
    payload: width > height ? 'Landscape' : 'Portrait'
  };
};

export const keyboardVisibilityUpdated = payload => ({
  type: types.__KEYBOARD_VISIBILITY_CHANGED,
  payload
});

export const localeUpdated = payload => ({
  type: types.__LOCALE_UPDATED,
  payload
});

export const push = payload => ({
  type: types.__PUSH,
  payload
});

export const pop = () => ({
  type: types.__POP
});

export const popTo = payload => ({
  type: types.__POP_TO,
  payload
});

export const reset = () => ({
  type: types.__RESET
});

export const pushNotificationGroupChanged = group => ({
  type: types.__PUSH_NOTIFICATION_GROUP_CHANGED,
  payload: group
});

export const pushNotificationReceived = payload => ({
  type: types.__PUSH_NOTIFICATION_RECEIVED,
  payload
});

export const minuteTicked = () => ({
  type: types.MINUTE_TICKED
});

export const modalShown = payload => ({
  type: types.MODAL_SHOWN,
  payload
});

export const modalDismissed = payload => ({
  type: types.MODAL_DISMISSED,
  payload
});