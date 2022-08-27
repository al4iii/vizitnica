import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from 'react-native'
import { SIZES, FONTS, images, icons, COLORS } from '../constants'
import LinearGradient from 'react-native-linear-gradient'
import { verificationActionCreators } from '../slices/verificationSlice'
import { Avatar } from '../components'


const HiddenDefaultCard = ({
  gradientColor,
  textColor,
  imageBackground,
  navigation,
  item,
  opacity = 1

}) => {
  const { editBusinessCardAction } = verificationActionCreators()

  return (
    <LinearGradient
      colors={gradientColor}

      style={{
        opacity,
        width: '100%',
        height: 42,
        marginBottom: SIZES.padding * 0.2,
      }}>
      <ImageBackground
        source={imageBackground}
        resizeMode="cover"
        style={{ width: '100%', height: '100%' }}>

        <View
        style={{
          flexDirection: "row",
          justifyContent: 'space-between',
          height: "100%",
          paddingTop: 14,

          width: "100%"}}
        >

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 16,
              // paddingTop: 16,
              justifyContent: 'space-between',
            }}>

            <View>
              <Text
                style={{
                  ...FONTS.h3,
                  fontSize: SIZES.body2,
                  lineHeight: 16,
                  color: textColor,
                  textAlign: 'left',
                }}>
                {`${item.name} ${item.surname}`}
              </Text>
            </View>
          </View>


          <View
            style={{
              paddingHorizontal: 16,
            }}>

            <Text
              style={{
                ...FONTS.h3,
                fontSize: SIZES.body2,
                lineHeight: 16,
                textAlign: 'right',
                color: textColor,
                marginBottom: SIZES.padding * 0.4,
              }}>
              {item.speciality}
            </Text>

          </View>



        </View>


      </ImageBackground>
    </LinearGradient>
  )
}

export default HiddenDefaultCard


