import React, { PureComponent } from 'react';
import { Picker } from 'react-native';
import PropTypes from 'prop-types';

/**
 *
 * @augments {PureComponent<{selectedValue: any, onValueChange: Function}>}
 *
 */
class IPicker extends PureComponent {
  static propTypes = {
    selectedValue: PropTypes.any,
    onValueChange: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.selectedValue
    };
  }

  render() {
    const { input, onValueChange, ...rest } = this.props;

    return (
      <Picker
        selectedValue={input ? this.state.value : this.props.value}
        onValueChange={value => {
          if (input) {
            input.onChange(value);
            onValueChange && onValueChange(value);
            this.setState({ value });
          }
          else { 
            this.props.onValueChange( value ); 
          }
          
        }}
        {...rest}
      />
    );
  }
}

IPicker.Item = Picker.Item;

export default IPicker;

