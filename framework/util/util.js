import moment from 'moment';
import {
  NativeModules,
  StyleSheet,
  PermissionsAndroid
} from 'react-native';
import { memoize, isArray } from 'lodash';

export const isEmpty = prop =>
  prop === null ||
  prop === undefined ||
  prop.hasOwnProperty('length') && prop.length === 0 ||
  prop.constructor === Object && Object.keys(prop).length === 0;

export const isClassComponent = Component =>
  Component &&
  Component.prototype &&
  typeof Component.prototype.isReactComponent === 'object';

export const getCurrentDate = dateFormat => 
  moment(new Date()).format(dateFormat ? dateFormat : 'DD-MMM-YYYY');

export const getCurrentRoute = state => {
  const findCurrentRoute = navState => {
    if (navState.index !== undefined) {
      return findCurrentRoute(navState.routes[navState.index]);
    }
    return navState.routeName;
  };
  return findCurrentRoute(state);
};

export const cssBridge = (f, tpl) =>
  new Function('f', 'return f`' + tpl + '`;').call(null, f);

export const arrayToObject = (array, key) =>
  array.reduce((o, item) => {
    o[item[key]] = item;
    return o;
  }, {});

/*
* 
* Tokenizer that applies a function fn, and arguments args to the text within '${}'.
* For eg. 'Box number ${0} is in Truck number ${1}'
* would become:
* 'Box number 1234 is in Truck number 5678', assuming that
* fn is: (index, array) => array[parseInt(index)]
* and args is: ['1234', '5678']
*
*/
export const format = ({
  string = '',
  limiter = '${',
  delimiter = '}',
  fn = (index, array) => array ? array[parseInt(index)] : '',
  args
} = { string: '' }) => {
  
  let i = 0,
    out = '',
    target = null;
  const compareTokens = (x, y, index) =>
    x.slice(index, index + y.length) === y;

  while (i < string.length) {
    if (compareTokens(string, limiter, i)) {
      target = '';
      for (let _ = 0; _ < limiter.length - 1; _++) {
        i++;
      }
    }
    else if (target != null) {
      if (compareTokens(string, delimiter, i)) {
        out += fn(target, args);
        target = null;
        for (let _ = 0; _ < delimiter.length - 1; _++) {
          i++;
        }
      }
      else {
        target += string[i];
      }
    }
    else {
      out += string[i];
    }

    i++;
  }

  return out;
};

export const noop = () => {};

export const sync = ({ object, prop, setter, args, success, failure, accessSingleton = true }) => {
  NativeModules.NativeBridge.sync(object, 
    prop,
    setter,
    args,
    accessSingleton,
    success,
    failure);
};

export async function updateApp({
  protocol = 'HTTP',
  method = 'GET',
  url
}) {
  try {
    const granted =
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'Access to file system',
          'message': 'This app would like to create a file to store its next version,' +
                   'so that it can install the latest one automatically.'
        });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      NativeModules.AppUpdateModule.updateApp(protocol, method, url);
    }
    else {
      noop();
    }
  }
  catch (err) {
    noop();
  }
}

export const createThemedStyle = () => {
  return function() {
    return memoize(() => StyleSheet.create({
      o: {

      }
    }).o);
  };
};

export const isV2GreaterThanV1 = (v1, v2) => {
  const normalizeAndSplit = v => {
    let split = v.split('.');
    
    while (split.length < 3) {
      split.push('0');
    }
  
    return split;
  };
  
  const v1Split = normalizeAndSplit(v1);
  const v2Split = normalizeAndSplit(v2);
  
  for (let i = 0; i < 3; i++) {
    const x = Number(v1Split[i]);
    const y = Number(v2Split[i]);
    
    if (y > x) {
      return true;
    }
    if (y < x) {
      return false;
    }
  }
  
  return false;
};

// Function that accepts a command, and excecutes it after fetching credentials from
// native, if it doesn't already exist in JS.
export const withCreds = command => (...args) => (dispatch, getState) => {
  const _ = getState().auth.logonAttributes;

  return _
    ? dispatch(command(...args, _))
    : sync({
      object: 'com.ibsplc.icargo.icoandroid.util.common.Session',
      prop: ['getUser'],
      success: logonAttributes => dispatch(command(...args, logonAttributes)),
      failure: noop
    });
};

export const concat = (left, right) => {
  if (isArray(left)) {
    return left.concat(right);
  }
};