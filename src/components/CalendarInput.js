import React, { useEffect, useState } from 'react'
import {View, TextInput, Image, Dimensions, TouchableOpacity} from 'react-native'
import { COLORS, SIZES, icons } from '../constants';
import CalendarIcon from "../assets/icons/svgIcons/calendarIcon";

const SearchInput = ({customContainerStyle, placeholder="Поиск", getInputData, colorIcon}) => {

    const [inputVal, setInputVal ] = useState("")

    useEffect(() => {
        let id = setTimeout(() => {
            typeof getInputData === 'function' && getInputData(inputVal)
        }, 300)


        return () => {
            clearTimeout(id)
        }
    })


    return (
        <View
            style={{
                ...customContainerStyle,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: SIZES.padding * 0.8,
                height: 48,
                borderWidth: 1,
                borderColor: COLORS.lightGray,
                borderRadius: SIZES.radius,
            }}>
            <TextInput
                value={inputVal}
                onChangeText={(val) => setInputVal(val)}
                placeholder={placeholder}
                multiline={false}
                width={Dimensions.get("window").width  - SIZES.padding * 3}
                autoCorrect={false}
                onFocus={() => {}}
                style={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding1,
                    color: COLORS.black,
                }}
            />
              <View style={{
                  paddingRight: 16
              }}>
                 <TouchableOpacity>
                     <CalendarIcon color={colorIcon}/>
                 </TouchableOpacity>
              </View>
        </View>
    );
};

export default SearchInput;
