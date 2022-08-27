import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { COLORS, SIZES } from '../constants';


export const AccordionModal = ({ children, onPress }) => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        width: '100%',
      }}>
      {children}
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: SIZES.margin * 0.8,
          width: '100%',
          height: 57,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius * 1.6,
        }}>
        <Text
          style={{
            // fontFamily: FONTFAMILY.title.semibold,
            fontSize: SIZES.h2,
            color: COLORS.blue,
          }}>
          Отмена
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccordionModal;
