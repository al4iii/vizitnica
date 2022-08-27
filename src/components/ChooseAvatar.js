import React from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import Icons from '../assets/icons/svgIcons/Icons';
import { COLORS, SIZES } from '../constants';
import AccordionModal from '../modals/AccordionModal';
import CroppedModalWindow from '../modals/CroppedModal';
import { useFetchUploadImage } from '../screens/CreateBusinessCard/hooks/useFetchUploadImage';

const ChoiceAvatar = ({ customContainerStyle, photo = null, isAvatar= true}) => {
  const [selectedPhoto, setSelectedPhoto] = React.useState(photo);
  const [isVisibleChoiceAvatarModal, setIsVisibleChoiceAvatarModal] = React.useState(false);
  const { fetch: uploadImage } = useFetchUploadImage();

  const pickPicture = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      cropperRotateButtonsHidden: true,
      cropperStatusBarColor: '#0F98C2',
      cropperToolbarWidgetColor: '#0F98C2',
      hideBottomControls: true,
      showCropFrame: false,
      showCropGuidelines: false,
      cropperToolbarTitle: 'Редактировать фото',
    })
      .then(image => {
        setSelectedPhoto(image);
        uploadImage(image, isAvatar);
      })
      .catch(e => {
        console.log(e, 'Api call error');
      });
  };

  const pickPhoto = React.useCallback(() => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      cropperRotateButtonsHidden: true,
      cropperStatusBarColor: '#0F98C2',
      cropperToolbarWidgetColor: '#0F98C2',
      hideBottomControls: true,
      showCropFrame: false,
      showCropGuidelines: false,
      cropperToolbarTitle: 'Редактировать фото',
    })
      .then(image => {
        setSelectedPhoto(image);
        uploadImage(image, isAvatar);        
      })
      .catch(err => {
        console.log(err, 'Api call error');
      });
  }, [selectedPhoto]);

  const AccordionButton = ({ label, customTextStyle, onPress }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: SIZES.margin * 0.05,
          width: '100%',
          height: 57,
          backgroundColor: COLORS.backgroundPicker,
        }}>
        <Text
          style={{
            fontSize: SIZES.h2,
            color: COLORS.blue,
            ...customTextStyle,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const openModal = () => {
    return (
      <AccordionModal onPress={() => setIsVisibleChoiceAvatarModal(false)}>
        <View style={{ borderRadius: SIZES.radius * 1.6, overflow: 'hidden' }}>
          <AccordionButton
            label="Сделать фото"
            onPress={() => {
              pickPhoto();
              setIsVisibleChoiceAvatarModal(false);
            }}
          />
          <AccordionButton
            label="Загрузить из галереи"
            onPress={() => {
              pickPicture();
              setIsVisibleChoiceAvatarModal(false);
            }}
          />
        </View>
      </AccordionModal>
    );
  };

  React.useEffect(() => {
    if (isVisibleChoiceAvatarModal) {
      openModal();
    }
  }, [isVisibleChoiceAvatarModal]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisibleChoiceAvatarModal(true)}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginBottom: SIZES.margin * 2.4,
          width: 88,
          height: 88,
          borderRadius: SIZES.radius * 8.8,
          backgroundColor: COLORS.secondary,
          borderWidth: !selectedPhoto ? 2 : 0,
          borderColor: COLORS.primary,
          ...customContainerStyle,
        }}>
        {!selectedPhoto ? (
          <Icons.Camera />
        ) : (
          <Image
            source={{
              uri: selectedPhoto?.path ? selectedPhoto?.path : selectedPhoto,
            }}
            resizeMode="cover"
            resizeMethod="scale"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: SIZES.radius * 8.8,
            }}
          />
        )}
      </TouchableOpacity>
      <CroppedModalWindow
        type="bottom"
        name="ChoiceAvatar"
        isVisible={isVisibleChoiceAvatarModal}
        component={openModal}
        onClose={() => setIsVisibleChoiceAvatarModal(false)}        
      />
    </>
  );
};

export default ChoiceAvatar;
