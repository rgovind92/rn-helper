import React, { PureComponent } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  Easing,
  TouchableWithoutFeedback,
  PanResponder
} from 'react-native';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';

import WithTheme from '../container/WithTheme';

const easing = Easing.inOut(Easing.circle);
const MIN = 5;
const MAX = 40;

// TODO: Remove inline style; Remove unnecessary checks in CDU.

/* eslint-disable max-len */
/** 
 *
 *  @augments {PureComponent<{value: boolean, onValueChange: Function, style: number, backgroundColor: string, borderColor: string, positiveText: string, positiveColor: string, negativeText: string, negativeColor: string, textColor: string}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
    style: PropTypes.any,
    backgroundColor: PropTypes.string,
    borderColor: PropTypes.string,
    positiveText: PropTypes.string,
    positiveColor: PropTypes.string,
    negativeText: PropTypes.string,
    negativeColor: PropTypes.string,
    textColor: PropTypes.string
  };

  constructor(props) {
    super(props);
    const { input, value } = props;

    invariant((
      input && input.value !== null
    ) || (
      value !== null && value !== undefined
    ), 
    'value is a mandatory prop for ISwitch!');

    this.state = {
      translateX: new Animated.Value((input && input.value) || value
        ? MAX
        : MIN)
    };
  }

  onPress = () => {
    const { input, onValueChange, value } = this.props;

    if (input) {
      input.onChange(!input.value);
    }
    else {
      onValueChange && onValueChange(!value);
    }
  };

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        this.state.translateX.setOffset(this.state.translateX._value);
        this.state.translateX.setValue(0);
      },

      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.translateX
        }
      ]),

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        const { input, onValueChange } = this.props;
        this.state.translateX.flattenOffset();

        Animated.timing(this.state.translateX, {
          toValue: gestureState.dx <= 20 ? MIN : MAX,
          easing
        }).start();

        if (input) {
          input.onChange(gestureState.dx > 20);
        }
        else {
          onValueChange && onValueChange(gestureState.dx > 20);
        }
      },

      onShouldBlockNativeResponder: () => true
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.input && nextProps.input.value !== this.props.input.value
      || nextProps.value !== this.props.value) {
      Animated.timing(this.state.translateX, {
        toValue: nextProps.input && nextProps.input.value || nextProps.value
          ? MAX
          : MIN,
        easing
      }).start();
    }
  }

  render() {
    const {
      backgroundColor,
      borderColor,
      negativeColor,
      negativeText,
      positiveColor,
      positiveText,
      style,
      textColor,
      value,
      input
    } = this.props;

    return (
      <WithTheme>
        {({ divider, dividerText, accent, primary }) => (
          <TouchableWithoutFeedback onPress={this.onPress}>
            <View
              style={[
                styles.container,
                {
                  borderColor: borderColor || dividerText,
                  backgroundColor: backgroundColor || divider
                },
                style
              ]}
            >
              <Animated.View
                style={[
                  styles.circle,
                  {
                    backgroundColor: this.state.translateX.interpolate({
                      inputRange: [MIN, MAX],
                      outputRange: [
                        negativeColor || accent,
                        positiveColor || primary
                      ],
                      extrapolate: 'clamp'
                    }),
                    transform: [
                      {
                        translateX: this.state.translateX.interpolate({
                          inputRange: [MIN, MAX],
                          outputRange: [MIN, MAX],
                          extrapolate: 'clamp'
                        })
                      }
                    ]
                  }
                ]}
                {...this._panResponder.panHandlers}
              />
              {positiveText && negativeText ? (
                <Animated.Text
                  style={{
                    position: 'absolute',
                    left: 0,
                    color: textColor || dividerText,
                    transform: [
                      {
                        translateX: this.state.translateX.interpolate({
                          inputRange: [MIN, MAX],
                          outputRange: [35, 12],
                          extrapolate: 'clamp'
                        })
                      }
                    ]
                  }}
                >
                  {(input && input.value) || value
                    ? positiveText
                    : negativeText}
                </Animated.Text>
              ) : null}
            </View>
          </TouchableWithoutFeedback>
        )}
      </WithTheme>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center'
  },
  circle: {
    borderRadius: 10,
    borderWidth: 1,
    height: 20,
    width: 20
  }
});
