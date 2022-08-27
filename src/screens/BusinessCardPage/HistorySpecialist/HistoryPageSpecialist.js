import { FlatList, StatusBar, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import NavbarRecordScreen from "../../../components/NavbarRecordScreen";
import { COLORS } from "../../../constants";
import { useFetchGetHistorySpecialist } from "../hooks/useFetchHistorYSpecialist";
import { useSelector } from "react-redux";
import CardHistory from "./CardHistory";
import ModalStory from "../../../modals/ModalStory";
import { useFetchDeleteAppointmentCardHistory } from "../../StoryPage/hooks/useFetchDeleteAppointmentHistoriCard";
import { useFetchUpdateHistory } from "../hooks/useFetchUpdateHistory";
import moment from "moment";

const HistoryPageSpecialist = ({navigation, route}) => {
    const params = route?.params?.params?.item
    const textColor = params?.card?.textColor
    const backgroundColors = params?.card?.gradientColor
    const colorButton = params?.card?.buttonsColor
    const idSpecialist = params?.id
    const avatar = params?.avatar
    
    const [isModalVisible, setModalVisible] = useState( false )
    const [message, setMessage] = useState( '' )
    const [orderNumber, setOrderNumber] = useState()
    const [id, setId] = useState()
    const [payloadDataUpdate, setPayloadDataUpdate] = useState( {} )
    
    const {fetchGetHistorySpecialist} = useFetchGetHistorySpecialist()
    const {fetchUpdateHistorySpecialist, status: statusUpdate} = useFetchUpdateHistory()
    const {fetchDeleteAppointmentHistoryCard, status} = useFetchDeleteAppointmentCardHistory()
    const {historySpecialist} = useSelector( state => state.specialistData )
    
    
    useEffect( () => {
        fetchGetHistorySpecialist( idSpecialist )
    }, [statusUpdate, status] )
    
    useEffect(() => {
        handleUpdate( orderNumber, payloadDataUpdate )
    }, [payloadDataUpdate])
    
    let date = new Date()
    let day = moment(date, true).format('YYYY-MM-DD')
    let startTime = moment(date.getTime(), true).format('HH:mm')
    
    useEffect( () => {
        setPayloadDataUpdate( {
            maintenances: id,
            date: day,
            time_start: startTime
        } )
    }, [id, startTime, day] )
    
    const handleUpdate = (orderNumber, payload) => {
        fetchUpdateHistorySpecialist( orderNumber, payload )
    }
    
    const renderItem = ({item}) => <CardHistory
        data={item}
        colorButton={colorButton}
        setModalVisible={setModalVisible}
        setMessage={setMessage}
        setOrderNumber={setOrderNumber}
        orderNumber={orderNumber}
        setId={setId}
        handleUpdate={handleUpdate}
        payloadDataUpdate={payloadDataUpdate}
    />
    
    const handleDelete = (orderNumber) => {
        fetchDeleteAppointmentHistoryCard( orderNumber )
    }
    
    return <View style={styles.container}>
        <StatusBar
            animated={true}
            backgroundColor={backgroundColors}
            barStyle={'light-content'}
        />
        <View
            style={{
                backgroundColor: backgroundColors,
                height: 100,
                paddingTop: StatusBar.currentHeight
            }}>
            <NavbarRecordScreen
                navigation={navigation}
                header={'История записей'}
                url={avatar}
                icon={!!avatar}
                stylesHeadersText={{color: textColor}}
                colorButton={textColor}
                stylesHeader={{paddingTop:14}}
            />
        </View>
        <View style={styles.containerFlatList}>
            <FlatList data={historySpecialist} renderItem={renderItem} keyExtractor={item => item?.order_number}/>
        </View>
        <ModalStory
            visible={isModalVisible}
            setModalVisible={setModalVisible}
            header={'Вы действительно хотите отменить запись:'}
            message={`${message} ?`}
            leftButtonText={'Отмена'}
            rightButtonText={'Отменить'}
            goTo={'HistoryPageSpecialist'}
            navigation={navigation}
            id={orderNumber}
            handleDelete={handleDelete}
            status={status}
            fetchGetHistorySpecialist={fetchGetHistorySpecialist}
        />
    </View>
}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    containerFlatList: {
        flex: 1,
        paddingHorizontal: 16,
        marginBottom:20
    }
} )

export default HistoryPageSpecialist
