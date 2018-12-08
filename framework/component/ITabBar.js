import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import Icon from './Icon';
import { Ripple } from '../container';
import WithTheme from '../container/WithTheme';

export default props => {
  const inputRange = props.navigationState.routes.map((x, i) => i);
  
  return (
    <WithTheme>
      {({
        primary, primaryText, secondary, secondaryText,
        accent, accentText, divider, dividerText
      }) => {
        const [colorTheme, textColorTheme] = props.accent
          ? [accent, accentText]
          : props.secondary
            ? [secondary, secondaryText]
            : [primary, primaryText];        
        const { inverted } = props;

        return (
          <View
            style={[
              props.contentContainerStyle,
              props.vertical
                ? styles.tabBar
                : styles.tabBarHorizontal,
              { backgroundColor: inverted ? primary : divider }
            ]}
          >
            {props.navigationState.routes.map((route, i) => {
              const isSelected = props.navigationState.index === i;
              const color = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i
                    ? inverted
                      ? dividerText
                      : textColorTheme
                    : inverted
                      ? textColorTheme
                      : dividerText)
              });
              const backgroundColor = props.position.interpolate({
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i
                    ? inverted
                      ? divider
                      : colorTheme
                    : inverted
                      ? colorTheme
                      : divider)
              });

              return (
                <Ripple
                  onPress={props.onTabItemPressed.bind(null, i)}
                  key={'' + i}
                  color={isSelected
                    ?
                    inverted
                      ? dividerText
                      : primaryText
                    :
                    inverted
                      ? primaryText
                      : dividerText}
                  wrapperStyle={props.buttonWrapperStyle}
                >
                  <Animated.View
                    style={[
                      styles.touchable,
                      props.style,
                      {
                        backgroundColor                       
                      }
                    ]}
                  >
                    {props.icon
                      ?
                      <Icon
                        divider={inverted ? !isSelected : isSelected}
                        name={props.icon(route.key)}
                        style={styles.icon}
                      />
                      :
                      null}
                    <Animated.Text
                      style={[
                        styles.text,
                        {
                          color
                        }
                      ]}
                    >
                      {route.title}
                    </Animated.Text>
                  </Animated.View>
                </Ripple>
              );
            })}
          </View>
        );
      }}
    </WithTheme>
  );
};

const styles = StyleSheet.create({
  tabBar: {},
  tabBarHorizontal: {
    flexDirection: 'row'
  },
  touchable: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: moderateScale(12, 0.1)
  },
  icon: {
    marginBottom: 8
  }
});
