import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icons from '../assets/icons/svgIcons/Icons';
import { SIZES, FONTS, COLORS } from '../constants';
import { verificationActionCreators } from '../slices/verificationSlice';

const Navbar = ({ header, navigation, initialValue = null, height = 40, styleBody, styleIcon }) => {
  const { updateUserData } = verificationActionCreators();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.padding * 1.6,
        height: height,
          ...styleBody
      }}>
      <View
        style={{
          flex: 0.1,
          alignItems: 'center',
          position: 'absolute',
          left: -14,
            ...styleIcon
        }}>
        <TouchableOpacity
          onPress={() => {
            if (initialValue) {
              updateUserData(initialValue);
            }
            navigation.goBack();
          }}
          style={{ padding: 10 }}>
          <Icons.ArrowBack />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: COLORS.black,
            fontWeight: '600',
          }}>
          {header}
        </Text>
      </View>
    </View>
  );
};

export default Navbar;
