import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';

import Icon from './Icon';

// TODO: Find out if we can customize the theme of the native picker without touching the res folder

/* eslint-disable max-len */
/**
 *
 * @augments {PureComponent<{date: Date, onDateChange: Function, mode: string, format: string}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    date: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func,
    mode: PropTypes.string,
    format: PropTypes.string
  };

  render() {
    const { date, input, mode = 'date', format = 'YYYY-MM-DD', ...rest } = this.props;

    return (
      <DatePicker
        style={styles.input}
        date={input && input.value ? input.value : date}
        mode={mode}
        format={format}
        iconComponent={this.iconComponent}
        customStyles={this.customStyles}
        onDateChange={this.onDateChange}
        {...rest}
      />
    );
  }

  iconComponent = 
    <Icon
      name='calendar'
      size={20}
      style={styles.iconStyle}
    />;

  customStyles = {
    dateInput: {
      borderWidth: 0
    }
  };

  onDateChange = date => {
    const { input, onDateChange } = this.props;

    if (input) {
      input.onChange(date);
    }
    else {
      onDateChange && onDateChange(date);
    }
  };
}

const styles = StyleSheet.create({
  input: {
    width: 150
  },
  iconStyle: {
    position: 'absolute',
    left: 0,
    top: 10,
    marginLeft: 8
  }
});
