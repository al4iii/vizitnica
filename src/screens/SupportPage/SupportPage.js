import {
    SafeAreaView,
    Keyboard,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import Icons from '../../assets/icons/svgIcons/Icons';
import React, { useEffect, useState } from 'react';
import { Field } from '../../components';
import * as DocumentPicker from 'react-native-document-picker';
import { useFetchSupport } from './hooks/useFetchSupport';
import { useToast } from 'react-native-toast-notifications';

const SupportPage = ({navigation}) => {
    const toast = useToast();
    const [valueTextArea, setValueTextArea] = useState( '' );
    const [valueEmail, setValueEmail] = useState( '' );
    const [file, setFile] = useState( [{name: 'Прикрепить файл'}] );
    const [errorQuestion, setErrorQuestion] = useState( false );
    const [errorEmail, setErrorEmail] = useState( false );
    const [isDisabled, setIsDisabled] = useState( false );
    const [isFocusedQuestion, setIsFocusedQuestion] = React.useState( false );
    const [isFocusedEmail, setIsFocusedEmail] = React.useState( false );
    const [isFormatEmail, setIsFormatEmail] = useState( false );
    const [isStatus, setIsStatus] = useState( false )
    
    const {fetchSupport, status} = useFetchSupport();
    
    const handleError = () => {
        !valueTextArea ? setErrorQuestion( true ) : setErrorQuestion( false );
        !valueEmail ? setErrorEmail( true ) : setErrorEmail( false );
        if (valueEmail.match( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ )) {
            setIsFormatEmail( false );
        }
        else {
            setIsFormatEmail( true );
        }
    };
    
    const createSupport = () => {
        let loadedFile = new FormData();
        if (file[0]?.uri) {
            loadedFile.append( 'file', {
                uri: file[0]?.uri,
                type: file[0]?.type,
                name: file[0]?.name,
            } );
        }
        loadedFile.append( 'text', valueTextArea );
        loadedFile.append( 'email', valueEmail );
        if (
            !!valueTextArea.length &&
            valueEmail.match( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ )
        ) {
            Keyboard.dismiss();
            setIsDisabled( true );
            fetchSupport( loadedFile, valueTextArea, valueEmail );
        }
    };
    
    useEffect( () => {
        if (status === 'Loading' || status === 'Success') {
            setIsStatus( true )
        } else {
            setIsStatus(false)
        }
        if (status === 'Success') {
            setIsDisabled( false );
            toast.show(
                'Ваше обращение успешно отправлено. Мы ответим по электронной почте',
                {
                    type: 'normal',
                    placement: 'bottom',
                    duration: 4000,
                    offset: 30,
                    animationType: 'slide-in',
                    textStyle: {...FONTS.body3},
                    normalColor: '#435155',
                },
            );
            navigation.navigate( 'ProfilePage' );
        }
        else if (status.toLowerCase() === 'Failure'.toLowerCase()) {
            setIsDisabled( false );
            toast.show( 'Что то пошло не так, жалоба не была отправлена', {
                type: 'normal',
                placement: 'bottom',
                duration: 4000,
                offset: 30,
                animationType: 'slide-in',
                textStyle: {...FONTS.body3},
                normalColor: '#435155',
            } );
            navigation.navigate( 'ProfilePage' );
        }
    }, [status] );
    
    const updateData = (name, value) => {
        if (name === 'question') {
            setValueTextArea( value );
            setErrorQuestion( !value.length );
        }
        if (name === 'email') {
            setValueEmail( value );
        }
    };
    
    const uploadFile = async () => {
        const res = await DocumentPicker.pick( {
            type: [DocumentPicker.types.allFiles],
        } );
        setFile( res );
    };
    
    return (
        <>
            <SafeAreaView>
                <View style={styles.container}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: SIZES.padding * 1.6,
                            borderBottomWidth: 1,
                            borderColor: COLORS.lightGray,
                            paddingTop: StatusBar.currentHeight + 6,
                            paddingBottom: 5,
                        }}>
                        <View
                            style={{
                                flex: 0.1,
                                alignItems: 'center',
                                marginLeft: -SIZES.padding * 1.4,
                            }}>
                            <TouchableOpacity
                                style={{padding: 10}}
                                onPress={() => navigation.navigate( 'ProfilePage' )}>
                                <Icons.CloseButton color={COLORS.primary}/>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                marginLeft: -SIZES.padding * 1.4,
                            }}>
                            <Text style={{...FONTS.h4, color: COLORS.black}}>
                                {'Обращение'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.containerBody}>
                        <Field
                            label="Ваш вопрос"
                            updateData={updateData}
                            styleLabel={styles.textAreaPlaceholder}
                            // incomingValue={'question'}
                            showIconReset
                            customContainerStyle={{
                                height: 120,
                                borderColor:
                                    errorQuestion || (isFocusedEmail && !valueTextArea.length)
                                        ? 'red'
                                        : isFocusedQuestion
                                            ? COLORS.primary
                                            : COLORS.lightGray,
                            }}
                            customPlaceholderStyle={{
                                fontSize: SIZES.body3,
                                paddingTop: SIZES.padding * 1.5,
                            }}
                            maxLength={1000}
                            field={'question'}
                            onFocus={() => {
                                setIsFocusedQuestion( !isFocusedQuestion ),
                                    setIsFocusedEmail( false );
                            }}
                        />
                        <View style={styles.containerAddedFile}>
                            <TouchableOpacity
                                style={[styles.addedFile, {marginBottom: 22}]}
                                onPress={uploadFile}>
                                <Icons.AddFile/>
                                <Text style={{marginLeft: 8, color: COLORS.gray}}>
                                    {file[0].name}
                                </Text>
                            </TouchableOpacity>
                            {file[0].name !== 'Прикрепить файл' && (
                                <TouchableOpacity
                                    onPress={() => setFile( [{name: 'Прикрепить файл'}] )}>
                                    <Icons.DeleteIcon/>
                                </TouchableOpacity>
                            )}
                        </View>
                        <Field
                            label="Email"
                            updateData={updateData}
                            showIconReset
                            customContainerStyle={{
                                borderColor:
                                    errorEmail || isFormatEmail
                                        ? 'red'
                                        : isFocusedEmail
                                            ? COLORS.primary
                                            : COLORS.lightGray,
                            }}
                            field={'email'}
                            onFocus={() => {
                                setIsFocusedEmail( !isFocusedEmail ), setIsFocusedQuestion( false );
                            }}
                        />
                        {isFormatEmail && (
                            <Text style={{color: 'red'}}>
                                Невозможно связаться по этому адресу. Проверьте, нет ли ошибок
                            </Text>
                        )}
                        <TouchableOpacity
                            style={!isStatus ? styles.button : [styles.button, styles.styleButtonDisable]}
                            disabled={isDisabled || isStatus}
                            onPress={() => {
                                handleError();
                                createSupport();
                            }}>
                            
                            {!isStatus ?
                                <Text style={styles.buttonText}>Отправить</Text> :
                                <ActivityIndicator size="large" color="white"/>}
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create( {
    container: {
        backgroundColor: COLORS.white,
        height: '100%',
    },
    containerBody: {
        margin: 16,
    },
    textArea: {
        borderRadius: 8,
        height: 128,
    },
    textAreaPlaceholder: {
        top: -70,
    },
    containerAddedFile: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addedFile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        width: "85%"
    },
    button: {
        height: 48,
        width: '100%',
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginTop: 12,
    },
    styleButtonDisable: {
        backgroundColor:'#C4EAF6'
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: '700',
        lineHeight: 20.29,
        fontSize: 17,
    },
} );

export default SupportPage;
