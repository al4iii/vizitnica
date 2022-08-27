import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../constants/theme';

const RadioButton = ({
  isTrue,
  color = COLORS.green,
  size = 10,
  customStyle,
}) => {
  return (
    <View
      style={{
        marginRight: 16,
        height: size * 2,
        width: size * 2,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: isTrue ? color : COLORS.grayLight2,
        alignItems: 'center',
        justifyContent: 'center',
        ...customStyle,
      }}>
      {isTrue && (
        <View
          style={{
            height: size,
            width: size,
            borderRadius: 5,
            backgroundColor: color,
          }}
        />
      )}
    </View>
  );
};

export default RadioButton;
