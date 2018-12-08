import { createStore as __createStore__, applyMiddleware, Store } from 'redux'; // eslint-disable-line
import { persistStore, persistReducer, Persistor } from 'redux-persist'; // eslint-disable-line
import storage from 'redux-persist/lib/storage';

import { merge, mergeWith } from 'lodash';

import getMiddlewares from './middleware';
import { createRootReducer } from './reducer/createRootReducer';
import config from './config';
import { createRoutes } from './navigation';
import setupErrorHandlers from './app/error';
import { createIcon } from './component/Icon';
import { concat } from './util';

export let __store__;

/* eslint-disable max-len */
/**
 * 
 * @typedef config
 * @type {Object}
 * 
 * @property {{ login: boolean, drawer: boolean, menu: boolean, footer: boolean, landingPage: string, routes: Object.<string, {screen: Function}> }} navigation Dictionary of navigation configs.
 * @property {string} appName Unique name for the app; This name would be used to name the log file on the device, as well as to look up logs in ElasticSearch.
 * @property {string} appVersion Current version of the app; This would be used to determine if an app update is required (internally, not via an MDM / App store / Play store deployment).
 * @property {string} iCargoURL http://IP:port/of/iCargo/and/the/base/context/path
 * @property {string} anonymousToken 
 * @property {string} identityTokenKey
 * @property {string} companyCode Company code; Sent to server API during login
 * @property {{ primary: string, primaryText: string, secondary: string, secondaryText: string, accent: string, accentText: string, divider: string, dividerText: string, dividerLight: string, dividerDark: string }} colors Dictionary of the app's color scheme
 * @property {Object.<string, Object>} sampleresponses Dictionary of the mock responses that the app would use in standalone mode
 * @property {number} mockLatency Time to wait before fetching mock data in standalone mode
 * @property {Object.<string, Object.<string, string>>} strings Dictionary of locales to dictionary of translations
 * @property {Function.<string, Object>} menuConfig 
 * @property {boolean} menuWithPrivilege Should menu be fetched from server?
 * @property {source} exclude Array of modules to exclude
 * 
 */

/**
 * 
 * @param {Object.<string, reducer>} reducers Dictionary of reducers.
 * @param {{ config: config, persistanceConfig: { whitelist: Array<string> } }} configs App config.
 * 
 * @returns {{ store: Store, persistor: Persistor, routes: any, config: config }}
 * 
 */
export let createStore = (reducers, configs) => {
  // TODO: exclude strings from this merge?
  const appConfig = configs.config;
  const persistanceConfig = configs.persistanceConfig;

  merge(config, appConfig);

  const __persistanceConfig = mergeWith({
    key: 'root',
    storage,
    whitelist: ['authReducer']
  }, persistanceConfig, concat);
  const routes = appConfig.navigation ? createRoutes(appConfig.navigation) : null;
  const rootReducer = createRootReducer(reducers, null);
  const persistedReducer = __persistanceConfig
    ? persistReducer(__persistanceConfig, rootReducer)
    : rootReducer;
  __store__ = __createStore__(persistedReducer,
    applyMiddleware.apply(null, getMiddlewares(config)));
  const persistor = persistStore(__store__);

  if (!config.exclude.includes('exception-handler')) {
    setupErrorHandlers();
  }
  createIcon(config.icon);
  
  // React Navigation seems to have a lot of unnecessary renders according to why-did-you-update,
  // rendering WDYU useless for profiling.
  /*if (!config.exclude.includes('whyDidYouUpdate')) {
    const React = require('react');
    const wdyu = require('why-did-you-update').default;
    wdyu(React);
  }*/

  return {
    store: __store__,
    persistor,
    routes,
    config
  };
};
