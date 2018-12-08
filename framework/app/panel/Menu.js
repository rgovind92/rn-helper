import React, { Component, PureComponent } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { memoize } from 'lodash';

import WithRipple from '../../container/WithRipple';
import config from '../../config';
import Icon from '../../component/Icon';
import IText from '../../component/IText';
import WithTheme from '../../container/WithTheme';

const RippleView = WithRipple(View);

export default class extends Component {
  render() {
    
    const { menuItems } = this.props;

    let items = Object.keys(menuItems).map(k => menuItems[k]),
      _menuItems = [{ key: 'Home', id: 'Home', icon: 'home' }].concat(items);

    if (config.navigation.login) {
      _menuItems = _menuItems.concat({
        key: 'Log out',
        id: 'Logout',
        icon: 'ban'
      });
    }

    return (
      <FlatList
        style={styles.menu}
        data={_menuItems}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => '' + index}
      />
    );
  }

  _renderItem = ({ item }) =>
    <MenuItem
      item={item}
      isSelected={this.props.currentRoute === item.id}
      navigate={this.navigate}
    />
  
  navigate = screen => this.props.navigate(screen);
}

class MenuItem extends PureComponent {
  render() {
    const { item, isSelected } = this.props;

    return (
      <WithTheme>
        {({ primary, primaryText, divider, dividerText, dividerDark }) => (
          <RippleView
            rippleSize={500}
            style={
              isSelected
                ? getItemStyle(primary, primary)
                : getItemStyle(divider, dividerDark)
            }
            onPress={this.navigate}
            divider={!isSelected}
          >
            <Icon
              divider={isSelected}
              name={item.icon}
              style={styles.icon}
              color={
                isSelected
                  ? primaryText
                  : dividerText
              }
            />
            <IText
              style={
                isSelected
                  ? getTextStyle(primaryText)
                  : getTextStyle(dividerText)
              }
            >
              {item.key}
            </IText>
          </RippleView>
        )}
      </WithTheme>
    );
  }

  navigate = () => this.props.navigate(this.props.item);
}

const getItemStyle = memoize((backgroundColor, borderBottomColor) => StyleSheet.create({
  o: {
    height: 60,
    backgroundColor,
    borderBottomColor,
    borderBottomWidth: 2,
    alignItems: 'center',
    flexDirection: 'row'
  }
}).o);

const getTextStyle = memoize(color => StyleSheet.create({
  o: {
    marginLeft: 16,
    color
  }
}).o);

const styles = StyleSheet.create({
  menu: {
    backgroundColor: config.colors.primary.background
  },
  icon: {
    marginLeft: 16
  }
});
