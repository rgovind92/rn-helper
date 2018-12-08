import React, { Component } from 'react';
import { View } from 'react-native';
import { WithLocale } from '../../container';
import { IPicker, IText } from '../../component';

export default class extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <WithLocale>
          {context =>
            <IPicker
              value={context.currentLocale}
              onValueChange={locale => context.switchLocale(locale)}
            >
              <IPicker.Item label='English' value='en-US' />
              <IPicker.Item label='German' value='de' />
            </IPicker>}
        </WithLocale>
        <IText divider>Hello World</IText>
      </View>
    );
  }
}