import React from 'react'
import Modal from 'react-native-modal'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'


const CustomModal = ({
  text,
  item,
  buttonCancel,
  buttonSubmit,
  onSubmit,
  visible,
  setModalVisible,
}) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        setModalVisible(!visible);
      }}>
      <View style={styles.containerModal}>
        <View style={styles.header}>
          {/*<Text style={styles.headerTitle}>{text}</Text>*/}
          <Text style={[{ color: COLORS.blackText }, styles.headerTitle]}>
            {text}
            <Text style={styles.textBold}>
              {' '}
              {item?.name} {item?.surname}
            </Text>
            ?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(!visible)}
            style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>{buttonCancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onSubmit(item);
              setModalVisible(false);
            }}
            style={styles.okButton}>
            <Text style={styles.okButtonText}>{buttonSubmit}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: '#E6E6E6',
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
    paddingTop: SIZES.padding1,
    paddingHorizontal: SIZES.padding1,
    paddingBottom: 8,
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
    width: '50%',
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
    paddingTop: 11,
    paddingBottom: 11,

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

export default CustomModal
