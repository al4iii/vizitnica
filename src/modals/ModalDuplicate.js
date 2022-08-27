import React from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { FONTS, SIZES } from "../constants";

const ModalDuplicate = ({
                            visible,
                            setModalVisible,
                            navigation,
                            route,
                            calendarValue,
                            duplicateData,
                            getRecordScreenService
                        }) => {
    
    return (
        <Modal isVisible={visible}
        onBackdropPress={() => {
                   setModalVisible( !visible );
               }}
        >
            <View style={styles.containerModal}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Дублирование записей</Text>
                    <Text style={styles.headerText}>У вас уже есть записи <Text
                        style={styles.textBold}>{duplicateData.map( item => `(${item?.service} ${item?.date}, ${item?.time?.start} - ${item?.time?.end}),` )}
                    </Text>. Вы уверены, что хотите создать копии записей?</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => setModalVisible( !visible )} style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Отмена</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.okButton} onPress={() => {
                        navigation.navigate( 'CreateBusinessCard', route )
                        getRecordScreenService([])
                    }}>
                        <Text style={styles.okButtonText}>Создать</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create( {
    containerModal: {
        backgroundColor: '#E6E6E6',
        // width:270,
        // height: 197,
        borderRadius: SIZES.body6
    },
    header: {
        alignItems: 'center'
    },
    headerTitle: {
        fontWeight: '600',
        fontSize: 17,
        lineHeight: 20,
        letterSpacing: 1,
        paddingTop: 16,
        paddingBottom: 8,
        color: '#1C1C1E'
    },
    headerText: {
        ...FONTS.body8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 18.5,
        color: '#353535',
        textAlign: "center",
    },
    textBold: {
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#3F3F3F'
    },
    cancelButton: {
        width: '50%',
        alignItems: "center",
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#3F3F3F'
    },
    okButton: {
        width: '50%',
        alignItems: "center",
    },
    cancelButtonText: {
        color: '#007AFF',
        fontSize: 17,
        lineHeight: 22,
        paddingTop: 11,
        paddingBottom: 11
        
    },
    okButtonText: {
        color: '#007AFF',
        fontSize: 17,
        lineHeight: 22,
        fontWeight: '600',
        paddingTop: 11,
        paddingBottom: 11
    }
    
} )

export default ModalDuplicate
