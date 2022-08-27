import React from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Animated, Platform,
} from 'react-native'
import Icons from '../assets/icons/svgIcons/Icons'

import { COLORS, SIZES, icons } from '../constants'


const Field = ({
                   label,
                   updateData,
                   maxLength = 30,
                   field,
                   error,
                   multiline,
                   showIconReset,
                   placeholder,
                   customPlaceholderStyle,
                   customContainerStyle,
                   moneyMask,
                   incomingValue,
                   onFocus = () => {
                   },
                   styleLabel,
                   ...props
               }) => {
    
    const [value, setValue] = React.useState( incomingValue || '' )
    const [isFocused, setIsFocused] = React.useState( false )
    const [animateState] = React.useState( new Animated.Value( 0 ) )
    
    const translateY = animateState.interpolate( {
        inputRange: [0, 1],
        outputRange: [value || placeholder ? -25 : 0, -25],
    } )
    const fontSize = animateState.interpolate( {
        inputRange: [0, 1],
        outputRange: [value || placeholder ? 12 : 15, 12],
    } )
    
    const mask = value => {
        value = value.replace( '.', '' ).replace( ',', '' ).replace( /\D/g, '' )
        return value + moneyMask
    }
    
    const resetField = () => {
        setValue( '' )
        updateData(field, '' )
    }
    
    const onChange = value => {
        setValue( moneyMask ? mask( value ) : value )
        updateData( field, moneyMask ? mask( value ) : value )
    }
    
    React.useEffect( () => {
        if (isFocused) {
            Animated.timing( animateState, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            } ).start()
        }
        else {
            Animated.timing( animateState, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            } ).start()
        }
    }, [isFocused] )
    
    
    return (
        <View
            style={{
                marginBottom: SIZES.padding * 0.8,
                position: 'relative',
                width: '100%',
                height: 56,
                borderWidth: 1,
                borderColor: isFocused ? COLORS.primary : COLORS.lightGray,
                borderRadius: SIZES.radius,
                ...customContainerStyle,
            }}>
            <Animated.View
                style={{
                    justifyContent: placeholder ? 'flex-start' : 'center',
                    position: 'absolute',
                    top: placeholder ? 10 : translateY,
                    left: 16,
                    right: 0,
                    bottom: 0,
                    ...styleLabel
                }}>
                <Animated.Text
                    style={{
                        fontSize: fontSize,
                        color: isFocused ? COLORS.primary : COLORS.gray,
                    }}>
                    {label}
                </Animated.Text>
            </Animated.View>
            
            
            <TextInput
                clearButtonMode={'while-editing'}
                maxLength={maxLength}
                placeholder={isFocused ? '' : placeholder}
                multiline={true}
                width={300}
                value={value}
                autoCorrect={false}
                onFocus={() => {
                    onFocus()
                    setIsFocused( true )
                }}
                onChangeText={onChange}
                onBlur={(e) => {
                    setIsFocused( false )
                }}
                style={{
                    paddingHorizontal: SIZES.padding * 1.6,
                    marginTop:
                        Platform.OS === 'android'
                            ? SIZES.padding * 1.5
                            : SIZES.padding * 2.7,
                    color: COLORS.black,
                    ...customPlaceholderStyle,
                }}
                {...props}
            />
            
            
            {isFocused && showIconReset && (
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: 56 / 2 - 8,
                        right: 16,
                        zIndex: 100,
                    }}
                    onPress={resetField}>
                    <Icons.ClearButton/>
                </TouchableOpacity>
            )}
        
        </View>
    )
}

export default Field
