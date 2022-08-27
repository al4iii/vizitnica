import React from 'react';
import { View, Text, Platform, TouchableOpacity, Image, Modal, StatusBar } from 'react-native';
import Countries from '../screens/Verification/Countries';
import { verificationActionCreators } from '../slices/verificationSlice';
import { useSelector } from 'react-redux';
import MaskInput from 'react-native-mask-input';
import { COLORS, SIZES } from '../constants';
import Header from './Header';

const PhoneInput = () => {
  const { getPhoneNumber } = verificationActionCreators();
  const [phone, setPhone] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const selectedCountry = useSelector(state => state.verification.selectedCountry);

  const toggleModal = () => {
    setIsOpen(p => !p);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        borderRadius: SIZES.radius,
      }}>
      <View style={{ alignItems: 'center', width: 58, height: 48 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 28,
            textAlign: 'center',
            marginTop: 10,
            borderRightWidth: 1,
            borderColor: COLORS.lightGray,
          }}>
          <Modal visible={isOpen}>
            <View>
              <StatusBar
                animated={true}
                backgroundColor={'#38B8E0'}
                hidden={false}
                translucent
                barStyle={'translucent'}
              />
              <Header
                toggleModal={toggleModal}
                header={'Выберите страну'}
                customContainerStyle={{ marginTop: 12, marginRight: 16 }}
                hrStyle={{ margin: 0 }}
              />
              <View style={{ padding: 16 }}>
                <Countries toggleModal={toggleModal} />
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={{ width: 28, height: 18 }}
            onPress={() => toggleModal()}>
            <Image
              style={{ width: 28, height: 18 }}
              resizeMode="cover"
              source={{ uri: selectedCountry.flag }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          marginLeft: SIZES.padding * 1.5,
          fontSize: SIZES.h3,
          fontFamily: 'SFProDisplay-Regular',
          lineHeight: 20.29,
          color: COLORS.black,
        }}>
        {selectedCountry.code}
      </Text>
      <MaskInput
        value={phone}
        placeholderFillCharacter="0"
        placeholderTextColor={COLORS.placeholder}
        maxLength={13}
        keyboardType={
          Platform.OS === 'android' ? 'numeric' : 'numbers-and-punctuation'
        }
        onChangeText={(masked, unmasked) => {
          setPhone(masked);
          getPhoneNumber(unmasked);
        }}
        mask={[
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
        ]}
        style={{
          flex: 1,
          marginLeft: SIZES.padding * 0.5,
          fontSize: SIZES.h3,
          fontFamily: 'SFProDisplay-Regular',
          lineHeight: 20.29,
          color: COLORS.black,
        }}
      />
    </View>
  );
};

export default PhoneInput;
