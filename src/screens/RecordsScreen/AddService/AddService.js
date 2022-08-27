import React, { useEffect, useState } from 'react';
import { StatusBar, TouchableOpacity, View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { recordScreenActionCreators } from '../../../slices/recordScreenSlice';
import NavbarRecordScreen from '../../../components/NavbarRecordScreen';
import AddServiceCard from '../../../components/AddServiceCard';
import SearchInput from '../../../components/SearchInput';
import { COLORS } from '../../../constants';

const AddService = ({navigation, route}) => {
    
    let color;
    let color2;
    let buttonColor;
    let routes;
    if (route?.params?.params?.route?.name !== "BusinessCardPage") {
        routes = route?.params?.params;
        color = routes?.card
            ? routes?.card?.gradientColor
            : '#389FC0';
        color2 = routes?.card
            ? routes?.card?.buttonsColor
            : '#226E86';
        buttonColor = routes?.card?.textColor;
    }
    else {
        routes = route?.params?.params?.route?.params?.item
        color = routes?.color?.colors
            ? routes?.color?.colors?.gradientColor
            : '#389FC0';
        color2 = routes?.color?.colors
            ? routes?.color?.colors?.buttonsColor
            : '#226E86';
        buttonColor = routes?.color?.colors?.textColor;
    }
    const card = useSelector( ({recordScreen}) => recordScreen.card );
    const {addSelected} = recordScreenActionCreators();
    const image_url = route?.params?.params?.avatar
    
    const [isThisCountPrice, setIsThisCountPrice] = useState( false );
    const [searchText, setSearchText] = useState( '' );
    const [id] = useState( 0 );
    const [isIcon, setIsIcon] = useState( false );
    
    const handleSelected = id => {
        addSelected( {id} );
        navigation.goBack();
    };
    
    const search = () => {
        return  card.filter(item => {
            if(item.title.toLowerCase().includes(searchText.toLowerCase())){
                return item
            }
        })
    }
    
    useEffect( () => {
        image_url ? setIsIcon( true ) : setIsIcon( false );
    }, [] );
    
    useEffect( () => {
        setIsThisCountPrice( card.some( item => item?.thisCountPrice?.value ) );
    }, [card] );
    
    useEffect( () => {
        addSelected( id );
    }, [id] );
    
    return (
        <ScrollView style={{backgroundColor: COLORS.white, height: '100%'}}>
            <StatusBar
                animated={false}
                backgroundColor={color}
                barStyle={'light-content'}
            />
            <View style={{paddingTop: StatusBar.currentHeight}}>
                <NavbarRecordScreen
                    colorButton={buttonColor}
                    navigation={navigation}
                    header={'Услуга'}
                    url={image_url}
                    icon={isIcon}
                    stylesHeadersText={{color: buttonColor}}
                    stylesHeader={{ backgroundColor: color, paddingTop:14}}
                />
            </View>
            <View style={styles.inputSearch}>
                <SearchInput
                    color={COLORS.grayLight}
                    getInputData={val => setSearchText( val )}
                />
            </View>
            <View>
                <FlatList
                    keyExtractor={item => item.id}
                    data={search()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity
                            onPress={() => {
                                handleSelected( index )
                            }}>
                            <AddServiceCard
                                colorIcon={color2}
                                item={item}
                                isThisCountPrice={isThisCountPrice}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create( {
    containerAddService: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    inputSearch: {
        margin: 16,
    },
    text: {
        color: '#787880',
    },
} );

export default AddService;
