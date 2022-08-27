import React, { useEffect, useState } from 'react';
import { View, Text, BackHandler, Linking, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { defaultToken } from '../../api/api';
import { SIZES, COLORS } from '../../constants';
import Icons from '../../assets/icons/svgIcons/Icons';
import MainLayouts from '../../layouts/MainLayouts';
import { SwipeableCards } from '../../components/SwipeableCards';
import { verificationActionCreators } from '../../slices/verificationSlice';
import { getId } from '../../utils/getId';
import { returnHeader } from "./renderHeader";
import { useDeleteSpecById } from '../hooks/useDeleteSpecById';
import { useGetLoggedInClient } from '../hooks/useGetLoggedInClient';
import { useGetSpecialistById } from '../hooks/useGetSpecialistById';
import { useGetSpecialistCard } from '../hooks/useGetSpecialistCard';
import { useGetBusinessCards } from './hooks/useGetBusinessCards';
import { useGetComplaints } from './hooks/useGetComplaints';
import { useFetchCreateAppointment } from '../RecordsScreen/hooks/useFatchCreateAppoinment';
import { Toast } from '../../components/Toast';

const CreateBusinessCard = ({navigation, route}) => {
    const {fetch: fetchSpecById} = useGetSpecialistById();
    const {fetch} = useGetBusinessCards();
    const {fetch: useGetComplaint} = useGetComplaints();
    const {fetch: deleteSpecById} = useDeleteSpecById();
    const {fetch: fetchLoggedInUser} = useGetLoggedInClient();
    const {fetch: fetchCreatAppointment} = useFetchCreateAppointment();
    const {fetch: getSpecData} = useGetSpecialistCard();
    
    const {argsCreateHistoryCard} = useSelector( ({recordScreen}) => recordScreen, );
    const businessCards = useSelector( state => state.verification.businessCards );
    const photo = useSelector( state => state.verification.userData.photo );
    const complaints = useSelector( state => state.verification.complaints );
    const currentToken = useSelector( state => state.verification.token );
    const {editBusinessCardActionFinish, setShouldShowOnboarding} = verificationActionCreators();
    
    const [showToast, setShowToast] = useState( false );
    const [isDeleteCard, setIsDeleteCard] = useState( true );
    const [cardsToRender, setCardsToRender] = useState( businessCards );
    const [id, setId] = useState( null );
    const [specId, setSpecId] = useState( null );
    
    let idCreatTimeout = false;
    const token = currentToken || defaultToken;
    const toast = useToast();
    
    const deleteCard = item => {
        if (!!item.color?.activity_kind) {
            deleteSpecById( {id: item?.id, type: 'specialist'} );
        }
        else {
            deleteSpecById( {id: item?.id, type: 'dummy'} );
        }
        const newCards = businessCards.filter( card => card.id !== item.id );
        editBusinessCardActionFinish( newCards );
        setCardsToRender( newCards );
        fetch();
        setIsDeleteCard( true );
    };
    
    const handleDelete = item => {
        const duration = 4000;
        let isCancel = false;
        const arrBusinessCards = businessCards;
        setIsDeleteCard( false );
        setCardsToRender( businessCards.filter( i => i.id !== item.id ) );
        let id = toast.show( 'Визитка удалена', {
            type: 'custom_type',
            duration: duration,
            placement: 'bottom',
            offset: 30,
            animationType: 'slide-in',
            onPress: () => {
                toast.hide( id ), (isCancel = true);
                setCardsToRender( arrBusinessCards );
                setIsDeleteCard( true );
            },
        } );
        setTimeout( () => !isCancel && deleteCard( item ), duration );
    };
    
    useEffect( () => {
        fetchLoggedInUser();
        fetch();
        BackHandler.addEventListener( 'hardwareBackPress', () => {
            BackHandler.exitApp();
        } );
        if (token) {
            setShouldShowOnboarding( false );
        }
        Linking.getInitialURL().then( url => {
            const id = getId( url );
            setSpecId( id );
        } ).catch( err => {
            console.error( err );
        } );
        Linking.addEventListener( 'url', url => {
            const id = getId( url.url );
            setSpecId( id );
        } );
    }, [] );
    
    useEffect( () => {
        setCardsToRender( businessCards );
    }, [businessCards, navigation] );
    
    useEffect( () => {
        fetch();
        fetchLoggedInUser();
        if (isDeleteCard) {
            setCardsToRender( businessCards );
            fetch();
        }
        const card = businessCards.filter( item => +item.id === +specId );
        if (card.length > 0) {
            navigation.navigate( 'BusinessCardPage', {
                item: card[0],
            } );
            setSpecId( null );
        }
    }, [businessCards.length, navigation] );
    
    useEffect( () => {
        if (!complaints) {
            useGetComplaint();
        }
    }, [complaints] );
    
    useEffect( () => {
        if (route?.params?.name === 'RecordScreen') {
            setShowToast( true );
            idCreatTimeout = setTimeout( () => {
                fetchCreatAppointment( argsCreateHistoryCard );
                setShowToast( false );
            }, 2000 + 700 );
            setId( idCreatTimeout );
        }
        return () => clearTimeout( idCreatTimeout );
    }, [route] );
    
    useEffect( () => {
        if (specId) {
            fetchSpecById( specId, res => {
                const specData = {
                    name: res.data.name,
                    phone_number: res.data.phone,
                    surname: res.data.surname,
                };
                getSpecData( specData );
            } );
        }
    }, [specId] );
    
    if (!businessCards.length) {
        return (
            <MainLayouts
                customContainerStyle={styles.styleLayouts}>
                {returnHeader( businessCards, navigation, photo, setCardsToRender )}
                <StatusBar animated={true} backgroundColor={'#38B8E0'} hidden = {false} translucent barStyle={'light-content'}/>
                <View
                    style={[styles.iconNoCard, {justifyContent: businessCards.length ? 'flex-end' : 'center'}]}>
                    <Icons.IconNoCards/>
                </View>
            </MainLayouts>
        );
    }
    
    return (
      <MainLayouts
        customContainerStyle={{
          ...styles.styleLayouts,
          paddingBottom: 10,
        }}>
        {showToast && (
          <Toast
            content={'Запись создана'}
            showTimer={true}
            duration={2}
            buttonTitle={'Отмена'}
            direction={'row'}
            handleClick={() => {
              clearTimeout(id);
              setShowToast(false);
            }}
          />
        )}
        {returnHeader(businessCards, navigation, photo, setCardsToRender)}
        {!cardsToRender.length ? (
          <View style={styles.styleNoCardContainer}>
            <StatusBar
              animated={true}
              backgroundColor={'#38B8E0'}
              hidden={false}
              translucent
              barStyle={'light-content'}
            />
            <Text style={{ color: COLORS.textGray }}>
              {'Ничего не найдено'}
            </Text>
          </View>
        ) : (
          <View style={styles.styleCardContainer}>
            <SwipeableCards
              route={route}
              navigation={navigation}
              handleDelete={handleDelete}
              data={cardsToRender}
            />
          </View>
        )}
      </MainLayouts>
    );
};

const styles = StyleSheet.create( {
    styleLayouts: {
        padding: SIZES.padding * 1.6,
        backgroundColor: COLORS.white,
        paddingTop: 0,
    },
    iconNoCard: {
        flex: 1,
        alignItems: 'center',
    },
    styleNoCardContainer: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleCardContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
} )

export default CreateBusinessCard;
