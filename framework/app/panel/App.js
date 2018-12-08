import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ISnackBar from '../../component/ISnackBar';
import IDialog from '../../component/IDialog';
import { setTopLevelNavigator } from '../../navigation';

export default class extends Component {
  render() {
    const {
      routes: App,
      dispatch,
      snackbarVisible,
      onLayout
    } = this.props;

    return (
      <View style={styles.container} onLayout={onLayout}>
        <App ref={ref => setTopLevelNavigator(ref, dispatch)} />
        <ISnackBar
          contentContainerStyle={styles.snackbarContainer}
          style={styles.snackbar}
          active={snackbarVisible}
          onDismiss={this.hideSnackbar}
          text='Press back once more to Log out / Exit'
        />
        <IDialog />
      </View>
    );
  }

  hideSnackbar = () => {
    this.props.updateSnackbarVisibility(false);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  snackbarContainer: {
    backgroundColor: '#090909',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60
  },
  snackbar: {
    flex: 1
  },
  snackbarText: {
    color: '#FFF',
    marginLeft: 16
  }
});
