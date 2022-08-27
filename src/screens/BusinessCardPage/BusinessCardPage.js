import React, { useEffect, useState } from 'react'
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
  StatusBar,
} from 'react-native';
import Icons from '../../assets/icons/svgIcons/Icons';
import NavbarRecordScreen from '../../components/NavbarRecordScreen';
import { COLORS, FONTS } from '../../constants'
import RightIconArrow from '../../assets/icons/svgIcons/RightIconArrow';
import { Hr } from '../../components';
import CalendarIcon from '../../assets/icons/svgIcons/calendarIcon';
import { IconShare } from '../../assets/icons/svgIcons/IconShare';
import IconMessage from '../../assets/icons/svgIcons/IconMessage';
import IconPhone from '../../assets/icons/svgIcons/IconPhone';
import IconHistory from '../../assets/icons/svgIcons/IconHistory';
import { verificationActionCreators } from '../../slices/verificationSlice';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

const BusinessCardPage = ({ navigation, textColor = '#68213D', route }) => {

  const infoSpecialist = route?.params?.item;
  const colorText = infoSpecialist?.buttonsColor || COLORS.brown;
  const colorButtonNavbar = infoSpecialist?.card?.textColor || COLORS.white;
  const isSentComplaints = useSelector(state => state.verification.isSentComplaints);
  const { sentComplaints } = verificationActionCreators();
  const toast = useToast();
  
  const [isOpen, setIsOpen] = useState(false)


  React.useEffect(() => {
    if (isSentComplaints) {
      toast.show(
        'Жалоба отправлена, мы обязательно отреагируем на ваше обращение.',
        {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
          textStyle: { ...FONTS.body3 },
          normalColor: '#435155',
        },
      );
      sentComplaints(null);
    }else if(isSentComplaints === false){
      toast.show(
        'Что-то пошло не так. Попробуйте позже.',
        {
          type: 'normal',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
          textStyle: { ...FONTS.body3 },
          normalColor: '#435155',
        },
      );
      sentComplaints(null);
    }
  }, [isSentComplaints]);

  return (
    <>
      <StatusBar
        animated={true}
        translucent
        backgroundColor={isOpen ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.0)'}
      />
      <ScrollView style={{ backgroundColor: 'white' }}>
        <ImageBackground
          style={{
            height: 320,
            paddingTop: StatusBar.currentHeight
          }}
          source={{ uri: infoSpecialist?.backgroundImage }}>
          <NavbarRecordScreen
            optionMenu={true}
            icon={true}
            infoSpecialist={infoSpecialist}
            setIsOpen = {setIsOpen}
            isOpen={isOpen}
            stylesHeader={{
              flex: 0.1,
            }}
            stylesHeaderBackIcon={
              {
                // paddingLeft: 16,
              }
            }
            stylesHeadersText={{
              backgroundColor: colorButtonNavbar,
              color: colorText,
              padding: 4,
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 4,
            }}
            colorButton={colorButtonNavbar}
            colorMenuOption={colorButtonNavbar}
            navigation={navigation}
            header={
              infoSpecialist?.speciality
                ? infoSpecialist?.speciality
                : 'Специальность'
            }
          />
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            {infoSpecialist?.avatar ? (
              <Image
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: 50,
                  marginTop: 25,
                }}
                source={{ uri: infoSpecialist?.avatar }}
              />
            ) : (
              <Icons.Avatar styles={{ width: 88, height: 88, marginTop: 25 }} />
            )}
            <Text
              style={{
                fontFamily: 'SF Pro Display',
                fontWeight: '800',
                fontSize: 17,
                lineHeight: 20,
                color: colorButtonNavbar,
                marginTop: 16,
              }}>{`${infoSpecialist?.name ?? ''} ${
              infoSpecialist?.surname ?? ''
            }`}</Text>
            <Text
              style={{
                marginTop: 8,
                color: colorButtonNavbar,
                textAlign: 'center',
                marginLeft: 48,
                marginRight: 48,
                fontWeight: '400',
                ...FONTS.body8,
                letterSpacing: 1,
                fontSize: 14,
              }}>
              {infoSpecialist?.description ?? ''}
            </Text>
          </View>
        </ImageBackground>
        {infoSpecialist?.address && (
          <View
            style={{
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 14,
                color: '#787880',
              }}>
              Адрес:
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: '#1C1C1E',
                marginRight: 16,
                marginTop: 4,
              }}>
              {infoSpecialist?.address}
            </Text>
            {infoSpecialist?.placement && <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: '#1C1C1E',
                marginRight: 16,
                marginTop: 4,
              }}>
              {infoSpecialist?.placement
                ? `${infoSpecialist?.placement} кв./офис, `
                : ''}
              {infoSpecialist?.floor
                ? `${infoSpecialist?.floor} этаж`
                : ''}
            </Text>}
            {!!+infoSpecialist?.coordinates?.latitude &&
              !!+infoSpecialist?.coordinates?.longitude && (
                <TouchableOpacity
                  onPress={() =>
                    !infoSpecialist?.isDummy &&
                    navigation.navigate('Map', { infoSpecialist })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: colorText,
                      fontSize: 12,
                      fontWeight: '600',
                      lineHeight: 14,
                      marginTop: 10,
                    }}>
                    {'Показать на карте'}
                  </Text>
                  <RightIconArrow
                    style={{
                      marginTop: 12,
                      marginLeft: 10,
                    }}
                    color={colorText}
                  />
                </TouchableOpacity>
              )}
          </View>
        )}
        <Hr />
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 16,
          }}>
          <TouchableOpacity>
            <Icons.Instagram />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons.Vkontakte />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons.Youtube />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icons.TikTok />
          </TouchableOpacity>
        </View>
        <Hr /> */}
        <View style={styles.containerLinks}>
          <TouchableOpacity
            style={styles.containerLink}
            onPress={() => {
              navigation?.navigate('RecordScreen', infoSpecialist);
            }}>
            <CalendarIcon color={colorText} />
            <Text style={styles.textLink}>Записаться</Text>
          </TouchableOpacity>
          <Hr />
          {/* <TouchableOpacity style={styles.containerLink}>
            <IconMessage color={colorText} />
            <Text style={[styles.textLink, { marginLeft: 20 }]}>
              Перейти в чат
            </Text>
          </TouchableOpacity>
          <Hr /> */}
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${infoSpecialist?.phoneNumber}`); // TODO change country code to dynamic value
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={styles.containerLink}>
              <IconPhone color={colorText} />
              <Text style={styles.textLink}>Позвонить</Text>
            </View>
            <Text style={{ marginRight: 16, color: '#787880' }}>
              {infoSpecialist?.phoneNumber}
            </Text>
          </TouchableOpacity>
          <Hr />
          <TouchableOpacity
            style={styles.containerLink}
            onPress={() => navigation.navigate('HistoryPageSpecialist', route)}>
            <IconHistory color={colorText} />
            <Text style={[styles.textLink, { marginLeft: 19 }]}>
              История записей
            </Text>
          </TouchableOpacity>
          <Hr />
          <TouchableOpacity
            style={styles.containerLink}
            onPress={() =>
              !infoSpecialist.isDummy &&
              navigation.navigate('Share', infoSpecialist )
            }>
            <IconShare fill={colorText} />
            <Text style={[styles.textLink, { marginLeft: 24 }]}>
              Поделиться
            </Text>
          </TouchableOpacity>
          <Hr />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  containerLinks: {
    marginLeft: 16,
  },
  containerLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLink: {
    color: '#1C1C1E',
    marginTop: 19,
    marginBottom: 19,
    marginLeft: 22,
    fontSize: 15,
    lineHeight: 18,
  },
});

export default BusinessCardPage;
