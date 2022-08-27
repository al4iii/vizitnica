import React from 'react';
import { View, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { Field, Hr, Navbar, TextButton } from '../../components';
import ChoiceAvatar from '../../components/ChooseAvatar';
import { COLORS, SIZES } from '../../constants';
import Container from '../../layouts/Container';
import MainLayouts from '../../layouts/MainLayouts';
import { verificationActionCreators } from '../../slices/verificationSlice';
import { useUpdatePersonalData } from './hooks/useUpdatePersonalData';

const EditProfilePage = ({ navigation, route }) => {
  const { updateUserData } = verificationActionCreators();
  const { updateUserData: updateProfile } = useUpdatePersonalData();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const image = useSelector(state => state.verification.avatarPicId);
  const userData = useSelector(state => state.verification.userData);
  const initialValue = route.params;

  const updateData = (name, value) => {
    let data = { ...userData };
    data[name] = value;
    updateUserData(data);
  };

  const handleSubmitPersonalData = () => {
    const data = {
      name: userData.name,
      surname: userData.surname,
    };
    if (image) {
      data.avatar_id = image;
    }
    updateProfile({ data });
    navigation.goBack();
  };

  React.useEffect(() => {
    setIsDisabled(!userData.name || !userData.surname);
  }, [userData]);

  return (
    <MainLayouts
      customContainerStyle={{ backgroundColor: COLORS.white, paddingTop: StatusBar.currentHeight -12, }}>
      <Container
        customContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          <Navbar
            header="Редактирование профиля"
            navigation={navigation}
            initialValue={initialValue}
          />
          <Hr style={{ marginLeft: -16, marginTop: 5 }} />
          <View style={{ paddingTop: 24 }}>
            <ChoiceAvatar photo={route.params.photo} />
          </View>
          <Field
            label="Имя"
            value={userData.name}
            updateData={updateData}
            field="name"
            showIconReset
            incomingValue={userData.name}
          />
          <Field
            label="Фамилия"
            value={userData.surname}
            updateData={updateData}
            field="surname"
            showIconReset
            incomingValue={userData.surname}
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

export default EditProfilePage;
