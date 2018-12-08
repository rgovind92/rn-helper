import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { ignoreActions } from 'redux-ignore';

import createNavigationReducer from './navigationReducer';
import common from './commonReducer';
import auth from './authReducer';

import { __store__ as store } from '../store';
import config from '../config';

export const createRootReducer = reducers => {
  let reducersWithIgnore = reducers;

  if (config.exclude.indexOf('reduxIgnore') === -1) {
    reducersWithIgnore = Object.entries(reducers).reduce((o, [name, reducer]) => {
      if (name === 'shared') {
        o[name] = reducer;
      }
      else {
        o[name] = ignoreActions(reducer, () => {
          // TODO: check if redux-persist still works
          // if (!store ||
          //   action.type === 'persist/PERSIST' ||
          //   action.type === 'persist/REHYDRATE') {
          //   
          // }
          // TODO: This might cause issues if used with disconnect
          return store
            ? store.getState().navigation.activeRoute
              !== name.charAt(0).toUpperCase() + name.slice(1)
            : false;
        });
      }

      return o;
    }, {});
  }

  const appReducer = combineReducers({
    ...reducersWithIgnore,
    auth,
    common,
    //form,
    // React navigation discourages storing navigation state in redux:
    // https://github.com/react-navigation/react-navigation/issues/4490
    // However, 
    // 1. Header and Menu need to know at least which screen is active and
    // 2. Redux logger would need to track navigation actions just like any other action,
    // so we use this lightweight reducer that only tracks only the stack of screens
    // on a StackNavigator.
    navigation: createNavigationReducer(config)
  });

  return appReducer;
};
