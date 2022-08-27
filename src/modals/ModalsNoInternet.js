import React from 'react';
import { Modal, Text, View, SafeAreaView } from 'react-native';
import Icons from '../assets/icons/svgIcons/Icons';
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { TextButton } from '../components';
import { useNetInfo } from '@react-native-community/netinfo';

const listModalContent = {
  title: 'Интернет недоступен',
  title1: 'Проверьте ваше интернет-соединение и повторите попытку',
  button: 'Повторить попытку',
};

const ModalsNoInternet = ({ visibleModal = false, setVisibleModal }) => {
  const netInfo = useNetInfo();

  return (
    <Modal visible={visibleModal} animationType="slide">
      <SafeAreaView style={{ flex: 1, marginHorizontal: SIZES.padding * 1.6 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icons.Globe />
          <Text
            style={{
              ...FONTS.h4,
              marginTop: 24,
              marginBottom: SIZES.padding,
              color: COLORS.black,
            }}>
            {listModalContent.title}
          </Text>
          <Text
            style={{
              ...FONTS.body3,
              marginHorizontal: SIZES.padding * 4,
              color: COLORS.gray,
              textAlign: 'center',
            }}>
            {listModalContent.title1}
          </Text>
        </View>
        <TextButton
          label={listModalContent.button}
          customContainerStyle={{ backgroundColor: COLORS.primary }}
          customLabelStyle={{ color: COLORS.white }}
          onPress={() => setVisibleModal(!netInfo.isConnected)}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ModalsNoInternet;
