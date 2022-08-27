import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icons from '../assets/icons/svgIcons/Icons';
import { SIZES, FONTS, COLORS } from '../constants';
import Hr from './Hr';

const Header = ({ header, emptyReady = false, hrStyle, toggleModal, buttonText, onSubmit, customHeaderStyle, customContainerStyle, colorReady = COLORS.blue,}) => {
  return (
    <>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: SIZES.padding * 1.6,
            marginBottom: SIZES.padding * 1.7,
          },
          customContainerStyle,
        ]}>
        <View>
          <TouchableOpacity onPress={() => toggleModal(false)}>
            <Icons.CloseButton />
          </TouchableOpacity>
        </View>
        <View
          style={[
            {
              flex: 1,
              alignItems: 'center',
              marginLeft: SIZES.padding * 1.4,
            },
            customHeaderStyle,
          ]}>
          <Text
            style={{
              ...FONTS.h4,
              color: COLORS.black,
              fontWeight: '600',
            }}>
            {header}
          </Text>
        </View>
        {buttonText && (
          <TouchableOpacity
            onPress={emptyReady ? onSubmit : () => toggleModal(false)}>
            <Text
              style={{
                ...FONTS.body6,
                fontSize: SIZES.body6,
                color: colorReady,
                paddingTop: 6,
              }}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Hr style={[{ marginLeft: -16 }, hrStyle]} />
    </>
  );
};

export default Header;
