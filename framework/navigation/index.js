import { NativeModules } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import * as types from '../types';
import config from '../config';

let _navigator;
let _dispatch;

export const setTopLevelNavigator = (navigatorRef, dispatch) => {
  _navigator = navigatorRef;
  _dispatch = dispatch;
};

export const push = (routeName, params, onNextFrame = false) => {
  if (config.navigation.routes && config.navigation.routes[routeName]) {
    if (onNextFrame) {
      requestAnimationFrame(() => __push(routeName, params));
    }
    else {
      __push(routeName, params);
    }
  }
  else if (NativeModules.NavigationModule) {
    NativeModules.NavigationModule.navigateTo(routeName);
  }
};

const __push = (routeName, params) => {
  _navigator.dispatch(NavigationActions.navigate({
    routeName,
    params,
  }));
  _dispatch({
    type: types.__PUSH,
    payload: routeName
  });
};

export const pop = () => {
  if (config.navigation.routes) {
    _navigator.dispatch(NavigationActions.back());
    _dispatch({
      type: types.__POP
    });
  }
  else if (NativeModules.NavigationModule) {
    NativeModules.NavigationModule.goBack();
  }
};

export const popTo = routeName => {
  if (config.navigation.routes[routeName]) {
    _navigator.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName
        })
      ]
    }));
    _dispatch({
      type: types.__POP_TO,
      payload: routeName
    });
  }
};

// Workaround
export const reset = () => {
  popTo(config.navigation.landingPage || 'Home');
  pop();
};

export { default as createRoutes } from './createRoutes';
export { slideFromRightTransition } from './animations';