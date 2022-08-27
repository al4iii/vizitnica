import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import Icons from '../assets/icons/svgIcons/Icons'
import { SIZES, FONTS, images, icons } from '../constants'
import LinearGradient from 'react-native-linear-gradient'


const UserCard = ({
  gradientColor,
  textColor,
  image,
  imageBackground,
  surname,
  business,
  aboutMe,
}) => {
  return (
    <LinearGradient
      colors={gradientColor}
      style={{ width: '100%', height: 182 }}>
      <ImageBackground
        source={imageBackground}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            paddingTop: 16,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              style={{
                ...FONTS.body6,
                textAlign: 'left',
                color: textColor,
                marginBottom: SIZES.padding * 0.4,
              }}>
              {business}
            </Text>
            <Text
              style={{
                ...FONTS.h3,
                fontSize: SIZES.body2,
                lineHeight: 16,
                color: textColor,
                textAlign: 'left',
              }}>
              {surname}
            </Text>
          </View>
          {
            image ? <Image
              source={image }
              style={{
                width: SIZES.padding * 5,
                height: SIZES.padding * 5,
                resizeMode: 'contain',
                borderRadius: 50,
                paddingRight: 30,
              }}
            /> : <Icons.Avatar/>
          }

        </View>
        <Text
          style={{
            ...FONTS.body7,
            textAlign: 'left',
            paddingHorizontal: 16,
            color: textColor,
            height: SIZES.padding * 4.8,
            marginTop: SIZES.padding * 0.8,
            marginBottom: SIZES.padding * 1,
          }}>
          {aboutMe}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                width: 38,
                height: 38,
                backgroundColor: textColor,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
                paddingLeft: 3,
              }}>

              <Icons.Calendar/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 38,
                height: 38,
                backgroundColor: textColor,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}>
  */}

              <Icons.Message/>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 38,
                height: 38,
                backgroundColor: textColor,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 8,
              }}>


              <Icons.Phone/>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              width: 38,
              height: 38,
              backgroundColor: textColor,
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 3,
            }}>

            <Icons.IconShare/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </LinearGradient>
  )
}

export default UserCard
