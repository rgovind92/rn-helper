import React, { PureComponent, Component } from 'react';
import {
  FlatList,
  View
} from 'react-native';
import RNFS from 'react-native-fs';

import { IText } from '../../component';
import { path } from '../../middleware/loggerMiddleware';
import { WithTheme, Ripple, IModal } from '../../container';

class Item extends PureComponent {
  render() {
    const { type, payload, dividerDark, dividerText } = this.props;

    return (
      <Ripple
        size={1000}
        color={dividerText}
        style={{
          height: 50,
          borderBottomWidth: 2,
          borderBottomColor: dividerDark,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 16,
          flexDirection: 'row'
        }}
        onPress={this.onPress}
      >
        <IText divider>{type}</IText>
        <IText divider style={{ width: 200, marginLeft: 16 }}>{JSON.stringify(payload)}</IText>
      </Ripple>
    );
  }

  onPress = () => this.props.onPress(this.props.payload);
}

export default class extends Component {
  static navigationOptions = {
    headerTitle: 'View Logs'
  };

  state = {
    actions: [],
    isModalVisible: false,
    activePayload: null,
    activeTime: null
  };

  render() {
    return (
      <WithTheme>
        {({ dividerDark, dividerText }) => (
          <View
            style={{
              flex: 1,
              height: 50,
              borderBottomWidth: 2,
              borderBottomColor: dividerDark
            }}
          >
            <FlatList
              data={this.state.actions}
              renderItem={({ item }) => this._renderItem(item, dividerDark, dividerText)}
              keyExtractor={(item, index) => '' + index}
            />
            <IModal
              isVisible={this.state.isModalVisible}
              onBackdropPress={this.hideModal}
              style={{
                padding: 16,
                justifyContent: 'center'
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <IText divider style={{ marginLeft: 16, marginRight: 16}}>Payload: </IText>
                <IText divider>{this.state.activePayload}</IText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <IText divider style={{ marginLeft: 16, marginRight: 16}}>Time: </IText>
                <IText divider>{this.state.activeTime}</IText>
              </View>
            </IModal>
          </View>
        )}
      </WithTheme>
    );
  }

  componentDidMount() {
    RNFS.readFile(path)
      .then(actions => {
        this.setState({
          actions: actions.split('\n').filter(_ => _ !== '').map(_ => JSON.parse(_))
        });
      })
      .catch(() => {});
  }

  _renderItem = (item, dividerDark, dividerText) =>
    <Item
      type={item.type}
      payload={item.payload}
      dividerDark={dividerDark}
      dividerText={dividerText}
      onPress={this.showModal}
    />;

  hideModal = () => this.setState({
    isModalVisible: false
  });

  showModal = (activePayload, activeTime) => this.setState({
    isModalVisible: true,
    activePayload: JSON.stringify(activePayload),
    activeTime
  });
}
