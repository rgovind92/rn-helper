import axios, { CancelToken } from 'axios';
import config from '../config';
import { __store__ as store } from '../store';
import {
  requestStart,
  requestEnd,
  modalShown
} from '../actions';

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

const processResponse = (response, endpoint) => {
  
  store.dispatch(requestEnd(endpoint));

  if (response instanceof Error) {
    return response;
  }
  else if (response.data && response.data.errors && response.data.errors.ERROR) {
    return Promise.reject(response);
  } 

  return response.data.results;
};

const handleNetworkError = (response, endpoint) => { 
  const dispatch = store.dispatch;
  dispatch(requestEnd(endpoint));

  if (response.data && response.data.errors && response.data.errors.ERROR) {
    const text = response.data.errors.ERROR;

    dispatch(modalShown({
      text: text[0].data ? text[0] : text[0].code,
      modalName: 'businessErrorModal',
      interpolate: text[0].data
    }));
    return Promise.reject();
  }

  dispatch(modalShown({
    text: 'networkError',
    modalName: 'networkErrorModal'
  }));
  return Promise.reject();
};

const normalizeURL = url =>
  url[url.length - 1] === '/'
    ? url
    : url + '/';

export default ({ endpoint, body, timeout = 10000 }) => {
  const source = CancelToken.source();
  const headers = { 'Content-Type': 'application/json' };
  const logonAttributes = store.getState().auth.logonAttributes;
  const __endpoint__ = endpoint.split('/').reverse()[0];

  headers[config.identityTokenKey] =
    logonAttributes ? logonAttributes.sessionId : config.anonymousToken;

  setTimeout(() => source.cancel(), timeout);
  store.dispatch(requestStart(__endpoint__));

  if (config.exclude && config.exclude.includes('sampleresponses')) {
    return axios.post(normalizeURL(config.iCargoURL) + endpoint,
      body, {
        headers,
        timeout,
        cancelToken: source.token
      })
      .then(_ => processResponse(_, __endpoint__))
      .catch(_ => handleNetworkError(_, __endpoint__));
  }
  else {
    return new Promise(function(resolve) {
      setTimeout(() => {
        resolve(processResponse(config.sampleresponses[
          __endpoint__
        ], __endpoint__));
      }, config.mockLatency);
    })
      .catch(handleNetworkError);
  }
};
