import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from '../container/App';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

export default ({ store, persistor, routes, config }) => () =>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App routes={routes} config={config} />
    </PersistGate>
  </Provider>;
