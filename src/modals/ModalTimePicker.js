import React, { useState } from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
import Picker from "react-native-wheel-pick/src/picker";

const ModalTimePicker = ({
                             visible,
                             setModalVisible,
                             calendarValue,
                             updateData,
    timeSelectValue
                         }) => {
    
    const [valuePicker, setValuePicker] = useState('')
    
    const wheelPickerData = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00'];
    return (
        <Modal
            animationType="slide"
            isVisible={visible}
            onBackdropPress={() => {
                setModalVisible( !visible );
            }}
            style={styled.modal}>
            <View
                style={styled.containerPiker}>
                <View style={styled.header}>
                    <View style={styled.textHeader}>
                        <Text style={styled.textDate}>{calendarValue}</Text>
                    </View>
                    <TouchableOpacity style={styled.textHeader}
                    onPress={() => {
                        setModalVisible( false )
                        updateData(valuePicker ? valuePicker : wheelPickerData[4])
                    }}>
                        <Text style={styled.textOK}>
                            Подтвердить
                        </Text>
                    </TouchableOpacity>
                </View>
                <Picker
                    style={styled.picker}
                    selectedValue={timeSelectValue === 'Время'  ? wheelPickerData[4] : timeSelectValue}
                    pickerData={wheelPickerData}
                    onValueChange={value => {
                        setValuePicker(value)
                    }}
                />
            </View>
        </Modal>
    );
};

const styled = StyleSheet.create( {
    modal: {
        justifyContent: 'flex-end', margin: 0
    },
    containerPiker: {
        backgroundColor: '#DEDEDE',
        width: '100%',
        height: 260,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    picker: {
        width: '100%',
        height: '100%',
        backgroundColor: '#DEDEDE'
    },
    textHeader: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        marginRight: 10
    },
    textDate: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'SFProDisplay-Regular'
    },
    textOK: {
        color: '#007AFF',
        fontWeight: '600',
        fontSize: 15,
        fontFamily: 'SFProDisplay-Regular'
    }
} )

export default ModalTimePicker
