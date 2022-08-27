import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { COLORS, SIZES } from '../constants'

export const AccordionButton = ({
  label,
  customTextStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.margin * 0.05,
        width: '100%',
        height: 57,
        backgroundColor: COLORS.backgroundPicker,
      }}>
      <Text
        style={{
          // fontFamily: FONTS.title.regular,
          fontSize: SIZES.h2,
          color: COLORS.blue,
          ...customTextStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
