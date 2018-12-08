import { loggedIn, loggedOut, menuFetched, oneTimesFetched } from './actions';
import makeRequest from './net';
import config from './config';
import menuSchema from './schema/menuSchema';
import { push } from './navigation';
import { sync } from './util';

export const login = (userCode, userPassword) => dispatch =>
  makeRequest({
    endpoint: 'baseadmin/mobilityLogin',
    body: {
      userCode,
      userPassword,
      companyCode: config.companyCode
    }
  }).then(response => {
    dispatch(loggedIn(response[0]));
    push(config.navigation.landingPage);
  }).catch(() => {
    // Optional catch block; We might need to pass some config to util.ajax to prevent it from
    // handling errors, so that we can handle it here.
  });

export const logout = () => dispatch => {
  // Might need to dispatch a server call before this
  dispatch(loggedOut());
};

export const fetchMenu = () => dispatch => {
  if (config.menuWithPrivilege) {
    return makeRequest({
      endpoint: 'baseadmin/getUserMenu',
      body: {}
    }).then(handleMenuResponse.bind(null, dispatch));
  }
  else {
    handleMenuResponse(dispatch, config.sampleresponses['getUserMenu'].data.results);
  }
};

const handleMenuResponse = (dispatch, response) => {
  const getMenuItem = config.menuConfig,
    normalizedResponse = menuSchema(response),
    { childMenuItems, parentMenuItems } = normalizedResponse.entities;
  
  const getMenu = (o, k) => {
    const menuItem = getMenuItem(k);

    if (menuItem) {
      o[k] = menuItem;
    }
    
    return o;
  };

  dispatch(menuFetched({
    // TODO: Remove this; return proper response from server
    parentMenuItems: Object.keys(parentMenuItems).reduce(getMenu, {}),
    childMenuItems: Object.keys(childMenuItems).reduce(getMenu, {})
  }));
};

export const fetchOneTimes = () => dispatch => {  
  return makeRequest({
    endpoint: 'shared/getOneTimes',
    body: {
      getOneTimes: {}
    }
  }).then(response => {
    dispatch(oneTimesFetched(response.oneTimes));
  });
};

// Command to fetch credentials from existing Android app:
const object = 'com.ibsplc.icargo.icoandroid.util.common.Session';

export const fetchCredentials = () => dispatch =>
  sync({
    object,
    prop: ['getUser'],
    success: logonAttributes => dispatch(loggedIn(logonAttributes)),
    failure: () => {}
  });