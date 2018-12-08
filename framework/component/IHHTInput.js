import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

/* eslint-disable max-len */
/**
 *
 * @augments {PureComponent<{value: string, onChange: Function, onChangeText: Function, onScan: Function, style: number}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onChangeText: PropTypes.func,
    onScan: PropTypes.func,
    style: PropTypes.any
  };

  render() {
    return <TextInput {...this.props} onChangeText={this.onChange} />;
  }
  
  onChange = nextValue => {
    const { value, onScan, onChangeText } = this.props;

    onChangeText(nextValue);
    if (nextValue.length - value.length > 1) {
      onScan(nextValue.substring(value.length));
    }
  };
}