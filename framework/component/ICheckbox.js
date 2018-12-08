import React, { Component, PureComponent } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import invariant from 'fbjs/lib/invariant';
import Svg, { Path } from 'react-native-svg';
// import { svgPathProperties } from 'svg-path-properties';

import { IText } from '.';
import { Ripple } from '../container';

const easing = Easing.out(Easing.circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const _boxBorderPath = `
  M4 4
  L146 4
  L146 146
  L4 146
  L4 0
`;
const boxBorderPath = `
  M4 4
  L146 4
  L146 146
  L4 146
  L4 0
`;
const borderPath = `
  M30 80
  L45 60
  L65 80
  L102.5 30
  L122.5 50
  L67 120
  L27 77
`;
const fillPath = `
  M37.5 67
  L77.5 110
  L67.5 100
  L112.5 40
`;

/* const boxBorderLength = Math.ceil(svgPathProperties(boxBorderPath).getTotalLength());
const borderLength = Math.ceil(svgPathProperties(borderPath).getTotalLength());
const fillLength = Math.ceil(svgPathProperties(fillPath).getTotalLength()); */

const boxBorderLength = 572;
const borderLength = 293;
const fillLength = 148;

/* eslint-disable max-len */
/**
 *
 * @augments {Component<{value: boolean, onValueChange: Function, size: number, rippleSize: number, rippleColor: string, color: string, borderColor: string, end: boolean, border: boolean, borderAnimation: boolean, style: number, contentContainerStyle: number}>}
 *
 */
export class WithCheckbox extends Component {
  static propTypes = {
    value: PropTypes.bool,
    onValueChange: PropTypes.func,
    size: PropTypes.number,
    rippleSize: PropTypes.number,
    rippleColor: PropTypes.string,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    end: PropTypes.bool,
    border: PropTypes.bool,
    borderAnimation: PropTypes.bool,
    style: PropTypes.any,
    contentContainerStyle: PropTypes.any
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

    this.boxBorderAnim = new Animated.Value(initialValue ? 0 : boxBorderLength);
    this.borderAnim = new Animated.Value(initialValue ? 0 : borderLength);
    this.fillAnim = new Animated.Value(initialValue ? 0 : fillLength);
  }

  render() {
    const {
      size = 30,
      rippleSize,
      rippleColor,
      color = '#414141',
      borderColor = '#CECECE',
      end,
      border = false,
      borderAnimation = true,
      style,
      contentContainerStyle,
      children
    } = this.props;

    return (
      <Ripple
        rippleSize={rippleSize}
        color={rippleColor}
        divider
        onPressIn={this.onPressIn}
        onPress={this.onPress}
        onPressOut={this.onPressOut}
        wrapperStyle={contentContainerStyle}
        style={[style, styles.container]}
      >
        {!end ? children : null}
        <Svg height={size} width={size} viewBox='0 0 150 150' >
          {border
            ?
            <Path
              ref={ref => this.ref = ref}
              d={_boxBorderPath}
              stroke={borderColor}
              strokeWidth={8}
              fill='none'
            />
            :
            null}
          {border && borderAnimation
            ?
            <AnimatedPath
              ref={ref => this.ref = ref}
              d={boxBorderPath}
              stroke={color}
              strokeWidth={8}
              strokeDasharray={[boxBorderLength, boxBorderLength]}
              strokeDashoffset={this.boxBorderAnim}
              fill='none'
            />
            :
            null}
          <AnimatedPath
            ref={ref => this.ref = ref}
            d={borderPath}
            stroke={color}
            strokeWidth={8}
            strokeDasharray={[borderLength, borderLength]}
            strokeDashoffset={this.borderAnim}
            fill='none'
          />
          <AnimatedPath
            ref={ref => this.ref2 = ref}
            d={fillPath}
            stroke={color}
            strokeWidth={25}
            strokeDasharray={[fillLength, fillLength]}
            strokeDashoffset={this.fillAnim}
            fill='none'
          />
        </Svg>
        {end ? children : null}
      </Ripple>
    );
  }

  onPressIn = () => {
    const { input, value } = this.props;

    if ((input && input.value) || value) {
      Animated.timing(this.fillAnim, {
        toValue: fillLength,
        useNativeDriver: true,
        easing
      }).start();
    }
    else {
      Animated.parallel([
        Animated.timing(this.boxBorderAnim, {
          toValue: 0,
          useNativeDriver: true,
          easing
        }),
        Animated.timing(this.borderAnim, {
          toValue: 0,
          useNativeDriver: true,
          easing
        })
      ]).start();
    }
  };

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

  onPressOut = () => {
    const { input, value } = this.props;

    if ((input && input.value) || value) {
      Animated.timing(this.fillAnim, {
        toValue: 0,
        useNativeDriver: true,
        easing
      }).start();
    }
    else {
      Animated.parallel([
        Animated.timing(this.boxBorderAnim, {
          toValue: boxBorderLength,
          useNativeDriver: true,
          easing
        }),
        Animated.timing(this.borderAnim, {
          toValue: borderLength,
          useNativeDriver: true,
          easing
        })
      ]).start();
    }
  };

  componentWillUpdate(nextProps) {
    const nextValue = (nextProps.input && nextProps.input.value) || nextProps.value;

    Animated.parallel([
      Animated.timing(this.boxBorderAnim, {
        toValue: nextValue ? 0 : boxBorderLength,
        useNativeDriver: true,
        easing
      }),
      Animated.timing(this.borderAnim, {
        toValue: nextValue ? 0 : borderLength,
        useNativeDriver: true,
        easing
      }),
      Animated.timing(this.fillAnim, {
        toValue: nextValue ? 0 : fillLength,
        useNativeDriver: true,
        easing
      })
    ]).start();
  }
}

/* eslint-disable max-len */
/**
 *
 * @augments {PureComponent<{label: string, labelStyle: number, value: boolean, onValueChange: Function, size: number, rippleSize: number, rippleColor: string, color: string, borderColor: string, end: boolean, border: boolean, borderAnimation: boolean, style: number, contentContainerStyle: number}>}
 *
 */
export default class extends PureComponent {
  render() {
    const { label, labelStyle, ...rest } = this.props;

    return (
      <WithCheckbox border={true} {...rest}>
        {label ? <IText divider style={[styles.label, labelStyle]}>{label}</IText> : null}
      </WithCheckbox>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  label: {
    marginLeft: 8,
    marginRight: 8
  }
});

// Lightweight version:

/*import React, { PureComponent } from 'react';
import {
  Animated,
  StyleSheet,
  Easing,
  View
} from 'react-native';
import invariant from 'fbjs/lib/invariant';

import Icon from './Icon';
import IText from './IText';
import { Ripple } from '../container';

const easing = Easing.out(Easing.circle);
const duration = 300;
const useNativeDriver = true;

const Element = ({ size, iconColor, scale }) =>
  <Animated.View
    style={{
      opacity: scale,
      transform: [{ scale }]
    }}
  >
    <Icon name='check'
      size={size || 20}
      color={iconColor} />
  </Animated.View>;

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
    'value is a mandatory prop for ICheckbox!');

    this.state = {
      scale:
        (input && input.value) || value
          ? new Animated.Value(0.8)
          : new Animated.Value(0)
    };
  }

  hitSlop = { top: 16, left: 16, bottom: 16, right: 16 };

  render() {
    const { 
      input, //eslint-disable-line
      value, //eslint-disable-line
      onChange, //eslint-disable-line
      rippleSize,
      style,
      size,
      label,
      labelStyle,
      contentContainerStyle,
      iconColor,
      ...rest
    } = this.props; 

    return (
      <Ripple
        rippleSize={rippleSize || 150}
        onPress={this.onPress}
        hitSlop={this.hitSlop}
        {...rest}>
        {label
          // React.Fragment does not seem to accept any prop except 'key', or else
          // we could have just used that as the container
          ?
          <View style={[styles.contentContainerStyle, contentContainerStyle]}>
            <View style={[styles.iconContainer, style]}>
              <Element size={size} iconColor={iconColor} scale={this.state.scale} />
            </View>
            <IText style={[styles.labelStyle, labelStyle]} {...rest}>{label}</IText>
          </View>
          :
          <View style={[styles.iconContainer, style]}>
            <Element size={size} iconColor={iconColor} scale={this.state.scale} />
          </View>}
      </Ripple>
    );
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
        easing,
        useNativeDriver
      }).start();
    }
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    borderWidth: 2,
    borderColor: '#414141',
    borderRadius: 2,
    width: 24,
    height: 24
  },
  labelContainer: {
    flexDirection: 'row'
  },
  labelStyle: {
    marginLeft: 8,
    marginRight: 8
  }
});*/