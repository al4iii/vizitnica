import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';
import Modal from 'react-native-modal';
import { verificationActionCreators } from '../slices/verificationSlice'

const ModalQuation = ({
                          visible,
                          setModalVisible,
                          header,
                          message,
                          rightButtonText,
                          leftButtonText,
                          navigation,
                          handleLogout
                      }) => {
    
    const {setShouldShowOnboarding} = verificationActionCreators()
    const {setToken, setBusinessCards, setSignInStatus, setIsClientExists} = verificationActionCreators()
    const {resetStore} = verificationActionCreators()
    
    const logoutHandler = () => {
        handleLogout()
        setToken( null )
        AsyncStorage.removeItem( 'token' )
        setBusinessCards( [] )
        setSignInStatus( false )
        setIsClientExists( null )
        setShouldShowOnboarding( true )
        resetStore()
    }
    
    return (
      <View>
        <Modal
          isVisible={visible}
          onBackdropPress={() => {
            setModalVisible(!visible);
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              opacity: 0.8,
              paddingVertical: SIZES.padding * 1.6,
              justifyContent: 'center',
              borderRadius: 13,
              height: 113,
              width: 270,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: 260,
                padding: 16,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  ...FONTS.h5,
                  color: COLORS.blackText,
                  textAlign: 'center',
                }}>
                {header}
              </Text>
              <Text
                style={{
                  ...FONTS.h4,
                  color: COLORS.black,
                  borderEndColor: COLORS.lightGray6,
                }}>
                {message}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: 1,
                width: '100%',
                backgroundColor: COLORS.lightGray6,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  ...FONTS.body9,
                  marginVertical: SIZES.padding * 1.2,
                  fontSize: SIZES.h3,
                  color: COLORS.blue,
                }}
                onPress={() => (
                  navigation.navigate('ProfilePage'), setModalVisible(!visible)
                )}>
                {leftButtonText}
              </Text>
              <View
                style={{
                  borderRightWidth: 1.1,
                  borderEndColor: 1,
                  height: '100%',
                  backgroundColor: COLORS.lightGray6,
                }}
              />
              <Text
                style={{
                  ...FONTS.body9,
                  marginVertical: SIZES.padding * 1.2,
                  color: COLORS.red,
                }}
                onPress={logoutHandler}>
                {rightButtonText}
              </Text>
            </View>
          </View>
        </Modal>
      </View>
    );
};

export default ModalQuation;
