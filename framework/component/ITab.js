import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width
};

export default class extends Component {
  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap(this.props.sceneMap);

  render() {
    return (
      <TabViewAnimated
        navigationState={this.props.navigationState}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        initialLayout={initialLayout}
        {...this.props}
      />
    );
  }
}
