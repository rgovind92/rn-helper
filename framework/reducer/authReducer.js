import * as types from '../types';

const initialState = {
  logonAttributes: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.__LOGGED_IN:
      return { ...state, logonAttributes: action.payload };
    case types.__LOGGED_OUT:
      return {
        ...state,
        logonAttributes: null
      };
    default:
      return state;
  }
};
