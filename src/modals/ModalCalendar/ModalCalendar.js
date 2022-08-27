import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import Modal from 'react-native-modal';
import { LocaleConfig } from 'react-native-calendars';
import { Calendar } from 'react-native-calendars';
import moment from "moment";
import 'moment/locale/ru'
import { CustomDayComponent } from "./CustomDayComponent";
import CustomWeekComponent from "./CustomWeekComponent";
import RightIconButton from "../../assets/icons/svgIcons/rightIconButton";
import { COLORS, SIZES } from '../../constants';

const ModalCalendar = ({
                           visible,
                           setModalVisible,
                           updateData,
                           locales,
                           localesCalendar,
                           colorLeftRightIcon,
                           durationSumHours,
                           durationSumMinutes,
                           calendarData,
                           setDateInFetch,
                           idSpecialist,
                           fetchFreeHoursDateRecordScreen,
                           setIndexClickedTime,
                           setIndexTwoArrTime,
                           setValueClickedTime,
                           checkDataInPage,
                           dataFindCalendar,
                           setDataFindCalendar,
                           valueClickedTime,
                           setTimeFindCalendar,
                           timeFindCalendar
                       }) => {
    LocaleConfig.locales[locales] = localesCalendar;
    LocaleConfig.defaultLocale = locales;
    
    const [valueItem, setValueItem] = useState( '' )
    const [dateFetchHeader, setDateFetchHeader] = useState()
    const [dayInCalendar, setDayInCalendar] = useState()
    
    const freeHours = useSelector( ({recordScreen}) => recordScreen.freeHours )
    
    let hours
    let minutes
    let addedMinute = 0
    let hoursSum
    let minutesSum
    let dateCalendar = calendarData
    dateCalendar = dateCalendar?.substring(0,10).split( '.' ).reverse().join( '-' )
    
    
    
    
    const handleFetch = async () => {
        await fetchFreeHoursDateRecordScreen( dateFetchHeader, idSpecialist )
    }
    
    const checkTime = (item) => {
        hours = +item.split( ':' )[0]
        minutes = +item.split( ':' )[1]
        addedMinute = Math.floor( (durationSumMinutes + minutes) / 60 )
        hoursSum = durationSumHours + hours + addedMinute
        minutesSum = durationSumMinutes + minutes
        
        return {hours, minutes, addedMinute, hoursSum, minutesSum}
    }
    
    const addCalendar = useCallback( (date, marking) => {
        setDateFetchHeader( moment( date.dateString, true ).add( 1, 'month' ).format( 'DD.MM.YYYY' ) )
        return < CustomDayComponent
            setModalVisible={setModalVisible}
            visible={visible}
            updateData={updateData}
            {...date}
            colorSelected={colorLeftRightIcon}
            freeHours={freeHours}
            calendarData={calendarData}
            selected={marking?.selected}
            fetchFreeHoursDateRecordScreen={fetchFreeHoursDateRecordScreen}
            idSpecialist={idSpecialist}
            setDateFetchHeader={setDateFetchHeader}
            setDataFindCalendar={setDataFindCalendar}
            dataFindCalendar={dataFindCalendar}
        />
    }, [visible, dataFindCalendar] )
    
    const renderDay = () => {
        return freeHours?.map( (obj, index) => {
                if (Object.keys( obj )[0] === dateCalendar) {
                    return (
                        <View key={obj.id} style={styleRenderDay.container}>{
                            obj[dateCalendar]?.map( (item, ind) => {
                                if (item) {
                                   const {hoursSum, minutesSum} = checkTime(item)
                                    return <TouchableOpacity
                                        key={item}
                                        onPress={() => {
                                            setModalVisible( false )
                                            updateData( `${calendarData}  ${item} - ${hoursSum.toString().length === 1 ? '0' + hoursSum : hoursSum}:${minutesSum < 60 ? minutesSum.toString().length === 1 ? minutesSum + '0' : minutesSum : (minutesSum % 60).toString().length === 1 ? (minutesSum % 60) + '0' : (minutesSum % 60)}` )
                                            setValueItem( item )
                                            setDateInFetch( item )
                                            setIndexClickedTime( index )
                                            setIndexTwoArrTime( ind )
                                            setValueClickedTime( item )
                                            setTimeFindCalendar(0)
                                        }}
                                        style={[styleRenderDay.containerDayItem, {backgroundColor: valueItem === item || timeFindCalendar === item ? colorLeftRightIcon : ''}]}>
                                        <Text
                                            style={{color: valueItem === item || timeFindCalendar === item ? '#FFF' : '#000'}}> {item}</Text>
                                    </TouchableOpacity>
                                }
                                else {
                                    return <TouchableOpacity
                                        key={item}
                                        onPress={() => setValueItem( item )}
                                        style={[styleRenderDay.containerDayItem, {backgroundColor: '#FFF'}]}>
                                        <Text style={{color: '#000'}}> {item}</Text>
                                    </TouchableOpacity>
                                }
                            } )
                        }</View>
                    )
                }
                 if (Object.keys( obj )[0] === checkDataInPage) {
                    return (
                        <View key={obj.id} style={styleRenderDay.container}>{
                            obj[checkDataInPage]?.map( (item, ind) => {
                                if (item) {
                                    const {hoursSum, minutesSum} = checkTime(item)
                                    return <TouchableOpacity
                                        key={item}
                                        onPress={() => {
                                            setModalVisible( false )
                                            updateData( `${checkDataInPage.split('-').reverse().join('.')}` )
                                            setValueItem( item )
                                            setDateInFetch( item )
                                            setIndexClickedTime( index )
                                            setIndexTwoArrTime( ind )
                                            setValueClickedTime( item )
                                            setTimeFindCalendar(0)
                                        }}
                                        style={[styleRenderDay.containerDayItem, {backgroundColor: valueItem === item || timeFindCalendar === item ? colorLeftRightIcon : ''}]}>
                                        <Text
                                            style={{color: valueItem === item || timeFindCalendar === item ? '#FFF' : '#000'}}> {item}</Text>
                                    </TouchableOpacity>
                                }
                                else {
                                    return <TouchableOpacity
                                        key={item}
                                        onPress={() => setValueItem( item )}
                                        style={[styleRenderDay.containerDayItem, {backgroundColor: '#FFF'}]}>
                                        <Text style={{color: '#000'}}> {item}</Text>
                                    </TouchableOpacity>
                                }
                            } )
                        }</View>
                    )
                }
            }
        )
    }
    
     useEffect(() => {
      setDayInCalendar(   dataFindCalendar ? moment( checkDataInPage ).locale( 'ru' ).format( 'DD MMMM, dddd' ) :
          moment( dateCalendar, true ).locale( 'ru' ).format( 'DD MMMM, dddd' ))
     },  [dateCalendar, checkDataInPage])
    
    return (
        <Modal
            animationType="slide"
            isVisible={visible}
            onBackdropPress={() => {
                setModalVisible( !visible );
            }}
            style={[styleModal.containerModal, {marginTop: calendarData === 'Дата и время' || calendarData.length > 12 && !checkDataInPage ? '90%' : '40%'}]}>
            <View style={styleModal.container}>
                <View style={styleModal.grayInSwipe}></View>
                <Calendar
                    hideExtraDays={true}
                    hideDayNames={true}
                    firstDay={1}
                    markedDates={{[dateCalendar]: {selected: true}}}
                    dayComponent={({date, marking}) => addCalendar( date, marking )}
                    renderArrow={(e) => {
                        return e === 'right' ?
                            <View onTouchStart={() => setTimeout( () => handleFetch, 100 )}
                                  style={[styleModal.headerArrow, {left: -44,}]}>
                                <RightIconButton color={colorLeftRightIcon}/>
                            </View> :
                            <View onTouchStart={() => setTimeout( () => handleFetch, 100 )}
                                  style={[styleModal.headerArrow, {rotation: 180, left: 8}]}>
                                <RightIconButton color={colorLeftRightIcon}/>
                            </View>
                    }}
                    renderHeader={(date) => {
                        return (
                            <CustomWeekComponent localesCalendar={localesCalendar}
                                                 date={date}
                            />
                        )
                    }
                    }
                />
            </View>
            <View style={styleModal.selectedDayName}>
                <Text style={styleModal.selectedDayNameText}>
                    {dayInCalendar !== 'Invalid date' ? dayInCalendar : ''}
                </Text>
            </View>
            <ScrollView style={{backgroundColor: 'white'}}>
                {renderDay()}
            </ScrollView>
        </Modal>
    );
};

const styleRenderDay = StyleSheet.create( {
    container: {
        flexDirection: "row",
        flexWrap: 'wrap',
        marginBottom: 10
    },
    containerDayItem: {
        margin: 10,
        paddingTop: 6,
        paddingRight: 8,
        paddingBottom: 6,
        paddingLeft: 8,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#EAECEE'
    }
} )

const styleModal = StyleSheet.create( {
    containerModal: {
        justifyContent: 'flex-end',
        margin: 0,
        flex: 1,
    },
    container: {
        backgroundColor: COLORS.white,
        paddingVertical: SIZES.padding * 0.5,
        paddingHorizontal: SIZES.padding * 0.5,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        height: 340,
    },
    grayInSwipe: {
        width: 40,
        height: 3,
        borderRadius: 4,
        backgroundColor: '#E4E4E4',
        marginLeft: '45.5%'
    },
    headerArrow: {
        position: 'absolute',
        bottom: 20,
    },
    selectedDayName: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingBottom: 20
    },
    selectedDayNameText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 17,
        color: '#000'
    }
} )

export default ModalCalendar;
