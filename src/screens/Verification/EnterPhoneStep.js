import React from 'react';
import { Text, View, Platform, StatusBar } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useSelector } from 'react-redux';
import Modals from '../../modals/Modals';
import { PhoneInput, TextButton } from '../../components';
import Container from '../../layouts/Container';
import MainLayouts from '../../layouts/MainLayouts';
import { verificationActionCreators } from '../../slices/verificationSlice';
import { useGetBusinessCards } from '../CreateBusinessCard/hooks/useGetBusinessCards';
import { useFetchCurrentUserData } from '../hooks/useFetchCurrentUserData';
import { useGetIsUserExists } from '../ProfilePage/hooks/useGetIsUserExists';
import { useFetchContries } from './hooks/useFetchContries';
import { COLORS, SIZES, FONTS } from '../../constants';

const EnterPhoneStep = ({ navigation }) => {
  const { fetch } = useFetchContries();
  const { fetch: fetchIsUserExists } = useGetIsUserExists();
  const { getCurrentUser: fetchUserInfo } = useFetchCurrentUserData();
  const { fetch: fetchAllCards } = useGetBusinessCards();
  const { setShouldShowOnboarding } = verificationActionCreators();

  const [checkbox, setCheckbox] = React.useState(false);
  const [indexModal, setIndexModal] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  const { phoneNumber, token, signInStatus, selectedCountry } = useSelector(state => state.verification,);
  const disabled = !checkbox || phoneNumber === null || phoneNumber?.length < 7;

  const toggleModal = index => {
    setIndexModal(index);
    setOpenModal(!openModal);
  };

  const handleNextMove = () => {
    fetchIsUserExists(
      (selectedCountry.code + phoneNumber + '').split(' ').join(''),
      userInfo => {
        if (userInfo.user && userInfo.device && userInfo.client) {
        } else {
          toggleModal(3);
        }
      },
    );
  };

  React.useEffect(() => {
    if (token && signInStatus) {
      setShouldShowOnboarding(false);
    }
    fetch();
  }, []);

  React.useEffect(() => {
    if (!!token) {
      fetchUserInfo(null);
      fetchAllCards();
      navigation.navigate('CreateBusinessCard');
    }
  }, [token]);

  function renderTopContent() {
    return (
      <View>
        <StatusBar
          animated={true}
          backgroundColor={'#38B8E0'}
          hidden={false}
          translucent
          barStyle={'light-content'}
        />
        <Text
          style={{
            ...FONTS.h1,
            marginVertical: SIZES.padding * 0.8,
            color: COLORS.black,
            paddingTop: StatusBar.currentHeight,
          }}>
          {'Ваш телефон'}
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            marginBottom: SIZES.padding * 2.4,
            color: COLORS.black,
            fontSize: SIZES.body3,
          }}>
          {'Номер будет привязан к вашему аккаунту'}
        </Text>
        <PhoneInput
          selectCountry={i => toggleModal(i)}
          navigation={navigation}
        />
      </View>
    );
  }

  function renderBottomContent() {
    return (
      <View>
        <TextButton
          label={'Продолжить'}
          customContainerStyle={{
            backgroundColor: COLORS.primary,
            marginBottom: SIZES.padding * 1.6,
            opacity: disabled ? 0.5 : 1,
          }}
          isDisabled={!checkbox || disabled}
          customLabelStyle={{ color: COLORS.white }}
          onPress={handleNextMove}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <CheckBox
            style={
              Platform.OS === 'ios' && {
                width: SIZES.padding * 1.6,
                height: SIZES.padding * 1.6,
              }
            }
            disabled={false}
            value={checkbox}
            tintColors={{ true: COLORS.primary }}
            onFillColor={COLORS.primary}
            boxType={'square'}
            onValueChange={() => setCheckbox(!checkbox)}
          />
          <Text
            style={{
              ...FONTS.body5,
              flex: 1,
              marginLeft: SIZES.padding,
              color: COLORS.gray,
            }}>
            {'Я согласен с '}
            <Text
              style={{ textDecorationLine: 'underline' }}
              onPress={() => toggleModal(1)}>
              {'Обработкой персональных данных'}
            </Text>{' '}
            {'и '}
            <Text
              style={{ textDecorationLine: 'underline' }}
              onPress={() => toggleModal(0)}>
              {'Пользовательским соглашением'}
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  return (
    <MainLayouts customContainerStyle={{ backgroundColor: COLORS.white }}>
      <Container
        customContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
        {renderTopContent()}
        {renderBottomContent()}
        <Modals
          indexModal={indexModal}
          visibleModal={openModal}
          setVisibleModal={setOpenModal}
          navigation={navigation}
        />
      </Container>
    </MainLayouts>
  );
};

export default EnterPhoneStep;
