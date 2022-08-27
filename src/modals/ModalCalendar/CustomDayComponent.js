import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

export const CustomDayComponent = ({
                                       day,
                                       dateString,
                                       timestamp,
                                       updateData,
                                       freeHours,
                                       colorSelected,
                                       selected,
                                       idSpecialist,
                                       fetchFreeHoursDateRecordScreen,
                                       setDataFindCalendar,
                                       dataFindCalendar
                                   }) => {
    const weekday = new Date( timestamp ).getDay();
    
    const dayDisabled = days => {
        let result;
        freeHours.map( item => {
            if (+Object.keys( item )[0].slice( 8 ) === +days) {
                result = Object.keys( item )[0].slice( 8 );
            }
        } );
        return result;
    };
    
    const isWeekDay = dayNum => {
        switch (dayNum) {
            case 0:
            case 6:
                return true;
            default:
                return false;
        }
    };
    
    const isToday = day => {
        let today = new Date();
        today = moment( today, true ).format( 'YYYY-MM-DD' );
        let calendarDay = moment( new Date( day ), true ).format( 'YYYY-MM-DD' );
        return today === calendarDay;
    };
    
    const todayUnix = () => {
        const todayUnix = new Date();
        const mom = moment( todayUnix, true ).unix() * 1000 - 86400000;
        return timestamp < mom;
    };
    
    todayUnix();
    return (
        <TouchableOpacity
            onPress={() => {
                const date = moment( dateString, true ).format( 'DD.MM.YYYY' );
                updateData( date );
                fetchFreeHoursDateRecordScreen( date, idSpecialist );
                setDataFindCalendar( 0 )
            }}
            disabled={day !== +dayDisabled( day ) || todayUnix()}>
            <View
                style={
                    selected || day === dataFindCalendar
                        ? {
                            backgroundColor: `${colorSelected}`,
                            alignItems: 'center',
                            paddingTop: 1,
                            paddingRight: 10,
                            paddingBottom: 1,
                            paddingLeft: 10,
                            width: 40,
                            borderRadius: 4,
                        }
                        : {
                            alignItems: 'center',
                            paddingTop: 1,
                            paddingRight: 10,
                            paddingBottom: 1,
                            paddingLeft: 10,
                            width: 40,
                        }
                }>
                <Text
                    style={[
                        {
                            color: todayUnix()
                                ? !isWeekDay( weekday )
                                    ? '#BFBFC0'
                                    : '#EEC4C2'
                                : isWeekDay( weekday )
                                    ? day !== +dayDisabled( day )
                                        ? '#EEC4C2' : selected
                                            ? '#FFFFFF' : '#D64641'
                                    : selected || day === dataFindCalendar
                                        ? '#FFFFFF'
                                        : day !== +dayDisabled( day )
                                            ? '#BFBFC0'
                                            : '#1C1C1E',
                            fontWeight: '600',
                            fontSize: 13,
                            lineHeight: 24,
                        },
                    ]}>
                    {day}
                </Text>
                {isToday( timestamp ) && !selected && day !== dataFindCalendar && (
                    <View
                        style={{
                            backgroundColor: '#D64641',
                            borderRadius: 50,
                            width: 4,
                            height: 4,
                            margin: 0,
                            padding: 0,
                        }}></View>
                )}
            </View>
        </TouchableOpacity>
    );
};
