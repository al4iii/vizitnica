import React from 'react';
import { View, ScrollView, SafeAreaView, Platform, TextInput, TouchableOpacity,
    Text, KeyboardAvoidingView, StatusBar } from 'react-native';
import MaskInput from 'react-native-mask-input';
import { SIZES, COLORS, FONTS } from '../../constants';
import { Field, Hr, Navbar, TextButton } from '../../components';
import { useSelector } from 'react-redux';
import { WrapperAsyncRequest } from '../../layouts';
import { APIStatus } from '../../lib/axiosAPI';
import { verificationActionCreators } from '../../slices/verificationSlice';
import Container from '../../layouts/Container';
import { useGetBusinessCards } from '../CreateBusinessCard/hooks/useGetBusinessCards';
import { useUpdateBusinessCard } from '../hooks/useUpdateBusinessCard';
import CustomModalEasy from '../../modals/CustomModalEasy';
import ChoiceAvatar from '../../components/ChooseAvatar';
import Icons from '../../assets/icons/svgIcons/Icons';

const EditBusinessCard = ({navigation, route}) => {
    const {phoneNumber, name, surname, speciality, description, avatar, id} = route.params;
    const {setIsCadrSpecialist, cleanBusinessCard, setImage} = verificationActionCreators();
    
    const [modalVisible, setModalVisible] = React.useState( false );
    const [isConfirmation, setConfirmation] = React.useState( false );
    const [isFocused, setIsFocused] = React.useState( false );
    const [isDisabledPhone, setIsDisabledPhone] = React.useState(false);

    const {image, avatarPicId, isCadrSpecialist} = useSelector( state => state.verification );
    const {fetch: fetchAllCards} = useGetBusinessCards();
    const {fetch: fetchUpdateBusinessCard} = useUpdateBusinessCard();
    
    const normalizePhoneNum = phoneNum => {
        if (phoneNum.length <= 1) return null;
        const numArr = phoneNum.split( '' );
        if (numArr[0] === '7') {
            return numArr.slice( 1 ).join( '' );
        }
        else if (numArr[0] + numArr[1] === '+7') {
            return numArr.slice( 2 ).join( '' );
        }
        else return phoneNum;
    };
    
    const [formData, setFormData] = React.useState( {
        about: description,
        name: name,
        phone_number: normalizePhoneNum( phoneNumber ),
        surname: surname,
        title: speciality,
    } );
    
    const updateData = (name, value) => {
      if (name === 'phone_number') {
        setIsDisabledPhone(false);
      }
      setFormData({
        ...formData,
        [name]: value,
      });
    };
    
    const onPress = () => {
        if (formData?.phone_number.length > 9) {
          setIsDisabledPhone(false);
        } else {
          setIsDisabledPhone(true);
          return;
        }
        let newformData = {
            ...formData,
            ['phone_number']: `+7${formData.phone_number}`,
        };
        if (avatarPicId) {
            newformData = {
                ...newformData,
                avatar_id: avatarPicId,
            };
        }
        if (`+7${formData.phone_number}` === phoneNumber) {
            delete newformData.phone_number
        }
        if (formData.name === name) {
            delete newformData.name
        }
        if (formData.about === description) {
            delete newformData.about
        }
        if (formData.surname === surname) {
            delete newformData.surname
        }
        if (formData.title === speciality) {
            delete newformData.title
        }
        fetchUpdateBusinessCard( newformData, id );
    };
    
    React.useEffect( () => {
        image &&
        setFormData( {
            ...formData,
            avatar_id: image?.id,
        } );
    }, [image] );
    
    React.useEffect( () => {
        if (isConfirmation) {
            setIsCadrSpecialist( null );
            setConfirmation( false );
            cleanBusinessCard();
            setImage( null );
            navigation.navigate( 'CreateBusinessCard' );
            fetchAllCards();
        }
    }, [isConfirmation] );
    
    React.useEffect( () => {
        if (isCadrSpecialist) {
            setModalVisible( true );
        }
        else if (isCadrSpecialist === false) {
            setIsCadrSpecialist( null );
            navigation.navigate( 'CreateBusinessCard' );
            fetchAllCards();
        }
    }, [isCadrSpecialist] );
    
    function returnContent () {
        return (
          <View>
            <Field
              label="Имя"
              updateData={updateData}
              field="name"
              showIconReset
              incomingValue={formData.name}
              onFocus={() => setIsFocused(false)}
            />
            <Field
              label="Фамилия (необязательно)"
              updateData={updateData}
              field="surname"
              showIconReset
              incomingValue={formData.surname}
              onFocus={() => setIsFocused(false)}
            />
            <Field
              label="Специальность (необязательно)"
              updateData={updateData}
              field="title"
              showIconReset
              incomingValue={formData.title}
              onFocus={() => setIsFocused(false)}
            />
            <View
              style={{
                borderColor:
                  isFocused && !isDisabledPhone
                    ? COLORS.primary
                    : isFocused && isDisabledPhone
                    ? COLORS.red
                    : !formData.phone_number.length
                    ? COLORS.lightGray
                    : formData.phone_number.length >= 10
                    ? COLORS.lightGray
                    : COLORS.red,
                borderWidth: 1,
                flex: 1,
                paddingHorizontal: SIZES.padding * 1.6,
                marginBottom: SIZES.padding * 0.8,
                color: COLORS.black,
                borderRadius: SIZES.radius,
              }}>
              <View>
                <Text
                  style={{
                    ...FONTS.body11,
                    paddingTop: SIZES.padding * 0.5,
                    color: isFocused ? COLORS.primary : COLORS.gray,
                  }}>
                  {'Номер телефона'}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TextInput
                  style={{
                    fontSize: SIZES.h3,
                    fontFamily: 'SFProDisplay-Regular',
                    lineHeight: 20.29,
                    color: COLORS.black,
                    height: 38,
                  }}
                  value={'+7'}
                />
                {isFocused && (
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 0,
                      zIndex: 100,
                    }}
                    onPress={() => updateData('phone_number', '')}>
                    <Icons.ClearButton />
                  </TouchableOpacity>
                )}
                <MaskInput
                  onFocus={() => setIsFocused(true)}
                  placeholderFillCharacter={'0'}
                  keyboardType={
                    Platform.OS === 'android'
                      ? 'numeric'
                      : 'numbers-and-punctuation'
                  }
                  value={formData.phone_number}
                  onChangeText={(masked, unmasked) => {
                    updateData('phone_number', unmasked);
                  }}
                  mask={[
                    '(',
                    /\d/,
                    /\d/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                    ' ',
                    /\d/,
                    /\d/,
                  ]}
                  style={{
                    flex: 1,
                    fontSize: SIZES.h3,
                    fontFamily: 'SFProDisplay-Regular',
                    lineHeight: 20.29,
                    color: COLORS.black,
                    height: 38,
                  }}
                />
              </View>
            </View>
            <Field
              label="Доп. описание (необязательно)"
              updateData={updateData}
              field="about"
              incomingValue={formData.about}
              showIconReset
              placeholder=" "
              customContainerStyle={{ height: 120 }}
              customPlaceholderStyle={{
                fontSize: SIZES.body3,
                paddingTop: SIZES.padding * 1.5,
              }}
              onFocus={() => setIsFocused(false)}
            />
          </View>
        );
    }
    
    return (
        <Container
            customContainerStyle={{
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: COLORS.white,
                paddingTop:15,
            }}>
            <SafeAreaView>
                <WrapperAsyncRequest status={APIStatus.Success}>
                    
                    <StatusBar animated={true} backgroundColor={'#38B8E0'} hidden = {false} translucent barStyle={'translucent'}/>
                    <Navbar height={60}
                            header="Редактирование визитки"
                            navigation={navigation}
                            styleBody={{backgroundColor:COLORS.white, paddingTop: 14}}
                            styleIcon={{paddingTop: 10}}/>
                            
                    <Hr style={{ marginLeft: -16, marginBottom: 24}}/>
                    <KeyboardAvoidingView
                        // behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
                        style={{zIndex: -500}}>
                        <ScrollView keyboardShouldPersistTaps="handled">
                            <ChoiceAvatar photo={avatar} isAvatar={false}/>
                            {returnContent()}
                        </ScrollView>
                    </KeyboardAvoidingView>
                </WrapperAsyncRequest>
            </SafeAreaView>
            <TextButton
                label={'Сохранить'}
                customContainerStyle={{
                    backgroundColor: COLORS.primary,
                    marginBottom: SIZES.padding * 1.6,
                }}
                customLabelStyle={{color: COLORS.white}}
                onPress={onPress}
            />
            <CustomModalEasy
                button={'Ok'}
                text={'Специалист с указанным номером телефона уже зарегистрирован в системе. Его данные будут обновлены'}
                setModalVisible={setModalVisible}
                visible={modalVisible}
                setConfirmation={setConfirmation}
            />
        </Container>
    );
};

export default EditBusinessCard;
