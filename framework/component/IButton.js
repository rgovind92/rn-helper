/* RN did not initially have a button component, hence this one. 
TODO: Investigate if memoization is really helpful here. The cached values
will be stored in memory, we would want to memoize only a limited number of parameters,
and assume that each parameter takes only one of a few values.  */
import React, { PureComponent } from 'react';
import {
  ActivityIndicator,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Easing,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { memoize } from 'lodash';
import { moderateScale } from 'react-native-size-matters';

import Icon from './Icon';
import IText from './IText';
import WithTheme from '../container/WithTheme';

//const ANIMATIONS = true;
const useNativeDriver = true;
const easing = Easing.out(Easing.circle);
const duration = 1500;

const ButtonIcon = props => (
  <Icon
    style={props.iconEnd
      ? [styles.horizontalIconStyle, props.iconStyle]
      : props.iconStyle}
    name={props.icon}
    color={props.iconColor || props.textColor}
    size={props.iconSize || 16}
  />
);

const Element = props => {
  const {
    textColor,
    icon,
    iconEnd,
    title,
    truncateText,
    textStyle,
    contentContainerStyle
  } = props;

  return (
    <View
      pointerEvents='none'
      style={iconEnd
        ? [styles.horizontalContentContainerStyle, contentContainerStyle]
        : [styles.contentContainerStyle, contentContainerStyle]}
    >
      {icon && !iconEnd ? <ButtonIcon {...props} /> : null}
      {title ? (
        <IText
          numberOfLines={truncateText ? 1 : null}
          style={[
            styles.textStyle,
            {
              color: textColor,
              marginLeft: icon ? 8 : 0
            },
            textStyle
          ]}
        >
          {title}
        </IText>
      ) : null}
      {icon && iconEnd ? <ButtonIcon {...props} /> : null}
    </View>
  );
};

/* eslint-disable max-len */
/**
 *
 * @augments {PureComponent<{title: string, onPress: Function, disabled: boolean, isFetching: boolean, rippleSize: number, style: number, wrapperStyle: number, backgroundColor: string, textColor: string, secondary: boolean, accent: boolean, divider: boolean, contentContainerStyle: number, textStyle: number, icon: string, iconEnd: boolean, truncateText: boolean}>}
 *
 */
export default class extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    isFetching: PropTypes.bool,
    rippleSize: PropTypes.number,
    style: PropTypes.any,
    wrapperStyle: PropTypes.any,
    contentContainerStyle: PropTypes.any,
    textStyle: PropTypes.any,
    icon: PropTypes.string,
    iconEnd: PropTypes.bool,
    truncateText: PropTypes.bool,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    secondary: PropTypes.bool,
    accent: PropTypes.bool,
    divider: PropTypes.bool
  };

  static defaultProps = {
    rippleSize: 350
  };

  state = {
    translateY: new Animated.Value(0),
    translateX: new Animated.Value(0),
    rippleScale: new Animated.Value(0),
    opacity: new Animated.Value(0),
    scale: new Animated.Value(1)
  };

  render() {
    return (
      <WithTheme>
        {theme => {
          const {
            disabled,
            isFetching,
            rippleSize,
            style,
            wrapperStyle,
            secondary,
            accent,
            divider,
            ...rest
          } = this.props;

          const {
            translateY,
            translateX,
            rippleScale,
            opacity,
            scale
          } = this.state;

          let [backgroundColor, textColor] = disabled || divider
            ? [theme.divider, theme.dividerText]
            : accent
              ? [theme.accent, theme.accentText]
              : secondary
                ? [theme.secondary, theme.secondaryText]
                : [theme.primary, theme.primaryText];
          
          if (this.props.backgroundColor) {
            backgroundColor = this.props.backgroundColor;
          }
          if (this.props.textColor) {
            textColor = this.props.textColor;
          }
                    
          return (
            <TouchableOpacity
              onPressIn={this._onPressIn}
              onPressOut={this._onPressOut}
              onPress={this._onPress}
              activeOpacity={1}
              style={wrapperStyle}
            >
              <Animated.View
                style={[
                  getButtonStyle(backgroundColor, theme.borderRadius, scale)
                    .button,
                  {
                    transform: [
                      {
                        scale
                      }
                    ]
                  },
                  style
                ]}
              >
                {isFetching
                  ?
                  <ActivityIndicator
                    color={textColor}
                    size={Platform.OS === 'ios' ? 'small' : moderateScale(14)}
                  />
                  :
                  <Element
                    {...rest}
                    pointerEvents='none'
                    context={theme}
                    textColor={textColor}
                  />}
                <Animated.View
                  style={[
                    getRippleStyle(rippleSize, textColor).ripple,
                    {
                      backgroundColor: textColor,
                      opacity,
                      transform: [
                        {
                          translateX
                        },
                        {
                          translateY
                        },
                        {
                          scale: rippleScale
                        }
                      ]
                    }
                  ]}
                  pointerEvents='none'
                />
              </Animated.View>
            </TouchableOpacity>
          );
        }}
      </WithTheme>
    );
  }

  _onPressIn = e => {
    if (!(this.props.disabled || this.props.isFetching)) {
      this.animateIn(e);
    }
  };

  _onPressOut = e => {
    if (!(this.props.disabled || this.props.isFetching)) {
      this.animateOut(e);
    }
  };

  _onPress = e => {
    if (!(this.props.disabled || this.props.isFetching)) {
      this.props.onPress && this.props.onPress(e);
    }
  };

  animateIn = e => {
    const { rippleSize } = this.props;
    const { translateY, translateX, rippleScale, opacity, scale } = this.state;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: e.nativeEvent.locationY - rippleSize / 2,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(translateX, {
          toValue: e.nativeEvent.locationX - rippleSize / 2,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(rippleScale, {
          toValue: 0,
          duration: 0,
          useNativeDriver
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver
        })
      ]),
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 0.8,
          duration,
          easing,
          useNativeDriver
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration,
          easing,
          useNativeDriver
        }),
        Animated.timing(scale, {
          toValue: 0.9,
          duration,
          easing,
          useNativeDriver
        })
      ]),
      Animated.parallel([
        Animated.timing(rippleScale, {
          toValue: 1,
          duration,
          easing,
          useNativeDriver
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          easing,
          useNativeDriver
        })
      ])
    ]).start();
  };

  animateOut = () => {
    const { opacity, rippleScale, scale } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(rippleScale, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration,
        easing,
        useNativeDriver
      })
    ]).start();
  };
}

const getButtonStyle = memoize((backgroundColor, borderRadius) =>
  StyleSheet.create({
    button: {
      padding: 10,
      overflow: 'hidden',
      borderRadius,
      backgroundColor
    }
  }));

const getRippleStyle = memoize(rippleSize =>
  StyleSheet.create({
    ripple: {
      position: 'absolute',
      width: rippleSize,
      height: rippleSize,
      borderRadius: rippleSize / 2
    }
  }));

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center'
  },
  contentContainerStyle: {
    justifyContent: 'center'
  },
  horizontalContentContainerStyle: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  horizontalIconStyle: {
    marginLeft: 8
  }
});
