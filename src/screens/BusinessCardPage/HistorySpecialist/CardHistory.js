import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Hr } from "../../../components";
import { COLORS } from "../../../constants";
import Icons from "../../../assets/icons/svgIcons/Icons";
import moment from "moment";

const CardHistory = ({
                         data,
                         colorButton,
                         setId,
                         setMessage,
                         setModalVisible,
                         setOrderNumber,
                     }) => {
    
    const checkConfirm = () => {
        switch (data.status) {
            case 'unconfirmed':
                return <View style={styles.flexJustify}>
                    <Text style={styles.textTitle}>На подтверждении</Text>
                    <View style={{marginLeft: 8}}>
                        <Icons.ClockWaiting width='15' height={'15'} color={COLORS.gray}/>
                    </View>
                </View>
            case 'cancelled':
                return <View style={styles.flexJustify}>
                    <Text style={[styles.textTitle, {color: COLORS.red}]}>Отменено</Text>
                </View>
            default:
                return <View style={styles.flexJustify}>
                    <Text style={[styles.textTitle, {color: COLORS.confirm}]}>Подтверждено</Text>
                    <View style={{marginLeft: 8}}>
                        <Icons.SelectIcon width="15" height="15" color={COLORS.confirm}/>
                    </View>
                </View>
        }
    }
    
    const checkId = (arr) => {
       return arr.map(item=> item.id)
    }
    
    return <View style={styles.container}>
        <View style={[styles.styleFlex, {padding: 16, alignItems: 'center'}]}>
            <View>
                <View>
                    <Text
                        style={styles.textTitle}>{`${moment( data?.services[0]?.date, true ).format( 'DD.MM.YYYY' )}, ${data?.services[0]?.start}-${data?.services?.length > 1 ? data?.services[data?.services?.length - 1]?.end : data?.services[0]?.end } `}</Text>
                </View>
                {checkConfirm()}
            </View>
            {data?.services[0]?.isOver ? (<TouchableOpacity onPress={() => {
                setId( checkId(data?.services) )
                setOrderNumber( data?.order_number )
            }}>
                <Icons.Restore color={colorButton}/>
            </TouchableOpacity>) : (<TouchableOpacity onPress={() => {
                    setOrderNumber( data?.order_number )
                    setMessage( `${data?.services[0]?.date}, ${data?.services[0]?.start}-${data?.services[0]?.end} ` )
                    setId( data?.specialist?.id )
                    setModalVisible( true )
                }}>
                    <Icons.CloseButton color={COLORS.red}/>
                </TouchableOpacity>
            )}
        </View>
        <Hr/>
        <View style={{paddingTop: 16}}>{data.services.map( item => <View key={item.id}
                                                                         style={styles.styleFlex}><Text
            style={[styles.textTitle, {width: '80%'}]}>{item?.title}</Text><Text
            style={styles.textTitle}>{item?.price?.value + ' ₽'}</Text></View> )}
        </View>
        <View style={styles.styleFlex}><Text style={styles.text}>Суммарная стоимость:</Text><Text
            style={styles.text}>{data.services.reduce( (ac, item) => {
            return ac + item?.price?.value
        }, 0 ) + ' ₽'}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create( {
    container: {
        marginTop: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.lightGray
    },
    textTitle: {
        fontSize: 12,
        lineHeight: 14,
        color: COLORS.textGray
    },
    text: {
        fontSize: 12,
        lineHeight: 14,
        color: COLORS.textBlack
    },
    styleFlex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
        paddingHorizontal: 16
    },
    flexJustify: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 13,
        marginBottom: 8
    }
} )

export default CardHistory
