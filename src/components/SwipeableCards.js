import React, { useState } from 'react';
import { View, TouchableOpacity, StatusBar, TouchableHighlight, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import IconTrash from '../assets/icons/svgIcons/IconTrash';
import CustomModal from '../modals/CustomModal';
import { DefaultCard } from './index';
import { COLORS } from '../constants';

export const SwipeableCards = ({data, navigation, handleDelete}) => {
    const [modalVisible, setModalVisible] = useState( false );
    const [item, setItem] = useState( null );
    
    return (
        <View
            style={styles.container}>
            <StatusBar animated={true} backgroundColor={'#38B8E0'} hidden = {false} translucent barStyle={'light-content'}/>
            <SwipeListView
                onLeftAction={() => console.log( 'left' )}
                data={data}
                useAnimatedList={true}
                closeOnRowOpen={true}
                rightActionValue={150}
                closeOnRowBeginSwipe={true}
                renderItem={({item, index}) => {
                    return <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor={COLORS.white}
                        onPress={() => {
                            item.color.activity_kind &&
                            navigation.navigate( 'BusinessCardPage', {item} );
                        }}
                        disabled={item.isDummy}>
                        <DefaultCard
                            navigation={navigation}
                            imageBackground={item.backgroundImage}
                            uri={item.background_image}
                            textColor={COLORS.white}
                            gradientColor={['#41ABCC', '#2D93B3']}
                            item={item}
                            index={index}
                            colorIcons={item?.card ? item?.card?.buttonsColor : '#1C7F9E'}
                        />
                    </TouchableHighlight>
                }}
                renderHiddenItem={rowData => {
                    return (
                        <View
                            style={styles.containerRenderHiddenItem}>
                            <TouchableOpacity
                                onPress={() => {
                                    setItem( rowData.item );
                                    setModalVisible( true );
                                }}
                                style={styles.iconTrash}>
                                <IconTrash/>
                            </TouchableOpacity>
                        </View>
                    );
                }}
                rightOpenValue={-76}
                stopRightSwipe={-76}
                disableRightSwipe={true}
                useNativeDriver={true}
                previewOpenValue={50}
                swipeToOpenPercent={20}
                swipeToClosePercent={10}
            />
            <CustomModal
                onSubmit={handleDelete}
                item={item}
                buttonCancel={'Отмена'}
                buttonSubmit={'Удалить'}
                text={'Вы действительно хотите удалить визитку'}
                setModalVisible={setModalVisible}
                visible={modalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    containerRenderHiddenItem: {
        backgroundColor: '#D64641',
        height: 180,
        position: 'absolute',
        width: 76,
        right: -15,
        zIndex: 500,
        borderRadius: 15,
    },
    iconTrash: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
} )
