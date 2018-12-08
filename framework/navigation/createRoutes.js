import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import LikeLogin from '../app/container/LikeLogin';
import WithMenu from '../app/container/WithMenu';

import DefaultLogin from '../app/panel/Login';
import DefaultMenu from '../app/panel/Menu';
import DefaultHeader from '../app/panel/Header';
import DefaultFooter from '../app/panel/Footer';

import { slideFromRightTransition } from './animations';
import config from '../config';

export default ({ routes }) => {
  const { Header, Footer, Menu, Login, ...remainingRoutes } = routes;

  const MainStack = createStackNavigator(remainingRoutes, {
    initialRouteName: config.navigation.landingPage,
    transitionConfig: slideFromRightTransition,
    navigationOptions: () => ({
      header: Header ? Header : props => <DefaultHeader {...props} />,
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1
      },
      headerTintColor: config.colors.primary.text,
      gesturesEnabled: false
    })
  });

  const AddFooterTo = ({ Stack, Footer }) => {
    class StackWithFooter extends Component {
      render() {
        return (
          <React.Fragment>
            <Stack {...this.props} />
            <Footer />
          </React.Fragment>
        );
      }
    }
    StackWithFooter.router = Stack.router;

    return StackWithFooter;
  };
  
  const createMainStack = () =>
    config.navigation.menu
      ?
      createDrawerNavigator({
        Stack: {
          screen: config.navigation.footer
            ?
            AddFooterTo({
              Stack: MainStack,
              Footer: Footer || DefaultFooter
            })
            :
            MainStack
        }
      }, {
        contentComponent: WithMenu(Menu || DefaultMenu),
        initialRouteName: 'Stack'
      })
      :
      config.navigation.footer
        ?
        AddFooterTo({
          Stack: MainStack,
          Footer: Footer || DefaultFooter
        })
        :
        MainStack;

  return config.navigation.login
    ? createStackNavigator({
      Login: {
        screen: Login ? LikeLogin(Login) : LikeLogin(DefaultLogin),
        headerMode: 'none'
      },
      Main: {
        screen: createMainStack()
      }
    },
    {
      transitionConfig: slideFromRightTransition,
      navigationOptions: {
        header: null
      }
    })
    : createMainStack();
};
