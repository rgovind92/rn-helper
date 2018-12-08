import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation';

export default Wrapped => withNavigationFocus(class extends Component {
  render() {
    const { interval, isFocused, setInterval, ...rest } = this.props; //eslint-disable-line

    return <Wrapped {...rest} />;
  }
  
  componentWillUpdate(nextProps) {
    if (!nextProps.isFocused) {
      clearInterval(this.interval);
      this.interval = null;
    }
    else if (nextProps.interval) {
      this.setInterval(nextProps.interval);
    }
  }

  setInterval = interval => {
    if (!this.interval) {
      this.interval = setInterval(() =>
        this.props.onInterval && this.props.onInterval(),
      interval);
    }
  };
});