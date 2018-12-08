import React from 'react';
import { ActivityIndicator, Platform } from 'react-native';

export default Wrapped => ({ loading, ...props }) =>
  loading
    ?
    <ActivityIndicator
      animating={true}
      color='#414141'
      size={Platform.OS === 'ios' ? 'large' : 50}
    />
    :
    <Wrapped {...props} />;