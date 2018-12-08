import config from '../config';

export default store => next => action => {
  if (
    action.type === '__DELEGATE_WARNING_ONOK' ||
    action.type === '__DELEGATE_WARNING_ONCANCEL'
  ) {
    if (config.warningHandler) {
      config.warningHandler(action, store.dispatch, store.getState);
    }
  }
  else {
    next(action);
  }
};
