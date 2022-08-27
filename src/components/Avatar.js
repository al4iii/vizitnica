import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icons from '../assets/icons/svgIcons/Icons';
import { COLORS } from '../constants';

const Avatar = ({ onPress, width = 32, height = 32, isTouchableOpacity = true,}) => {
  return isTouchableOpacity ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width,
        height: height,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        color: 'red',
      }}>
      <Icons.Avatar />
    </TouchableOpacity>
  ) : (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        color: 'red',
      }}>
      <Icons.Avatar />
    </View>
  );
};

export default Avatar;
