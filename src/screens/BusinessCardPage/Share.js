import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import Icons from '../../assets/icons/svgIcons/Icons';
import { IconShare } from '../../assets/icons/svgIcons/IconShare';
import { SIZES, FONTS, COLORS } from '../../constants';
import openShare from 'react-native-share';
import files from '../../assets/base64/base64';

const Share = ({ navigation, route }) => {
  const { name, surname, card, avatar, speciality, share } = route.params;

  const onShare = async () => {
    const shareOptions = {
      title: 'Визитница',
      message: `Добавить визитку\nСпециалист: ${name} ${
        surname ?? ''
      }\n${speciality}\n ${share.link}`,
      url: files.appLogo,
    };
    try {
      const ShareResponse = await openShare.open(shareOptions);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <StatusBar
        animated={true}
        backgroundColor={card.gradientColor}
        barStyle={'light-content'}
      />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 6,
          backgroundColor: card.gradientColor,
          paddingTop: StatusBar.currentHeight + 5,
        }}>
        <View
          style={{
            flex: 0.1,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 16, margin: -10 }}>
            <Icons.ArrowBack color={card.textColor} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            ...FONTS.h4,
            color: card.textColor,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          {'Поделиться'}
        </Text>
        {!avatar ? (
          <Icons.Avatar styles={{ marginRight: SIZES.padding }} />
        ) : (
          <Image
            style={{
              height: 32,
              width: 32,
              borderRadius: 50,
              marginRight: SIZES.padding,
            }}
            source={{ uri: avatar }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={onShare}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 16,
        }}>
        <Text
          style={{
            ...FONTS.body10,
            color: card.buttonsColor,
          }}>{`${name ?? ''} ${surname ?? ''}`}</Text>
        <View style={{ marginRight: 4 }}>
          <IconShare fill={card.buttonsColor} />
        </View>
      </TouchableOpacity>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 16,
          height: 400,
          backgroundColor: card.gradientColor,
          borderRadius: 16,
        }}>
        <Text
          style={{
            ...FONTS.h4,
            color: card.textColor,
            fontSize: 13,
            lineHeight: 15.51,
            fontWeight: '700',
            textAlign: 'center',
            marginVertical: 16,
          }}>
          {speciality?.toUpperCase()}
        </Text>
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 335,
            width: 340,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
          }}>
          <Image
            style={{
              height: 300,
              width: 300,
            }}
            source={{ uri: share.qr }}
          />
        </View>
      </View>
    </View>
  );
};

export default Share;
