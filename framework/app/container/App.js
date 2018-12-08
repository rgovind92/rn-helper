import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler, Dimensions, Keyboard } from 'react-native';

import { ThemeProvider } from '../../context/ThemeContext';
import { LocaleProvider } from '../../context/LocaleContext';
import AppPanel from '../panel/App';
import {
  layoutChanged,
  errorCleared,
  keyboardVisibilityUpdated,
  minuteTicked
} from '../../actions';
import { logout } from '../../commands';
import config from '../../config';

import { pop } from '../../navigation';

class App extends Component {
  constructor(props) {
    super(props);
    
    if (config.exclude.indexOf('timer') === -1) {
      setInterval(() => {
        this.props.minuteTicked();
      }, 60000);
    }
  }

  waitingForDoubleTap = false;

  state = {
    snackbarVisible: false,
    isModalVisible: false
  };

  _onLayout = () => {
    let window = Dimensions.get('window');
    this.props.layoutChanged(window.width, window.height);
  };

  _keyboardDidShow = () => {
    this.props.keyboardVisibilityUpdated(true);
  };

  _keyboardDidHide = () => {
    this.props.keyboardVisibilityUpdated(false);
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
      this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
      this._keyboardDidHide);
    BackHandler.addEventListener('hardwareBackPress',
      this.onBackPress);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    BackHandler.removeEventListener('hardwareBackPress',
      this.onBackPress);
  }

  onBackPress = () => {    
    const {
        navigation,
        logout,
        isMenuOpen,
        menuToggled
      } = this.props,
      currentRoute = navigation.stack[navigation.stack.length - 1];

    if (isMenuOpen) {
      menuToggled();
      return true;
    }

    switch (currentRoute) {
      case 'Login':
        BackHandler.exitApp();
        return true;

      case 'Main':
      case config.navigation.landingPage:
        if (config.navigation.login) {
          if (this.waitingForDoubleTap) {
            logout();
            pop();
            // reset(); Doesn't work
            this.setState({
              snackbarVisible: false
            });
          }
          else {
            this.waitingForDoubleTap = true;

            let interval = setTimeout(() => {
              this.waitingForDoubleTap = false;
              clearInterval(interval);
            }, 2000);

            this.setState({
              snackbarVisible: true
            });
          }
        }
        else {
          BackHandler.exitApp();
        }
        return true;

      default:
        pop();
        return true;
    }
  }

  render() {
    const {
      config: {
        colors,
        strings
      }
    } = this.props;

    return (
      <ThemeProvider colors={colors}>
        <LocaleProvider strings={strings}>
          <AppPanel
            {...this.props}
            onLayout={this._onLayout}
            snackbarVisible={this.state.snackbarVisible}
            updateSnackbarVisibility={this._updateSnackbarVisibility}
          />
        </LocaleProvider>
      </ThemeProvider>
    );
  }

  _updateSnackbarVisibility = snackbarVisible => {
    this.setState({
      snackbarVisible
    });
  };
}

const mapStateToProps = state => ({
  navigation: state.navigation,
  isMenuOpen: state.common.isMenuOpen
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  errorCleared: () => dispatch(errorCleared()),
  keyboardVisibilityUpdated: isKeyboardVisible =>
    dispatch(keyboardVisibilityUpdated(isKeyboardVisible)),
  // TODO: Remove this, as we should probably just lock orientation
  layoutChanged: (width, height) => dispatch(layoutChanged(width, height)),
  pop: () => dispatch(pop()),
  logout: () => dispatch(logout()),
  minuteTicked: () => dispatch(minuteTicked())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
