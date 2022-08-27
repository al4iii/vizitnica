import React from 'react';
import { View } from 'react-native';
import { SIZES } from '../constants';

const Hr = ({ style }) => {
  return (
    <View
      style={{
        height: 1,
        width: SIZES.width,
        backgroundColor: '#EAECEE',
        ...style,
      }}
    />
  );
};

export default Hr;
