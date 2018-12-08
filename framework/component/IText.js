import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { moderateScale } from 'react-native-size-matters';
import memoize from 'memoize-one';

import WithLocale from '../container/WithLocale';
import WithTheme from '../container/WithTheme';
import { format } from '../util';

const getLocalizedString = ({ strings, currentLocale }, code) =>
  strings[currentLocale][code];

export const fontSize = moderateScale(12, 0.1);

// TODO: Fin out if we really need to memoize this. Or will RN do that for us?
const getStyle = memoize(color => StyleSheet.create({
  text: {
    color,
    fontSize
  }
}).text);

/* eslint-disable max-len */
/** 
 *
 *  @augments {PureComponent<{style: number, interpolate: boolean, numberOfLines: number, secondary: boolean, accent: boolean, divider: boolean}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    interpolate: PropTypes.bool,
    style: PropTypes.any,
    numberOfLines: PropTypes.number,
    secondary: PropTypes.bool,
    accent: PropTypes.bool,
    divider: PropTypes.bool
  };

  render() {
    const { children, style, secondary, accent, divider, interpolate, ...rest } = this.props;

    return (
      <WithLocale>
        {locale => (
          <WithTheme>
            {colors => (
              <Text
                style={[
                  getStyle(divider
                    ? colors.dividerText
                    : accent
                      ? colors.accentText
                      : secondary
                        ? colors.secondaryText
                        : colors.primaryText),
                  style
                ]}
                {...rest}
              >
                {interpolate
                  ?
                  format({
                    string: getLocalizedString(locale, children.code),
                    args: children.errorData
                  })
                  :
                  locale.strings[locale.currentLocale][children] || children}
              </Text>
            )}
          </WithTheme>
        )}
      </WithLocale>
    );
  }
}
