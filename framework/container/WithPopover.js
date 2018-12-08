import React, { Component, Fragment } from 'react';
import PropsTypes from 'prop-types';
import Popover from 'react-native-popover-view';

export default Wrapped =>
  /* eslint-disable max-len */
  /** 
   *
   *  @augments {Component<{isPopoverVisible: boolean, onPopoverClose: Function, placement: string}>}
   *
   */
  class extends Component {
    static propTypes = {
      isPopoverVisible: PropsTypes.bool,
      onPopoverClose: PropsTypes.func,
      placement: PropsTypes.string
    };

    render() {
      const { isPopoverVisible, onPopoverClose, placement, children, ...rest } = this.props;
      
      return (
        <Fragment>
          <Wrapped
            {...rest}
            ref={this.setRef}
          />
          <Popover
            isVisible={isPopoverVisible}
            onClose={onPopoverClose}
            fromView={this.ref}
            placement={placement}
          >
            {children}
          </Popover>
        </Fragment>
      );
    }

    setRef = ref => this.ref = ref;
  };

/* import { findNodeHandle, NativeModules } from 'react-native';
import { Popover } from 'react-native-modal-popover';

/*export default Wrapped =>
  class extends Component {
    state = {
      popoverAnchor: { x: 0, y: 0, width: 0, height: 0 }
    };

    render() {
      const { isPopoverVisible, onPopoverClose, placement, children, ...rest } = this.props;

      return (
        <Fragment>
          <Wrapped
            {...rest}
            onLayout={this.measure}
            ref={ref => this.ref = ref}
          />
          <Popover
            visible={isPopoverVisible}
            onClose={onPopoverClose}
            fromRect={this.state.popoverAnchor}
            placement={placement}
          >
            {children}
          </Popover>
        </Fragment>
      );
    }

    measure = () => {
      const handle = findNodeHandle(this.ref);

      if (handle) {
        setTimeout(() => {
          NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
            this.setState({ popoverAnchor: { x, y, width, height } });
          });
        }, 500);
      }
    };
  }; */
