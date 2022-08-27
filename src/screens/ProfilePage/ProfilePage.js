import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text, Image, TouchableOpacity } from 'react-native';
import { API_STORAGE } from '../../api/api';
import Icons from '../../assets/icons/svgIcons/Icons';
import { Hr } from '../../components';
import MainLayouts from '../../layouts/MainLayouts';
import { COLORS, SIZES } from '../../constants';
import { useSelector } from 'react-redux';
import Container from '../../layouts/Container';
import ModalQuation from '../../modals/ModalQuation';
import { Toast } from '../../components/Toast';
import { useLogout } from '../hooks/useLogout';
import { APIStatus } from '../../lib/axiosAPI';

export const avatarURL = photo => {
  // TODO  temporary function, will delete after backend side will fix image url issue
  if (photo && (photo + '')?.includes('dev.vzt')) {
    return photo;
  }
  return API_STORAGE + photo;
};

const ProfilePage = ({ navigation, route }) => {
  const photo = useSelector(state => state.verification.userData.photo);
  const userData = useSelector(state => state.verification.userData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isToast, setIsToast] = useState(true);
  const { fetch, status } = useLogout();

  useEffect(() => {
    let id = setTimeout(() => {
      setIsToast(false);
    }, 3000);
    return () => {
      clearTimeout(id);
    };
  }, []);

  useEffect(() => {
    if (status === APIStatus.Success) {
      setModalVisible(!isModalVisible);
      setTimeout(() => {
        navigation.navigate('Onboarding');
      }, 0);
    }
  }, [status]);

  return (
    <MainLayouts customContainerStyle={{ backgroundColor: COLORS.white }}>
      <Container
        customContainerStyle={{ flex: 1, justifyContent: 'space-between' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: StatusBar.currentHeight,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ padding: 10, margin: -10 }}>
              <Icons.ArrowBack />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfilePage', {
                  ...userData,
                  photo: photo ? avatarURL(photo) : null,
                })
              }
              style={{ padding: 10, margin: -10 }}>
              <Icons.Edit />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              marginBottom: SIZES.padding * 2.4,
              width: 88,
              height: 88,
              borderRadius: !!photo ? null : 100,
              backgroundColor: !!photo ? null : COLORS.secondary,
              borderWidth: !!photo ? null : 2,
              borderColor: !!photo ? null : COLORS.primary,
            }}>
            {!!photo ? (
              <Image
                source={{ uri: avatarURL(photo) }}
                resizeMode="cover"
                resizeMethod="scale"
                style={{ width: '100%', height: '100%', borderRadius: 100 }}
              />
            ) : (
              <Icons.Camera />
            )}
          </View>
          <Text
            style={{
              fontSize: SIZES.h2,
              color: COLORS.black,
              textAlign: 'center',
              fontWeight: '800',
            }}>
            {userData.name} {userData.surname}
          </Text>
          <Text
            style={{
              fontSize: SIZES.h3,
              textAlign: 'center',
              color: COLORS.textGray,
            }}>
            {userData?.phone}
          </Text>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Icons.History />
            <TouchableOpacity onPress={() => navigation.navigate('StoryPage')}>
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginLeft: 26,
                }}>
                История записей
              </Text>
            </TouchableOpacity>
          </View>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Icons.SupportGirl />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SupportPage');
              }}>
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginLeft: 26,
                }}>
                Написать в поддержку
              </Text>
            </TouchableOpacity>
          </View>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <View style={{ flexDirection: 'row' }}>
            <Icons.Logout />
            <TouchableOpacity onPress={() => setModalVisible(!isModalVisible)}>
              <Text
                style={{
                  fontSize: SIZES.h4,
                  color: COLORS.black,
                  marginLeft: 26,
                }}>
                Выйти из аккаунта
              </Text>
            </TouchableOpacity>
          </View>
          <Hr
            style={{
              marginTop: SIZES.padding * 1.4,
              marginBottom: SIZES.padding * 2.4,
            }}
          />
          <ModalQuation
            visible={isModalVisible}
            setModalVisible={setModalVisible}
            header={'Вы действительно хотите выйти из аккаунта?'}
            message={''}
            leftButtonText={'Отмена'}
            rightButtonText={'Выйти'}
            handleLogout={() => {
              fetch();
            }}
            goTo={'StoryPage'}
            navigation={navigation}
          />
        </View>
        {route?.params === 'SupportPage' && isToast && (
          <Toast
            content={
              'Ваше обращение успешно отправлено. Мы ответим по электронной почте'
            }
            duration={3}
          />
        )}
      </Container>
    </MainLayouts>
  );
};

export default ProfilePage;
