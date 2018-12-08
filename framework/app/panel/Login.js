import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ITextInput from '../../component/ITextInput';
import IButton from '../../component/IButton';
import WithAutoDismissedKeyboard from '../../container/WithAutoDismissedKeyboard';

const DismissKeyboardView = WithAutoDismissedKeyboard(View);

export default class extends Component {
  render() {
    
    const { isFetching, userCode, userPassword } = this.props;
    
    return (
      <DismissKeyboardView style={styles.main}>
        <ITextInput
          value={userCode}
          onChange={this.updateUsername}
          style={styles.textInput}
          contentContainerStyle={styles.inputLayout}
          placeholder='Username'
          autoCapitalize='characters'
        />
        <ITextInput
          value={userPassword}
          onChange={this.updatePassword}
          style={styles.textInput}
          contentContainerStyle={styles.inputLayout}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <IButton
          isFetching={isFetching.mobilityLogin}
          title='Login'
          style={styles.loginButton}
          onPress={this.login}
        />
      </DismissKeyboardView>
    );
  }

  login = () => {
    const { login, userCode, userPassword } = this.props;
    login(userCode, userPassword);
  }

  updateUsername = e => {
    this.props.update('userCode', e.nativeEvent.text);
  };

  updatePassword = e => {
    this.props.update('userPassword', e.nativeEvent.text);
  };
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  loginButton: {
    marginTop: 50,
    width: 200
  },
  textInput: {
    width: 200
  },
  inputLayout: {
    marginTop: 16,
    marginHorizontal: 36
  }
});
