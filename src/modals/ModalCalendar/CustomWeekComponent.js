import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS } from "../../constants";
import { Hr } from "../../components";

const CustomWeekComponent = ({localesCalendar, date, colorLeftRightIcon}) => {
    
    return <View style={styles.container}>
        <View style={styles.containerHeader}>
            
            <Text style={{
                ...FONTS.body1, color: COLORS.black, fontWeight: 'bold', marginBottom:20
            }}>
                {localesCalendar?.monthNames[date.getMonth()]}, {date.getFullYear()}
            </Text>
        
        </View>
        <Hr/>
        <View style={styles.containerWeekName}>
            <Text style={{marginLeft: 26, fontSize: 11, color: '#1C1C1E'}}>Пн</Text>
            <Text style={styles.weekday}>Вт</Text>
            <Text style={styles.weekday}>Ср</Text>
            <Text style={styles.weekday}>Чт</Text>
            <Text style={styles.weekday}>Пт</Text>
            <Text style={styles.weekend}>Сб</Text>
            <Text style={styles.weekend}>Вс</Text>
        </View>
        <Hr/>
    </View>
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        marginTop: 20,
        marginLeft: -40, marginRight: -10, padding: 0
    }, containerHeader: {
        flexDirection: 'row', alignItems: 'center', justifyContent: "center",
        
    }, containerWeekName: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        paddingTop: 8,
        paddingBottom: 8,
    }, weekday: {
        color: '#1C1C1E',
        fontSize: 11
    }, weekend: {
        color: '#D64641',
        fontSize: 11
    },
} )

export default CustomWeekComponent
