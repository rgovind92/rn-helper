import React, { PureComponent } from 'react';
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
});