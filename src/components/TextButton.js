import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native';


import { FONTS, SIZES } from '../constants';

const TextButton = ({
  label,
  customContainerStyle,
  customLabelStyle,
  onPress,
  isDisabled,
  loading = false
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        padding: SIZES.padding * 1.4,
        borderRadius: SIZES.radius * 12.5,
        ...customContainerStyle,
      }}
      disabled={isDisabled}
      onPress={onPress}>
      <Text
        style={{

          ...FONTS.h3,
          ...customLabelStyle,
        }}>

        {loading ?    <ActivityIndicator size="large" color="#fff" />    : ""
        }

        {label}

      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
