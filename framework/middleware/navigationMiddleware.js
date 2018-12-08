import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

// TODO: Preventing navigation to the currently active screen is currently done elsewhere.
// Would it be better to do that here?
const navigationMiddleware = createReactNavigationReduxMiddleware('root',
  state => state.navigationReducer);
const addListener = createReduxBoundAddListener('root');

export { navigationMiddleware, addListener };
