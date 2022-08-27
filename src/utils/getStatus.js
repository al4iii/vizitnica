import React from 'react';
import { Text, View } from 'react-native';
import Icons from '../assets/icons/svgIcons/Icons';
import { COLORS, SIZES } from '../constants';

export const getAppointmentStatus = status => {
  switch (status) {
    case 'unconfirmed':
      return (
        <View style={{ flexDirection: 'row', left: 16, marginBottom: 16 }}>
          <Text
            style={{
              fontSize: SIZES.body3,
              color: COLORS.gray,
              marginRight: 8,
              lineHeight: 14,
            }}>
            На подтверждении
          </Text>
          <Icons.ClockWaiting width={16} height={16} color={COLORS.gray} />
        </View>
      );
    case 'confirmed':
      return (
        <View style={{ flexDirection: 'row', left: 16, marginBottom: 16 }}>
          <Text
            style={{
              fontSize: SIZES.body3,
              color: COLORS.green,
              lineHeight: 14,
            }}>
            Подтверждено
          </Text>
        </View>
      );
    case 'cancelled':
      return (
        <View style={{ flexDirection: 'row', left: 16, marginBottom: 16 }}>
          <Text
            style={{
              fontSize: SIZES.body3,
              color: COLORS.red,
              lineHeight: 14,
            }}>
            Отменено
          </Text>
        </View>
      );
  }
};
