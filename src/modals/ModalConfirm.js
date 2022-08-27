import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native';
import Modal from 'react-native-modal';

export const ModalConfirm = ({
                                 visible,
                                 navigation,
                                 closeModal,
                                 openModal,
                                 text,
                                 text2,
                                 colorText,
                                 buttonFunction,
                                 buttonFunction2,
                                 setIsOpen,
                                 isOpen
                             }) => {
    
    const importContactsHandler = () => {
        closeModal( false );
        
        PermissionsAndroid.request( PermissionsAndroid.PERMISSIONS.READ_CONTACTS ).then( res => {
            console.log( res, 'response' )
            if (res === 'granted') {
                navigation.navigate( 'ContactImports' );
                closeModal( false );
            }
            else {
                closeModal( false );
            }
        } ).catch( err => console.log( err, 'error in import' ) );
    };
    
    const deleteContact = () => {
        closeModal( false );
        setIsOpen( false );
        navigation.navigate( 'AddBusinessCard' );
    };
    
    return (
        <View style={styles.modal}>
            <View style={styles.containerButtonAdd}>
                <TouchableOpacity
                    style={styles.buttonAddCard}
                    onPress={buttonFunction ? buttonFunction : deleteContact}>
                    <Text style={[styles.textButton, {color: colorText}]}>{text}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerButtonImportContact}>
                <TouchableOpacity
                    onPress={buttonFunction2 ? buttonFunction2 : importContactsHandler}
                    style={styles.buttonAddCard}>
                    <Text style={[styles.textButton, {color: colorText}]}>{text2}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerCancelButton}>
                <TouchableOpacity
                    onPress={() => {
                        closeModal( false )
                        setIsOpen( false )
                    }}
                    style={styles.buttonAddCard}>
                    <Text style={styles.textCancelButton}>Отмена</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    modal: {
        width: '100%',
        margin: 0,
        padding: 10,
        justifyContent: 'flex-end', // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerButtonAdd: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#73575D',
    },
    containerButtonImportContact: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
    },
    containerCancelButton: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 13,
    },
    buttonAddCard: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 57,
    },
    
    textButton: {
        fontSize: 18,
        letterSpacing: 0.38,
        fontWeight: '400',
    },
    textCancelButton: {
        fontSize: 20,
        color: '#007AFF',
        fontWeight: '600',
        letterSpacing: 0.38,
    },
} );
