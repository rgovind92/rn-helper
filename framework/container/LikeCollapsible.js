import React, { Component } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const defaultMinHeight = 50;
const defaultMaxHeight = 200;

export default Wrapped =>
  /** 
   *
   *  @augments {Component<{collapsed: boolean, onToggle: Function}>}
   *
   */
  class extends Component {
    static propTypes = {
      collapsed: PropTypes.bool,
      onToggle: PropTypes.func
    };

    constructor(props) {
      super(props);
      
      this.state = {
        height: new Animated.Value(props.collapsed
          ? props.minHeight || defaultMinHeight
          : props.maxHeight || defaultMaxHeight)
      };
    }

    componentWillMount() {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
          gestureState.dx != 0 && gestureState.dy != 0,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
          gestureState.dx != 0 && gestureState.dy != 0,
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          this.state.height.setOffset(this.state.height._value);
          this.state.height.setValue(0);
        },

        onPanResponderMove: Animated.event([
          null,
          {
            dy: this.state.height
          }
        ]),

        onPanResponderTerminationRequest: () => true,

        onPanResponderRelease: () => {
          this.state.height.flattenOffset();

          this.props.onToggle && this.props.onToggle(!this.props.collapsed);
        }
      });
    }

    render() {
      return (
        <Animated.View
          style={[styles.style, {
            height: this.state.height
          }]}
          {...this._panResponder.panHandlers}
        >
          <Wrapped {...this.props} />
        </Animated.View>
      );
    }

    componentWillUpdate(nextProps) {
      if (nextProps.collapsed !== this.props.collapsed) {
        Animated.spring(this.state.height, {
          toValue: nextProps.collapsed
            ? this.props.minHeight || defaultMinHeight
            : this.props.maxHeight || defaultMaxHeight,
          bounciness: 9
        }).start();
      }
    }
  };


const styles = StyleSheet.create({
  style: {      
    overflow: 'hidden',
    backgroundColor: 'transparent'
  }
});