import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

const press = () => {
  Keyboard.dismiss();
};

export default Wrapped => props =>
  <TouchableWithoutFeedback onPress={press}>
    <Wrapped {...props} />
  </TouchableWithoutFeedback>;
