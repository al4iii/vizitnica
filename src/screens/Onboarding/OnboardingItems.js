import React from 'react';
import { View, Text, Image } from 'react-native';
import { SIZES, COLORS, FONTS } from '../../constants';

const OnboardingItems = ({ imageSrc, title, description, SvgComponent }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SIZES.width,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>

        <SvgComponent/>
      </View>
      <Text
        style={{
          ...FONTS.h2,
          marginBottom: SIZES.padding2,
          color: COLORS.white,
        }}>
        {title}
      </Text>
      <Text
        style={{
          ...FONTS.body3,
          marginBottom: SIZES.padding * 4,
          color: COLORS.white,
          textAlign: 'center',
          opacity: 0.7,
        }}>
        {description}
      </Text>
    </View>
  );
};

export default OnboardingItems;
