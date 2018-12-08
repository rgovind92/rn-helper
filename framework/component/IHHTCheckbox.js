import React, { PureComponent } from 'react';
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
});