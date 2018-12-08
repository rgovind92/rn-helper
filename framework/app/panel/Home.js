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
    const { childMenuItems, orientation } = this.props;
    const menuItems = Object.keys(childMenuItems);

    return (
      <View style={styles.container}>
        <Loading
          loading={menuItems.length === 0}
          style={styles.wrapper}
        >
          <FlatList
            key={orientation}
            contentContainerStyle={styles.list}
            numColumns={2}
            data={menuItems.map(k => childMenuItems[k])}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => '' + index}
          />
        </Loading>
      </View>
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
        rippleSize={500}
        secondary
      />
    );
  }

  onPress = () => {
    this.props.onPress(this.props.item.id);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center'
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemContainer: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20
  },
  wrapper: {
    height: 540
  },
  wrapperLandscape: {
    height: 320
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
  textInputLayout: {
    width: 280,
    marginTop: 32,
    marginBottom: 32
  },
  textInput: {
    fontSize: 16,
    height: 40
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
