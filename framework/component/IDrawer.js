import React, { Component } from 'react';
import {
  Dimensions,
  Animated,
  PanResponder,
  StyleSheet, 
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';

import IText from './IText';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

/* eslint-disable max-len */
/**
 *
 * @augments {Component<{activeSection: number, onActiveSectionChange: Function, snapPoints: Array<number>, text: string}>}
 *
 */
export default class extends Component {
  static propTypes = {
    activeSection: PropTypes.number,
    onActiveSectionChange: PropTypes.func,
    snapPoints: PropTypes.array,
    text: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      translateY: new Animated.Value(this.mapPropsToState(props)),
      translateYHandle: new Animated.Value(this.mapPropsToHandleState(props))
    };

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // Allow child elements to repsond to touch
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: () => {
        const { translateY, translateYHandle } = this.state;

        translateY.setOffset(translateY._value);
        translateY.setValue(0);
        
        translateYHandle.setOffset(translateYHandle._value);
        translateYHandle.setValue(0);
      },

      onPanResponderMove: (e, gestureState) => {
        this.state.translateY.setValue(gestureState.dy);
        this.state.translateYHandle.setValue(gestureState.dy);
      },

      onPanResponderTerminationRequest: () => true,

      onPanResponderRelease: (evt, gestureState) => {
        const { translateY, translateYHandle } = this.state;

        translateY.flattenOffset();
        translateYHandle.flattenOffset();

        this.props.onActiveSectionChange
            && this.props.onActiveSectionChange(this.getClosestSection(gestureState.moveY));
      },

      onShouldBlockNativeResponder: () => true
    });
  }

  mapPropsToState = ({ activeSection, snapPoints }) =>
    activeSection === -1
      ? this.getTop()
      : this.getTop() + snapPoints[activeSection];
    
  mapPropsToHandleState = ({ activeSection, snapPoints }) =>
    activeSection === -1
      ? this.getTop() + this.getBottom()
      : this.getTop() + snapPoints[activeSection] + this.getBottom();

  componentWillUpdate(nextProps) {
    Animated.parallel([
      Animated.spring(this.state.translateY, {
        toValue: this.mapPropsToState(nextProps),
        bounciness: 5
      }),
      Animated.spring(this.state.translateYHandle, {
        toValue: this.mapPropsToHandleState(nextProps),
        bounciness: 5
      })
    ]).start();
  }

  render() {
    const { translateY, translateYHandle } = this.state;
    const { children, text } = this.props;

    return (
      <React.Fragment>
        {this.props.activeSection !== -1
          ?
          <TouchableWithoutFeedback onPress={this.closeDrawer}>
            <Animated.View
              style={[
                styles.mask, {
                  opacity: translateY.interpolate({
                    inputRange: [this.getTop(), 0],
                    outputRange: [0, 0.5],
                    extrapolateRight: 'clamp'
                  })
                }
              ]}
            />
          </TouchableWithoutFeedback>
          :
          null}
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{
                translateY
              }]
            }]}
          {...this._panResponder.panHandlers}
        >
          {children}
        </Animated.View>
        <Animated.View
          style={[
            styles.panelHeader,
            {
              transform: [{
                translateY: translateYHandle
              }]
            }]} 
          {...this._panResponder.panHandlers}
        >
          {text
            ?
            <IText
              divider
              style={styles.text}
            >
              {text}
            </IText>
            :
            null}
        </Animated.View>
      </React.Fragment>
    );
  }

  closeDrawer = () => {
    this.props.onActiveSectionChange
      && this.props.onActiveSectionChange(-1);
  };

  getTop = () => {
    const { snapPoints } = this.props;
    return 0 - snapPoints[snapPoints.length - 1];
  }

  getBottom = () => {
    const { snapPoints } = this.props;
    return snapPoints[snapPoints.length - 1];
  }

  getClosestSection = y => {
    const snapPoints = this.props.snapPoints.sort((a, b) => a > b);

    if (y <= 50) {
      return -1;
    }

    if (y >= this.getBottom() - 50) {
      return snapPoints.length - 1;
    }

    for (let i = 0; i < snapPoints.length; i++) {
      if (y < snapPoints[i]) {
        return i;
      }
    }
  };
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    width,
    height,
    backgroundColor: '#000',
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    width: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    position: 'absolute',
    left: width / 2 - 40,
    top: 0
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    margin: 8
  },
  container: {
    alignItems: 'center',
    left: 0,
    top: 0,
    right: 0,
    position: 'absolute',
  },
  text: {
    margin: 8
  }
});

/* RN-Interactable implementation:

import React, { Component } from 'react';
import { Animated, Dimensions, View, StyleSheet } from 'react-native';
import Interactable from 'react-native-interactable';

const Screen = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height - 75
};

class IDrawer extends Component {
  constructor(props) {
    super(props);
    this._deltaY = new Animated.Value(30);
  }

  render() {
    return (
      <View style={styles.panelContainer} pointerEvents={'box-none'}>
        <Animated.View
          pointerEvents={'box-none'}
          style={[
            styles.mask, {
              backgroundColor: 'black',
              opacity: this._deltaY.interpolate({
                inputRange: [0, 500],
                outputRange: [1, 1],
                extrapolateRight: 'clamp'
              })
            }
          ]}
        />
        <Interactable.View
          verticalOnly={true}
          snapPoints={[{y: 0}, {y: 100}, {y: 300}]}
          initialPosition={{y: 0}}
          animatedValueY={this._deltaY}
          style={{alignItems: 'center', zIndex: 1}}
          boundaries={{y: -50}}
        >
          <View style={styles.panel}>
            
          </View>
          <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
          </View>
        </Interactable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelContainer: {
    position: 'absolute',
    top: -2 * Screen.height,
    bottom: 0,
    left: 0,
    right: 0
  },
  mask: {
    position: 'absolute',
    top: 0,
    height: Screen.height,
    left: 0,
    right: 0
  },
  panel: {
    height: 2 * Screen.height,
    backgroundColor: '#FFF',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
    justifyContent: 'flex-end',
    width: '100%'
  },
  panelHeader: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    width: 80,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040'
  }
});

export default IDrawer; */