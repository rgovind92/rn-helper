import React from 'react';
import { YellowBox, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { fetchCredentials } from '../../commands';
import IDialog from '../../component/IDialog';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
]);

export default ({ store, screens }) => {
  store.dispatch(fetchCredentials());
  
  Object.entries(screens).map(([ screenName, Screen ]) => 
    AppRegistry.registerComponent(screenName, () => () =>
      <Provider store={store}>
        <React.Fragment>
          <Screen />
          <IDialog />
        </React.Fragment>
      </Provider>));
};
