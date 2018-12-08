import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { connect } from 'react-redux';
import invariant from 'fbjs/lib/invariant';

import { pushNotificationReceived } from '../actions';

export default (Wrapped, pushURL) => {
  class Wrapper extends Component {
    constructor() {
      super();
      invariant(pushURL,
        'pushURL must be defined and passed to WithNotifications to receive push notifications!');
    }

    render() {
      const { pushNotificationGroup, pushNotificationReceived, ...rest } = this.props,
        source = {
          uri: pushURL + 'rtns-client'
        },
        script = `
          rtnsClient.url = '${pushURL}';
          rtnsClient.notificationType = '${pushNotificationGroup}';
          rtnsClient.initialize();
          rtnsClient.register();
        `;

      return (
        <React.Fragment>
          <Wrapped {...rest} />
          {pushNotificationGroup
            ? <View style={styles.invisible}>
              <WebView source={source}
                allowUniversalAccessFromFileURLs={true}
                injectedJavaScript={script}
                onMessage={msg => {
                  pushNotificationReceived(msg.nativeEvent.data);
                }}
              />
            </View>
            : null} 
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = state => ({
    pushNotificationGroup: state.common.pushNotificationGroup
  });

  const mapDispatchToProps = dispatch => ({
    pushNotificationReceived: payload => dispatch(pushNotificationReceived(payload))
  });

  const Connected = connect(mapStateToProps, mapDispatchToProps)(Wrapper);
  Connected.navigationOptions = Wrapped.navigationOptions;

  return Connected;
};

const styles = StyleSheet.create({
  invisible: {
    display: 'none'
  }
});
