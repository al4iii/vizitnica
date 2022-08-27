import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const LoadingToast = ({ message, onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.margin * 0.8,
        paddingHorizontal: SIZES.padding,
        width: SIZES.width - 16,
        height: 40,
        backgroundColor: '#435155',
        borderRadius: SIZES.radius,
      }}>
      <ActivityIndicator size={20} color={COLORS.white} />
      <Text
        style={{
          flex: 1,
          marginLeft: SIZES.margin * 1.6,
          ...FONTS.body3,
          color: COLORS.white,
        }}>
        {message}
      </Text>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          marginRight: SIZES.margin * 0.6,
        }}>
        <Text
          style={{
            ...FONTS.body10,
            fontSize: 13,
            color: COLORS.white,
          }}>
          Отмена
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoadingToast;
