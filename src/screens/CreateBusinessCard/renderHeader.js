import React, { useCallback, useState } from "react";
import { Image, StatusBar, TouchableOpacity, View, StyleSheet } from "react-native";
import CroppedModalWindow from "../../modals/CroppedModal";
import { ModalCreatBusinessCard } from "../../modals/ModalCreatBusinessCard";
import { avatarURL } from "../ProfilePage/ProfilePage";
import { Avatar, SearchInput } from "../../components";
import Icons from "../../assets/icons/svgIcons/Icons";
import { COLORS, SIZES } from "../../constants";

export function returnHeader (businessCards, navigation, photo, setCardsToRender) {
    const [isSearching, setIsSearching] = useState( false );
    const [openModal, setOpenModal] = useState( false );
    
    const handleSearch = useCallback(
        (inputValue = '') => {
            setIsSearching( true );
            if (inputValue.toString().trim() === '') {
                setCardsToRender( businessCards );
            }
            const filteredCards = businessCards.filter( card => {
                const {name, surname, phoneNumber, speciality} = card;
                return `${name}${surname}${phoneNumber}${speciality}`.toLowerCase()?.includes( inputValue.toString()?.trim()?.toLowerCase() );
            } );
            setCardsToRender( filteredCards );
        },
        [isSearching],
    );
    
    const handleClear = useCallback( () => {
        setCardsToRender( businessCards );
    }, [isSearching] );
    
    if (isSearching) {
        return (
          <View style={styles.containerSearchInput}>
            <TouchableOpacity
              onPress={() => {
                setIsSearching(false);
                setCardsToRender(businessCards);
              }}
              style={styles.searchButton}>
              <Icons.ArrowBack />
            </TouchableOpacity>
            <SearchInput
              width={'90%'}
              getInputData={handleSearch}
              placeholder={'Поиск специалиста'}
              withClearButton={true}
              onClear={handleClear}
            />
          </View>
        );
    }
    return (
        <View
            style={styles.container}>
            {!photo ? (
                <Avatar onPress={() => navigation.navigate( 'ProfilePage' )}/>
            ) : (
                <TouchableOpacity onPress={() => navigation.navigate( 'ProfilePage' )}>
                    <Image
                        source={{uri: avatarURL( photo )}}
                        resizeMode="cover"
                        resizeMethod="scale"
                        style={styles.iconUser}
                    />
                </TouchableOpacity>
            )}
            <View
                style={styles.containerIcons}>
                <TouchableOpacity
                    onPress={()=> setIsSearching(true)}
                    style={{marginRight: 10, paddingTop: 5, paddingRight: 32}}>
                    <Icons.Search color={COLORS.primary}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setOpenModal( !openModal )}
                    style={{paddingTop: 5}}>
                    <Icons.Plus/>
                </TouchableOpacity>
            </View>
            <CroppedModalWindow
                component={ModalCreatBusinessCard}
                isVisible={openModal}
                onClose={() => setOpenModal( false )}
                navigation={navigation}
                type={'bottom'}
                name={'addCard'}
            />
        </View>
    );
}

const styles = StyleSheet.create( {
    containerSearchInput: {
        marginBottom: SIZES.padding * 1.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight -1,
    },
    searchButton: {
        paddingRight: 15,
        marginTop: -7,
        height: 48,
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: SIZES.padding * 3.2,
        paddingTop: StatusBar.currentHeight +10,    
    },
    iconUser: {
        width: 32,
        height: 32,
        borderRadius: 50
    },
    containerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 5,
    }
} )
