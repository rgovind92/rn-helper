import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { TextInputLayout } from 'rn-textinputlayout';
import { moderateScale } from 'react-native-size-matters';

import WithTheme from '../container/WithTheme';
import IText from './IText';

const height = 40;
const width = '100%';
const fontSize = moderateScale(12, 0.1);
const styles = StyleSheet.create({
  style: {
    fontSize,
    height,
    width,
    color: '#414141'
  },
  errorPanel: {
    marginTop: 8
  }
});

/* eslint-disable max-len */
/** 
 *
 *  @augments {PureComponent<{value: string, onChange: Function, onChangeText: Function, checkValid: Function, style: number, contentContainerStyle: number, numberOfLines: number, secondary: boolean, accent: boolean, divider: boolean}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    checkValid: PropTypes.func,
    style: PropTypes.any,
    contentContainerStyle: PropTypes.any
  };

  render() {    
    const {
      checkValid = () => true,
      style,
      contentContainerStyle,
      input,
      meta,
      ...rest
    } = this.props;

    return (
      <WithTheme>
        {({ primary, accent }) =>
          <React.Fragment>
            <TextInputLayout
              style={contentContainerStyle}
              hintColor={primary}
              focusColor={primary}
              errorColor={accent}
              checkValid={checkValid}
            >
              {input
                ?
                <TextInput
                  {...rest}
                  onChangeText={input.onChange}
                  onBlur={input.onBlur}
                  onFocus={input.onFocus}
                  value={input.value}
                  style={[styles.style, style]}
                />
                :
                <TextInput
                  {...rest}
                  style={[styles.style, style]}
                />}
            </TextInputLayout>
            <View style={styles.errorPanel}>
              {meta && meta.visited && meta.invalid
                ?
                <IText style={{ color: accent }}>
                  {meta.error}
                </IText>
                :
                null}
            </View>            
          </React.Fragment>}
      </WithTheme>
    );
  }
}
