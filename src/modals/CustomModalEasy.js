import React from 'react'
import Modal from 'react-native-modal'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'


const CustomModalEasy = ({
  button,
  text,
  visible,
  setModalVisible,
  setConfirmation,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        setModalVisible(!visible)
      }}>
      <View style={styles.containerModal}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{text}</Text>
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: COLORS.gray,
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!visible), setConfirmation(true)
            }}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{button}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: '#FFF',
    opacity: 0.8,
    borderRadius: SIZES.body6,
  },
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '400',
    fontSize: SIZES.body6,
    lineHeight: 20,
    letterSpacing: 1,
    padding: SIZES.padding1,
    color: '#1C1C1E',
  },
  headerText: {
    ...FONTS.body8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 18.5,
    color: '#353535',
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#3F3F3F',
  },
  cancelButton: {
    width: '100%',
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: '#3F3F3F',
  },
  okButton: {
    width: '50%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007AFF',
    fontSize: 17,
    lineHeight: 22,
    paddingVertical: 11,
  },
  okButtonText: {
    color: COLORS.red,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    paddingTop: 11,
    paddingBottom: 11,
  },
})

export default CustomModalEasy
