import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { Field, TextButton } from '../../components';
import ChoiceAvatar from '../../components/ChooseAvatar';
import MainLayouts from '../../layouts/MainLayouts';
import { COLORS, SIZES } from '../../constants';
import { verificationActionCreators } from '../../slices/verificationSlice';
import { useSelector } from 'react-redux';
import Container from '../../layouts/Container';
import { useCreateUser } from '../hooks/useCreateUser';

const EditProfileStep = ({ navigation }) => {
  const { updateUserData } = verificationActionCreators();
  const { fetch } = useCreateUser();
  const [selectedPhoto, setSelectedPhoto] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const userData = useSelector(state => state.verification.userData);
  const image = useSelector(state => state.verification.avatarPicId);

  const handleSubmitPersonalData = () => {
    const data = {
      name: userData.name,
      surname: userData.surname,
      avatar_id: image,
    };
    if (!image) {
      data.avatar_id = image;
    }
    fetch({ payload: { ...data } });
    navigation.navigate('CreateBusinessCard');
  };

  const updateData = (name, value) => {
    let data = { ...userData };
    data[name] = value;
    updateUserData(data);
    setIsDisabled(!data.name.length || !data.surname.length);
  };

  React.useEffect(() => {
    let data = { ...userData };
    data['photo'] = selectedPhoto;
    updateUserData(data);
  }, [selectedPhoto]);

  return (
    <MainLayouts customContainerStyle={{ backgroundColor: COLORS.white }}>
      <Container
        customContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <StatusBar
            animated={true}
            backgroundColor={COLORS.primary}
            barStyle={'light-content'}
          />
          <Text
            style={{
              alignSelf: 'center',
              marginBottom: SIZES.padding * 2.4,
              fontSize: SIZES.h3,
              fontFamily: 'SFProDisplay-Black',
              lineHeight: 20,
              color: COLORS.black,
              paddingTop: StatusBar.currentHeight,
            }}>
            {'Обо мне'}
          </Text>
          <ChoiceAvatar onChange={value => setSelectedPhoto(value)} />
          <Field
            label="Имя"
            updateData={updateData}
            field="name"
            showIconReset
          />
          <Field
            label="Фамилия"
            updateData={updateData}
            field="surname"
            showIconReset
          />
        </View>
        <TextButton
          label={'Сохранить'}
          isDisabled={isDisabled}
          customContainerStyle={{
            backgroundColor: COLORS.primary,
            marginBottom: SIZES.padding * 1.6,
            opacity: isDisabled ? 0.5 : 1,
          }}
          customLabelStyle={{ color: COLORS.white }}
          onPress={handleSubmitPersonalData}
        />
      </Container>
    </MainLayouts>
  );
};

export default EditProfileStep;
