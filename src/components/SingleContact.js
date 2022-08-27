import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import {
  TouchableHighlight,
  TouchableNativeFeedback, TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { COLORS } from '../constants'
import Avatar from './Avatar'


export const SingleContact = ({contactPic, fullName, phoneNumber, handlePress}) => {

  return(
    <TouchableNativeFeedback onPress={handlePress} style={styles.container}>
      {contactPic ? <Image/> : <Avatar/>}

      <View style={styles.details}>
        <Text style={{color: COLORS.blackText, fontSize: 15}}>{fullName}</Text>
        <Text style={{color: COLORS.textGray, fontSize: 12, marginLeft: -10}}>    {phoneNumber}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 14,
    marginLeft: 14
  },
  details: {
    marginLeft: 16
  }


})