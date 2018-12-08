import React from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { memoize } from 'lodash';

import WithTheme from '../../container/WithTheme';
import IText from '../../component/IText';

const getStyle = memoize(backgroundColor => StyleSheet.create({
  o: {
    height: 60,
    backgroundColor,
    justifyContent: 'center',
    alignItems: 'center'
  }
}).o);

const getTextStyle = memoize(color => StyleSheet.create({
  o: {
    color,
    fontWeight: 'bold',
    fontSize: moderateScale(14, 0.1)
  }
}).o);

export default () =>
  <WithTheme>
    {({ primary, primaryText }) => (
      <View style={getStyle(primary)}>
        <IText style={getTextStyle(primaryText)}>
          Footer
        </IText>
      </View>
    )}
  </WithTheme>;  
