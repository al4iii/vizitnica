import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icons from '../assets/icons/svgIcons/Icons';
import { SIZES, FONTS, COLORS } from '../constants';
import { ModalConfirm } from '../modals/ModalConfirm';
import Modals from '../modals/Modals';
import { useDeleteSpecById } from '../screens/hooks/useDeleteSpecById';
import { useToast } from 'react-native-toast-notifications';
import CroppedModalWindow from '../modals/CroppedModal';

const NavbarRecordScreen = ({ header, navigation, url, icon, stylesHeader, stylesHeadersText, optionMenu = false,
  stylesHeaderBackIcon, colorButton, colorMenuOption, infoSpecialist, callback = () => console.log('back'), setIsOpen, isOpen,}) => {
  
  const [openModal, setOpenModal] = React.useState(false);
  const [openModalComplaint, setOpenModalComplaint] = React.useState(false);
  const isSentComplaints = useSelector(state => state.verification.isSentComplaints);
  const { fetch: deleteSpecById } = useDeleteSpecById();
  const toast = useToast();

  const complaint = () => {
    setOpenModal(!openModal);
    setIsOpen(false);
    setOpenModalComplaint(!openModalComplaint);
  };

  const deleteCard = infoSpecialist => {
    if (!!infoSpecialist.color.activity_kind) {
      deleteSpecById({ id: infoSpecialist?.id, type: 'specialist' });
    } else {
      deleteSpecById({ id: infoSpecialist?.id, type: 'dummy' });
    }
    navigation.navigate('CreateBusinessCard');
  };

  React.useEffect(() => {
    if (isSentComplaints) {
      setOpenModalComplaint(!openModalComplaint);
    } else if (isSentComplaints === false) {
      setOpenModalComplaint(!openModalComplaint);
    }
  }, [isSentComplaints]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        ...stylesHeader,
      }}>
      <View
        style={{
          alignItems: 'center',
          ...stylesHeaderBackIcon,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            callback();
          }}
          style={{ padding: 16, margin: -10 }}>
          <Icons.ArrowBack color={colorButton} />
        </TouchableOpacity>
      </View>

      <Text
        numberOfLines={1}
        style={{
          ...FONTS.h4,
          color: COLORS.white,
          fontWeight: '600',
          textAlign: 'center',
          maxWidth: '80%',
          ...stylesHeadersText,
        }}>
        {header}
      </Text>
      {!icon ? (
        <Icons.Avatar styles={{ marginRight: SIZES.padding }} />
      ) : !optionMenu ? (
        <Image
          style={{
            height: 32,
            width: 32,
            borderRadius: 50,
          }}
          source={{ uri: url }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            setOpenModal(!openModal);
            setIsOpen(true);
          }}>
          <Icons.MenuOption color={colorMenuOption} />
        </TouchableOpacity>
      )}
      <CroppedModalWindow
        component={ModalConfirm}
        isVisible={openModal}
        onClose={() => {
          setOpenModal(false);
          setIsOpen(false);
        }}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        type={'bottom'}
        name={'addCard'}
        setOpenModal={setOpenModal}
        openModal={openModal}
        visible={openModal}
        navigation={navigation}
        text={'Удалить визитку'}
        text2={'Пожаловаться'}
        colorText={'#D64641'}
        buttonFunction={() => {
          setOpenModal(false);
          setIsOpen(false);
          const duration = 4000;
          let isCancel = false;
          let id = toast.show('Визитка удалена', {
            type: 'custom_type',
            duration: duration,
            placement: 'bottom',
            offset: 30,
            animationType: 'slide-in',
            onPress: () => {
              toast.hide(id), (isCancel = true);
            },
          });
          setTimeout(() => !isCancel && deleteCard(infoSpecialist), duration);
        }}
        buttonFunction2={complaint}
      />
      <Modals
        indexModal={4}
        visibleModal={openModalComplaint}
        setVisibleModal={setOpenModalComplaint}
        navigation={navigation}
        item={infoSpecialist}
      />
    </View>
  );
};

export default NavbarRecordScreen;
