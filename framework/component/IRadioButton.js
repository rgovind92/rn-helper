import React, { Component, PureComponent } from 'react';
import { Animated, StyleSheet, View, Easing } from 'react-native';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import Svg, { Path } from 'react-native-svg';
// import { svgPathProperties } from 'svg-path-properties';

import { Ripple } from '../container';
import IText from './IText';

const AnimatedPath = Animated.createAnimatedComponent(Path);
// 74.9 = viewBox / 2 (150 / 2)
// 8 = strokeWidth / 2 (16 / 2)
// 67 = viewBox / 2 - strokeWidth / 2 ((150 / 2) - (16 / 2))
const border = 'M 74.9 8 A 67 67 0 1 0 75 8 z';
const easing = Easing.out(Easing.circle);

/* const borderLength = Math.ceil(svgPathProperties(border).getTotalLength()); */
const borderLength = 447;

/* eslint-disable max-len */
/**
 *
 * @augments {Component<{value: boolean, onValueChange: Function, size: number, rippleSize: number, rippleColor: string, color: string, borderColor: string, end: boolean, style: number, contentContainerStyle: number}>}
 *
 */
export class WithRadioButton extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleColor: PropTypes.number,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    activeBorderColor: PropTypes.string,
    end: PropTypes.bool,
    style: PropTypes.any,
    contentContainerStyle: PropTypes.any,
  };

  constructor(props) {
    super(props);

    const { input, value } = props;
    const initialValue = (input && input.value) || value;

    invariant((
      input
      && input.value !== null
      && input.value !== undefined
    ) || (
      value !== null
      && value !== undefined
    ),
    'value is a mandatory prop for ICheckbox!');

    this.anim = new Animated.Value(initialValue ? 0 : 1);
    this.scale = new Animated.Value(initialValue ? 0.6 : 0.1);
  }

  render() {
    const {
      size = 20,
      rippleSize,
      rippleColor,
      color = '#414141',
      borderColor = '#CECECE',
      activeBorderColor = '#414141',
      end,
      style,
      contentContainerStyle,
      children
    } = this.props;

    const borderAnim = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, borderLength]
    });

    const opacity = this.scale.interpolate({
      inputRange: [0.1, 0.6, 1],
      outputRange: [0, 1, 1]
    });

    return (
      <Ripple
        size={rippleSize}
        color={rippleColor}
        onPressOut={this.onPressOut}
        onPressIn={this.onPressIn}
        onPress={this.onPress}
        wrapperStyle={contentContainerStyle}
        style={[styles.container, style]}
      >
        {!end ? children : null}
        <View>
          <Svg height={size} width={size} viewBox='0 0 150 150'>
            <Path
              d={border}
              stroke={borderColor}
              strokeWidth={16}
              fill='none'
            />
            <AnimatedPath
              d={border}
              stroke={activeBorderColor}
              strokeWidth={16}
              strokeDasharray={[borderLength, borderLength]}
              strokeDashoffset={borderAnim}
              fill='none'
            />
          </Svg>
          <Animated.View
            style={[end ? styles.circleLeft : styles.circleRight, {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
              borderColor: color,
              opacity,
              transform: [{
                scale: this.scale
              }]
            }]}
          />
        </View>
        {end ? children : null}
      </Ripple>
    );
  }

  componentWillUpdate(nextProps) {
    const nextValue = (nextProps.input && nextProps.input.value) || nextProps.value;
    
    Animated.parallel([
      Animated.timing(this.anim, {
        toValue: nextValue
          ? 0
          : 1,
        useNativeDriver: true,
        duration: 300,
        easing
      }),
      Animated.timing(this.scale, {
        toValue: nextValue
          ? 0.6
          : 0.01,
        useNativeDriver: true,
        duration: 300,
        easing
      })
    ]).start();
  }

  onPress = () => {
    const { input, value, onValueChange } = this.props;

    if (input) {
      input.onChange(!input.value);
      onValueChange && onValueChange(!input.value);
    }
    else {
      onValueChange && onValueChange(!value);
    }
  };

  onPressIn = () => {
    const { input, value } = this.props;

    Animated.parallel([
      Animated.timing(this.anim, {
        toValue: (input && input.value) || value ? 1 : 0,
        useNativeDriver: true,
        easing
      }),
      Animated.timing(this.scale, {
        toValue: 1,
        useNativeDriver: true,
        easing
      })
    ]).start();
  };

  onPressOut = () => {
    const { input, value } = this.props;

    Animated.parallel([
      Animated.timing(this.anim, {
        toValue: (input && input.value) || value ? 0 : 1,
        useNativeDriver: true,
        easing
      }),
      Animated.timing(this.scale, {
        toValue: (input && input.value) || value ? 1 : 0.1,
        useNativeDriver: true,
        easing
      })
    ]).start();
  }
}

/* eslint-disable max-len */
/**
 *
 * @augments {Component<{label: string, labelStyle: number, value: boolean, onValueChange: Function, size: number, rippleSize: number, rippleColor: string, color: string, borderColor: string, end: boolean, style: number, contentContainerStyle: number}>}
 *
 */
export default class extends PureComponent {
  render() {
    const { label, labelStyle, ...rest } = this.props;

    return (
      <WithRadioButton {...rest}>
        {label
          ?
          <IText divider style={[styles.label, labelStyle]}>{label}</IText>
          :
          null}
      </WithRadioButton>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginLeft: 8,
    marginRight: 8
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8
  },
  circleLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderWidth: 1
  },
  circleRight: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderWidth: 1
  }
});

// Lightweight version:

/*import React, { PureComponent } from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Easing,
  View
} from 'react-native';
import invariant from 'fbjs/lib/invariant';

import Icon from './Icon';

const easing = Easing.out(Easing.circle);
const duration = 300;

export default class extends PureComponent {
  constructor(props) {
    super(props);
    const { input, value } = props;

    invariant((input
      && input.value !== null
      && input.value !== undefined)
      ||
      (value !== null
      && value !== undefined),
    'value is a mandatory prop for IRadioButton!');

    this.state = {
      scale:
        (input && input.value) || value
          ? new Animated.Value(0.8)
          : new Animated.Value(0)
    };
  }

  onPress = () => {
    const { input, value, onValueChange } = this.props;

    if (input) {
      input.onChange(!input.value);
    }
    else {
      onValueChange && onValueChange(!value);
    }
  };

  componentWillUpdate(nextProps) {
    if (
      (nextProps.input && nextProps.input.value !== this.props.input.value) ||
      nextProps.value !== this.props.value
    ) {
      Animated.timing(this.state.scale, {
        toValue:
          (nextProps.input && nextProps.input.value) || nextProps.value
            ? 0.8
            : 0,
        duration,
        easing
      }).start();
    }
  }

  render() {
    const { input, style, value, size } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={1}        
        hitSlop={this.hitSlop}
      >
        <View style={[styles.container, style]}>
          {(input && input.value) || value
            ? <Animated.View
              style={[
                styles.circle,
                {
                  transform: [
                    {
                      scale: this.state.scale
                    }
                  ]
                }
              ]}
            >
              <Icon name='circle' size={size || 16} />
            </Animated.View>
            : null}
        </View>
      </TouchableOpacity>
    );
  }
  
  hitSlop = { top: 16, left: 16, bottom: 16, right: 16 };
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#414141',
    borderRadius: 12,
    height: 24,
    width: 24
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    opacity: 0.8
  }
});*/
