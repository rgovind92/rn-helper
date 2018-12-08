// Instead of handling orientation changes at run time, its probably
// just better and easier to lock orientation and use make tabs use
// horizontal oritentation and phones vertical. This a horizontal list
// version of Home.js suitable for tabs (For reference only).
import React, { Component, PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import WithLoadingWheel from '../../container/WithLoadingWheel';
import IButton from '../../component/IButton';

import { push } from '../../navigation';

const Loading = WithLoadingWheel(View);

export default class extends Component {
  static navigationOptions = () => ({
    headerTitle: 'Home'
  });

  render() {    
    const { childMenuItems, isFetching } = this.props;

    return (
      <Loading loading={isFetching} style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          numColumns={4}
          data={Object.keys(childMenuItems).map(k => childMenuItems[k])}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => '' + index}
        />
      </Loading>
    );
  }

  _renderItem = ({ item }) =>
    <Item item={item} onPress={push} />
}

class Item extends PureComponent {
  render() {
    const { item } = this.props;

    return (
      <IButton
        contentContainerStyle={styles.buttonContainer}
        style={styles.item}
        iconStyle={styles.iconStyle}
        icon={item.icon}
        title={item.key}
        onPress={this.onPress}
        ripple
        rippleSize={800}
        secondary
      />
    );
  }

  onPress = () => this.props.onPress(this.props.item.id);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    justifyContent: 'center'
  },
  item: {
    width: 160,
    height: 160,
    margin: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.3
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  iconStyle: {
    marginBottom: 20
  }
});
