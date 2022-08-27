import React from 'react'

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import { COLORS, SIZES } from '../constants'


export const Toast = ({
  content,
  containerStyle,
  textStyle,
  buttonTitle ,
  direction = 'column',
  duration = 5,
  showTimer = false,
  handleClick,
}) => {

  return (
    <View style={[
      styles.toastContainer,
      { flexDirection: direction },
      containerStyle,
    ]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        {showTimer && <CountdownCircleTimer
          updateInterval={0}
          isPlaying={true}
          size={20}
          strokeWidth={2}
          duration={duration}
          colors={COLORS.white}
          colorsTime={duration}
          trailColor={'#435155'}
        >

        </CountdownCircleTimer>}


        <View style={
          [styles.content, textStyle]}
        >
          <Text style={[styles.content]}>
            {content}
          </Text>
        </View>
      </View>


      {buttonTitle && <TouchableOpacity onPress={handleClick}>
        <Text style={styles.buttonText}>
          {buttonTitle}
        </Text>
      </TouchableOpacity>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  toastContainer: {
    justifyContent: 'space-between',
    borderRadius: 8,
    position: 'absolute',
    zIndex: 100,
    bottom: 10,
    padding: SIZES.padding * 1.6,
    margin: SIZES.padding * 1.6,
    backgroundColor: '#435155',
    width: '100%',
  },
  content: {
    color: COLORS.white,
    paddingLeft: 16,
    // display: 'inline',
    width: 204,
  },
  buttonText: {
    color: COLORS.white,
  },
})
