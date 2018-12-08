import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import IText from './IText';

const defaultHeight = 60;
const width = Dimensions.get('window').width;
const useNativeDriver = true;

/* eslint-disable max-len */
/**
 *
 * @augments {PureComponent<{active: boolean, onDismiss: Function, style: number, contentContainerStyle: number, text: string, touchables: array}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    active: PropTypes.bool,
    onDismiss: PropTypes.func,
    style: PropTypes.any,
    contentContainerStyle: PropTypes.any,
    text: PropTypes.string,
    touchables: PropTypes.array,
    infinite: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.state = {
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(props.active 
        ? 0
        : props.height || defaultHeight),
		
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.translateX
        }
      ], useNativeDriver),

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        const width = Dimensions.get('window').width;

        Animated.sequence([
          Animated.timing(this.state.translateX, {
            toValue:
              gestureState.dx < 0
                ? 10
                : gestureState.dx < 50
                  ? -10
                  : width,
            duration: 200,
            useNativeDriver
          }),
          Animated.timing(this.state.translateX, {
            toValue: gestureState.dx < 50 ? 0 : width,
            duration: 100,
            useNativeDriver
          })
        ]).start();

        if (gestureState.dx >= 50) {
          this.props.onDismiss && this.props.onDismiss();
        }
      },

      onShouldBlockNativeResponder: () => true
    });
  }

  componentWillUpdate(nextProps) {
    
    if (nextProps.active) {
      Animated.parallel([
        Animated.timing(this.state.translateX, {
          toValue: 0,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(this.state.translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver
        })
      ]).start();
    }
    else {
      Animated.timing(this.state.translateY, {
        toValue: this.props.height || defaultHeight,
        duration: 200,
        useNativeDriver
      }).start();
    }
  }

  render() {
    const opacity = this.state.translateX.interpolate({
      inputRange: [-1000, 0, 1000],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp'
    });
    
    return (
      <Animated.View
        style={[styles.snackbar,
          {
            opacity,
            transform: [
              {
                translateX: this.state.translateX
              },
              {
                translateY: this.state.translateY
              }
            ]
          },
          this.props.contentContainerStyle
        ]}
      >
        <View
          style={this.props.style}
          {...this._panResponder.panHandlers}
        >
          <IText style={styles.snackbarText}>
            {this.props.text}
          </IText>
        </View>
        {this.props.touchables && this.props.touchables()}
      </Animated.View>
    );
    
  }
}

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    flexDirection: 'row',
    left: 0,
    bottom: 0,
    width
  },
  snackbarText: {
    color: '#FFF',
    marginLeft: 16
  }
});
