import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import __Icon__ from 'react-native-vector-icons/FontAwesome';
import { createIconSetFromFontello } from 'react-native-vector-icons';

import WithTheme from '../container/WithTheme';

let Icon = __Icon__;

/* eslint-disable max-len */
/**
 *
 * @augments {PureComponent<{size: number, color: string, secondary: boolean, accent: boolean, divider: boolean}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    secondary: PropTypes.bool,
    accent: PropTypes.bool,
    divider: PropTypes.bool
  };

  render() {
    const { secondary, accent, divider } = this.props;

    return (
      <WithTheme>
        {theme =>
          <Icon
            color={
              divider
                ? theme.divider
                : accent
                  ? theme.accent
                  : secondary
                    ? theme.secondary
                    : theme.primary
            }
            {...this.props}
          />}
      </WithTheme>
    );
  }
}

export let createIcon = config => {
  if (config) {
    Icon = createIconSetFromFontello(config);
  }
};
