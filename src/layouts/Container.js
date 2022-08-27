import React from 'react';
import { View } from 'react-native';

import { SIZES } from '../constants';

const Container = ({ children, customContainerStyle }) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding * 1.6,
        ...customContainerStyle,
      }}>
      {children}
    </View>
  );
};

export default Container;
