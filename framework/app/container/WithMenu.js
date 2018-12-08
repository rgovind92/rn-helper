import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation';

import { logout } from '../../commands';

import { push, popTo, reset } from '../../navigation';

export default Wrapped => {
  class Wrapper extends Component {
    render() {
      return <Wrapped {...this.props} navigate={this.navigate} />;
    }

    navigate = item => {
      if (item.id !== this.props.currentRoute) {
        const { logout } = this.props;
  
        if (item.id === 'Logout') {
          logout();     
          // popTo('Login');
          reset(); // Workaround that first does popTo('Home'), and then pop()
        }
        else if (item.id === 'Home') {
          popTo('Home');
        }
        else {
          popTo('Home');
          push(item.id);
        }
      }
      this.props.navigation.dispatch(DrawerActions.closeDrawer());
    };
  }

  const mapStateToProps = state => ({
    menuItems: state.common.childMenuItems,
    currentRoute: state.navigation.stack[state.navigation.stack.length - 1]
  });

  const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
  });

  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
};
