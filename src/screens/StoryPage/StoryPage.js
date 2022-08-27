import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Hr, Navbar } from '../../components';
import MainLayouts from '../../layouts/MainLayouts';
import { COLORS } from '../../constants';
import Container from '../../layouts/Container';
import { FlatList, StatusBar } from 'react-native';
import StoryCard from '../../components/StoryCard';
import { useFetchAppointmentHistory } from '../RecordsScreen/hooks/useFetchAppointmentHistory';
import { useFetchDeleteAppointmentCardHistory } from './hooks/useFetchDeleteAppointmentHistoriCard';
import { useFetchUpdateHistory } from "../BusinessCardPage/hooks/useFetchUpdateHistory";
import moment from "moment/moment";

const StoryPage = ({navigation}) => {
    
    const [payloadDataUpdate, setPayloadDataUpdate] = useState( {} )
    const [orderNumber, setOrderNumber] = useState()
    const [id, setId] = useState()
    
    
    const history = useSelector( state => state.recordScreen.appointmentHistory );
    const {fetchHistory} = useFetchAppointmentHistory();
    const {fetchDeleteAppointmentHistoryCard, status} = useFetchDeleteAppointmentCardHistory();
    const {fetchUpdateHistorySpecialist, status: statusUpdate} = useFetchUpdateHistory()
    
    const handleUpdate = (orderNumber, payload) => {
        fetchUpdateHistorySpecialist( orderNumber, payload )
    }
    
    const handleDelete = (orderNumber) => {
        fetchDeleteAppointmentHistoryCard( orderNumber )
    }
    
    useEffect( () => {
        fetchHistory();
    }, [status, statusUpdate] );
    
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
    
    const checkId = (arr) => {
        return arr.map(item=> item.id)
    }
    
    return (
        <MainLayouts
            customContainerStyle={{backgroundColor: COLORS.white, paddingTop: StatusBar.currentHeight -10}}>
            <Container customContainerStyle={{flex: 1}}>
                <Navbar header="История записей" navigation={navigation} height={40}/>
                <Hr style={{marginLeft: -16, marginTop: 5}}/>
                <FlatList
                    data={history}
                    renderItem={({item}) => {
                        return (
                            <StoryCard
                                avatar={item?.specialist.avatar}
                                date={item?.services[0]?.date}
                                name={item?.specialist.name}
                                surname={item?.specialist.surname}
                                status={item?.status}
                                services={item?.services}
                                worker={item?.worker}
                                price={item?.price}
                                work={item?.work}
                                orderNumberItem={item?.order_number}
                                idService = {checkId(item?.services)}
                                handleDelete={handleDelete}
                                setOrderNumber={setOrderNumber}
                                navigation={navigation}
                                statusFetch={status}
                                isOver={item?.services[0]?.isOver}
                                setId = {setId}
                            />
                        );
                    }}
                    keyExtractor={item => item.order_number}
                />
            </Container>
        </MainLayouts>
    );
};
export default StoryPage;
