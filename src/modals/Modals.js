import React from 'react'
import {
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import Icons from '../assets/icons/svgIcons/Icons'

import { License, PersonalData, EnterCode, Complaint } from './list'
import MainLayouts from '../layouts/MainLayouts'
import { COLORS, FONTS, SIZES, icons } from '../constants'



const Modals = ({
  indexModal = 0,
  visibleModal = false,
  setVisibleModal,
  navigation,
  item
}) => {



  const listModalContent = [
    {
      title: 'Пользовательское соглашение',
      content: License,
    },
    {
      title: 'Персональные данные',
      content: PersonalData,
    },
    {
      title: 'Подтверждение телефона',
      content: EnterCode,
    },
    {
      title: 'Подтверждение телефона',
      content: EnterCode,
    },
    {
      title: 'Выберите причину жалобы',
      content: Complaint,
    },
  ];




  const ModalContent = listModalContent[indexModal].content
  const ModalTitle = listModalContent[indexModal].title

  return (
    <Modal visible={visibleModal} animationType="slide">
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: SIZES.padding * 1.6,
            height: 50,
            borderBottomWidth: 1,
            borderColor: COLORS.lightGray,
          }}>
          <View
            style={{
              flex: 0.1,
              alignItems: 'center',
              marginLeft: -SIZES.padding * 1.4,
            }}>
            <TouchableOpacity onPress={() => setVisibleModal(false)}>
              <Icons.CloseButton color={item?.card?.buttonsColor}/>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginLeft: -SIZES.padding * 1.4,
            }}>
            <Text style={{ ...FONTS.h4, color: item?.color?.colors?.buttonsColor ? item?.color?.colors?.buttonsColor : COLORS.textBlack }}>{ModalTitle}</Text>
          </View>
        </View>
      </SafeAreaView>
      <MainLayouts>
        <ModalContent navigation={navigation} closeModal={setVisibleModal} item={item}/>
      </MainLayouts>
    </Modal>
  )
}

export default Modals
