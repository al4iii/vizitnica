import React from "react";
import { PermissionsAndroid, View } from "react-native";
import AccordionModal from "./AccordionModal";
import { AccordionButton } from "./AccordionButton";
import { SIZES } from "../constants";

export const ModalCreatBusinessCard = ({ closeModal, navigation }) => {
    return (
        <AccordionModal onPress={closeModal}>
            <View style={{ borderRadius: SIZES.radius * 1.6, overflow: 'hidden' }}>
                <AccordionButton
                    onPress={() => {
                        closeModal();
                        navigation.navigate('AddBusinessCard');
                    }}
                    label={'Добавить визитку'}
                />
                <AccordionButton
                    onPress={() => {
                        closeModal();
                        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS,)
                        .then(res => {
                            if (res === 'granted') {
                                navigation.navigate('ContactImports');
                                closeModal();
                            }
                        })
                        .catch(() => console.log('error in import'));
                    }}
                    label={'Импортировать из контактов'}
                />
            </View>
        </AccordionModal>
    );
};
