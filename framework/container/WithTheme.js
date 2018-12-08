import React from 'react';

import ThemeContext from '../context/ThemeContext';
import colors from '../config/colors';

const fallback = {
  ...colors,
  updateColor: () => {},
  borderRadius: 0,
  updateBorderRadius: () => {}
};

export default props =>
  <ThemeContext.Consumer>
    {(context = fallback) => props.children(context)}
  </ThemeContext.Consumer>;