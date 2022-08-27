import React from 'react'

import { Modal } from 'react-native'
import { useSelector } from 'react-redux'
import { EnterCode, License, PersonalData } from '../modals/list'


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
    title: 'Выберите страну',
    content: License,
  },
]


const ModalFullScreen = ({ navigation }) => {
  const {

    indexContentModalFullScreen,
    statusContentModalFullScreen,
  } = useSelector(state => state.modalWindow);
  const ModalContent = listModalContent[indexContentModalFullScreen].content;
  const modalTitle = listModalContent[indexContentModalFullScreen].title;

  return (
    <Modal
      isVisible={true}
      useNativeDriver={true}
      style={{ margin: 0, backgroundColor: '#fff' }}>
      <ModalContent
        navigation={navigation}
        modalTitle={modalTitle}
        statusContentModal={statusContentModalFullScreen}
      />
    </Modal>
  );
};

export default ModalFullScreen;
