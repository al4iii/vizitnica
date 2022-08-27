import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

const ItemRecordScreenFreeTime = ({
                                      data,
                                      time,
                                      backgroundColorButton = 'white',
                                      colorText = '#1C1C1E',
                                      disabled,
                                      valueDate,
                                      setCalendarValue,
                                      setDateInFetch,
                                      durationSumMinutes,
                                      durationSumHours,
                                      setValueClickedTime,
                                      index,
                                      setIndexClickedTime,
                                      indexTime,
                                      setIndexTwoArrTime,
                                      setDataFindCalendar,
                                      setTimeFindCalendar
                                  }) => {
    const [isClicked, setIsClicked] = useState( false )
    const [clickedValue, setClickedValue] = useState( '' )
    const [hours, setHours] = useState( 0 )
    const [minutes, setMinutes] = useState( 0 )
    
    let toCheckDate = valueDate
    toCheckDate = toCheckDate.split( '-' ).reverse().join( '.' )
    let countTime0
    let countTime1
    
    let addedMinute
    
    useEffect( () => {
        countTime0 = +time.split( ':' )[0]
        countTime1 = +time.split( ':' )[1]
        setHours( durationSumHours + countTime0 )
        
        if (durationSumMinutes + countTime1 < 60) {
            setMinutes( durationSumMinutes + countTime1 )
        }
        else {
            setMinutes( (durationSumMinutes + countTime1) % 60 )
            addedMinute = Math.floor( (durationSumMinutes + countTime1) / 60 )
            setHours( prevState => prevState + addedMinute )
        }
        isClicked ? setCalendarValue( `${toCheckDate}  ${time} - ${hours.toString().length === 1 ? '0' + hours : hours}:${minutes.toString().length === 1 ? minutes + '0' : minutes}` ) : setCalendarValue( 'Дата и время' )
        
    }, [durationSumHours, durationSumMinutes, isClicked] )
    
    const handleSelect = () => {
        if (time.includes( clickedValue )) {
            setIsClicked( !isClicked )
            setCalendarValue( `${toCheckDate}  ${time} - ${hours}:${minutes}` )
            setDateInFetch( time )
        }
        else {
            setIsClicked( false )
        }
    }
    
    return <TouchableOpacity disabled={disabled} onPress={() => {
        handleSelect()
        setClickedValue( time )
        setValueClickedTime( time )
        setIndexClickedTime( index )
        setIndexTwoArrTime( indexTime )
        setTimeFindCalendar(time)
        setDataFindCalendar( +data.substring( 0, 2 ) )
    }} style={{
        margin: 10,
        borderWidth: 1,
        borderColor: '#EAECEE',
        borderRadius: 4
    }}>
        <Text style={{
            borderRadius: 4,
            fontSize: 11,
            lineHeight: 14,
            fontWeight: '600',
            color: colorText,
            paddingTop: 5,
            paddingLeft: 8,
            paddingBottom: 5,
            paddingRight: 8,
            backgroundColor: backgroundColorButton
        }
        }>{`${data} ${time}`}</Text>
    </TouchableOpacity>
}
export default ItemRecordScreenFreeTime
