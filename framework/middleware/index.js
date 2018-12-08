import thunkMiddleWare from 'redux-thunk';

export default config =>
  [thunkMiddleWare].concat(config.exclude.includes('loggerMiddleware')
    ? null
    : require('./loggerMiddleware').default).filter(_ => _);
// Cannot import dynamically in Metro: https://github.com/facebook/metro/issues/52
// Dynamic import is needed because:
/*return [thunkMiddleWare].concat(['loggerMiddleware'].map(middleware =>
    config.exclude.indexOf(middleware) === -1
      ? null
      : null).filter(_ => _));*/