import { __PUSH, __POP, __POP_TO, __RESET } from '../types';

// Because config is being merged at runtime, we cannot guarantee that
// initialState (which is created based on config) is working with 
// the merged version of config. And so its passed in as a param.
export default config => {
  const initialState = {
    stack: config.navigation.login
      ? ['Login']
      : [config.navigation.landingPage] || 'Home',
    activeRoute: config.navigation.login
      ? 'Login'
      : config.navigation.landingPage
  };

  return (state = initialState, action) => {
    let nextStack = [ ...state.stack ];
  
    switch (action.type) {
      case __PUSH:
        nextStack.push(action.payload);
        return { stack: nextStack, activeRoute: nextStack[nextStack.length - 1] };
      case __POP:
        nextStack.pop();
        return { stack: nextStack, activeRoute: nextStack[nextStack.length - 1]  };
      case __POP_TO:
        return {
          stack: state.stack.slice(0, state.stack.indexOf(action.payload) + 1),
          activeRoute: nextStack[nextStack.length - 1] 
        };
      case __RESET:
        return initialState;
    }
  
    return { stack: nextStack, activeRoute: nextStack[nextStack.length - 1] };
  };
};