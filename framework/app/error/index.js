import { Alert } from 'react-native';
import { setJSExceptionHandler, getJSExceptionHandler } from 'react-native-exception-handler';
import axios from 'axios';

import config from '../../config';

export default () => {
  const nextErrorHandler = (error, isFatal) => {
      if (error && config.crashLogURL && config.appName) {
        const date = new Date();
        
        axios.post(config.crashLogURL + config.appName + '/' + Date.now(), {
          message: error.message,
          year: date.getFullYear(),
          month: date.getMonth(),
          day: date.getDay(),
          hour: date.getHours(),
          minutes: date.getMinutes(),
          seconds: date.getSeconds(),
          isFatal
        });
      }
      Alert.alert('An unexpected error occurred!',
        'The app developers have been notified of this, and will fix it soon.');
    },
    previousErrorHandler = getJSExceptionHandler(),
    errorHandler = (e, isFatal) => {
      nextErrorHandler(e, isFatal);
      previousErrorHandler(e, isFatal);
    };

  setJSExceptionHandler(errorHandler, config.env !== 'DEBUG');
};