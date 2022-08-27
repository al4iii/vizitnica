import React from 'react';
import { View, Text, Image, TouchableOpacity, ImageBackground, Linking, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconShare } from '../assets/icons/svgIcons/IconShare';
import { IconPensil } from '../assets/icons/svgIcons/IconPensil';
import Icons from '../assets/icons/svgIcons/Icons';
import { SIZES, FONTS, COLORS } from '../constants';

const DefaultCard = ({gradientColor, textColor, navigation, item, index, colorIcons}) => {
    const {name, surname} = item;
    const nameNormalized = typeof name === 'string' ? name : '';
    const surnameNormalized = typeof surname === 'string' ? surname : '';
    return (
        <LinearGradient
            index={index}
            colors={gradientColor}
            style={styles.containerCard}>
            <ImageBackground
                source={{uri: item.backgroundImage}}
                resizeMode="stretch"
                style={styles.imageBackground}>
                <View style={styles.containerHeaderCard}>
                    <View>
                        <Text style={[styles.textHeaderSpeciality, {color: textColor}]}>
                            {item.speciality}
                        </Text>
                        <Text style={[styles.textHeaderNameSurname, {color: textColor}]}>
                            {`${nameNormalized} ${surnameNormalized}`}
                        </Text>
                    </View>
                    {item.avatar ? (
                        <Image
                            source={{uri: item.avatar}}
                            style={styles.imageCard}
                        />
                    ) : (
                        <View style={styles.iconAvatar}>
                            <Icons.Avatar/>
                        </View>
                    )}
                </View>
                <Text style={[styles.descriptionStyle, {color: textColor}]}>
                    {item.description}
                </Text>
                <View style={[styles.containerFooter, {paddingHorizontal: 16}]}>
                    <View style={styles.containerFooter}>
                        <View style={{flexDirection: 'row',}}>
                            {!item.isDummy && (
                                <TouchableOpacity
                                    onPress={() => navigation?.navigate( 'RecordScreen', item )}
                                    style={[styles.iconsFooter, {backgroundColor: textColor}]}>
                                    <Icons.Calendar color={colorIcons}/>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity
                                onPress={() => Linking.openURL( `tel:${item.phoneNumber}` )} // TODO change country code to dynamic value}
                                style={[styles.iconsFooter, {backgroundColor: textColor}]}>
                                <Icons.Phone color={colorIcons}/>
                            </TouchableOpacity>
                        </View>
                        {!item.isDummy ? (
                            <TouchableOpacity
                                style={[styles.iconsFooter, {backgroundColor: textColor, marginRight: 2}]}
                                onPress={() => navigation.navigate( 'Share', item)}>
                                <IconShare fill={colorIcons}/>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={[styles.iconsFooter, styles.iconPensil]}
                                onPress={() => navigation.navigate( 'EditBusinessCard', item )}>
                                <IconPensil/>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ImageBackground>
        </LinearGradient>
    );
};

const styles = StyleSheet.create( {
    containerCard: {
        width: '100%',
        height: 182,
        marginBottom: SIZES.padding * 0.2,
    },
    imageBackground: {
        width: '100%',
        height: '100%'
    },
    containerHeaderCard: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
        justifyContent: 'space-between',
    },
    textHeaderSpeciality: {
        ...FONTS.body6,
        textAlign: 'left',
        marginBottom: SIZES.padding * 0.4,
    },
    textHeaderNameSurname: {
        ...FONTS.h3,
        fontSize: SIZES.body2,
        lineHeight: 16,
        textAlign: 'left',
    },
    imageCard: {
        width: 42,
        height: 42,
        borderRadius: 50,
        paddingRight: 30,
    },
    iconAvatar: {
        width: 42,
        height: 42,
        borderRadius: 50,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
    },
    descriptionStyle: {
        ...FONTS.body7,
        textAlign: 'left',
        paddingHorizontal: 16,
        height: SIZES.padding * 4.8,
        marginTop: SIZES.padding * 0.8,
        marginBottom: SIZES.padding,
    },
    containerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    iconsFooter: {
        height: SIZES.padding * 3.8,
        width: SIZES.padding * 3.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZES.radius,
        marginRight: SIZES.radius
    },
    iconPensil: {
        borderRadius: SIZES.radius,
        borderWidth: 1,
        borderColor: '#fff',
        marginRight: 2
    }
} )

export default DefaultCard;
