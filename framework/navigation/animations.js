import {
  Animated,
  Easing, 
  I18nManager
} from 'react-native';

const forInitial = props => {
  const { navigation, scene } = props,
    focused = navigation.state.index === scene.index,
    opacity = focused ? 1 : 0,
    // If not focused, move the scene far away.
    translate = focused ? 0 : 1000000;

  return {
    opacity,
    transform: [{ translateX: translate }, { translateY: translate }]
  };
};

const forHorizontal = props => {
  if (!props.layout.isMeasured) {
    return forInitial(props);
  }

  const { layout, position, scene } = props,
    { index } = scene,
    inputRange = [index - 1, index, index + 1],
    width = layout.initWidth,
    outputRange = I18nManager.isRTL
      ? [-width, 0, width * 0.3]
      : [width, 0, width * -0.8],
    translateY = 0,
    translateX = position.interpolate({
      inputRange,
      outputRange
    });

  return {
    transform: [{ translateX }, { translateY }]
  };
};

export const slideFromRightTransition = () => ({
  transitionSpec: {
    duration: 200,
    easing: Easing.inOut(Easing.circle),
    //easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
    timing: Animated.timing,
    useNativeDriver: true
  },
  screenInterpolator: forHorizontal
});