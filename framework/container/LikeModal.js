import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import invariant from 'fbjs/lib/invariant';
import memoize from 'memoize-one';

import WithTheme from './WithTheme';

export default Wrapped =>
  /* eslint-disable max-len */
  /** 
   *
   *  @augments {Component<{isVisible: boolean, onBackdropPress: Function, style: number, isBottomSheet: boolean, swipeDirection: string, animationIn: string, animationOut: string}>}
   *
   */
  class extends Component {
    static propTypes = {
      isVisible: PropTypes.bool,
      onBackdropPress: PropTypes.func,
      style: PropTypes.any,
      isBottomSheet: PropTypes.bool,
      swipeDirection: PropTypes.string,
      animationIn: PropTypes.string,
      animationOut: PropTypes.string
    };

    constructor(props) {
      super(props);
      const { isVisible, onBackdropPress } = props;

      invariant(isVisible !== null &&
        isVisible !== undefined, 'isVisible is a mandatory prop for LikeModal!');
      invariant(onBackdropPress !== null &&
        onBackdropPress !== undefined, 'onBackdropPress is a mandatory prop for LikeModal!');
    }

    render() {      
      const {
        isVisible,
        style,
        animationIn = 'zoomIn',
        animationOut = 'zoomOut',
        isBottomSheet = false,
        swipeDirection,
        onBackdropPress,
        ...rest
      } = this.props;

      return (
        <WithTheme>
          {({ borderRadius, divider }) => (
            <Modal
              animationIn={isBottomSheet ? 'slideInUp' : animationIn}
              animationOut={isBottomSheet ? 'slideOutDown' : animationOut}
              swipeDirection={isBottomSheet ? 'down' : swipeDirection}
              isVisible={isVisible || false}
              style={isBottomSheet ? styles.bottomSheetContainer : styles.container}
              onBackdropPress={onBackdropPress}
            >
              <Wrapped
                {...rest}
                style={[
                  getModalStyle(borderRadius, divider),
                  styles.modal,
                  style
                ]}
              />
            </Modal>
          )}
        </WithTheme>
      );
    }
  };

const getModalStyle = memoize((borderRadius, backgroundColor) => StyleSheet.create({
  o: {
    backgroundColor,
    borderRadius
  }
}).o);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomSheetContainer: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modal: {
    width: 400,
    //height: 400
  }
});
