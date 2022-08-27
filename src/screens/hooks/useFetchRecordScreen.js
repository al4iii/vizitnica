import React from 'react';

import { settingsRecordScreenAPI } from "../../api/settingsRecordScreen";
import { APIStatus } from "../../lib/axiosAPI";
import { defaultToken } from "../../api/api";
import { recordScreenActionCreators } from "../../slices/recordScreenSlice";
import { useSelector } from "react-redux";

export const useFetchRecordScreen = () => {
    const [status, setStatus] = React.useState( APIStatus.Initial );
    const {settingsRecordScreen} = settingsRecordScreenAPI()
    const {getRecordScreenService} = recordScreenActionCreators()

    
    const currentToken = useSelector(state => state.verification.token)
    const token = currentToken || defaultToken
 
    const fetchRecordScreenService = React.useCallback( (id) => {
        setStatus( APIStatus.Loading );
        settingsRecordScreen( {
            token,
            idSpecialist: id,
            onSuccess: (response) => {
                const listRecordScreenService = response?.data?.map( (item) => {
                    return {
                        id: item?.id,
                        title: item?.title,
                        price: item?.price?.value,
                        thisCountPrice: item?.discount,
                        time: {
                            hours: Math.floor( item?.duration?.value / 60 ),
                            minutes: item?.duration?.value % 60
                        },
                        selected: false,
                        countServices: null
                    }
                } )
                getRecordScreenService( listRecordScreenService )
                setStatus( APIStatus.Success );
            },
            onError: err => {
                console.log( err, 'errrrrr' )
                setStatus( APIStatus.Failure );
            },
        } )
    }, [] );
    
    return {fetchRecordScreenService, status};
};

export const useFetchDateFreeHoursRecordScreen = () => {
    const [status, setStatus] = React.useState( APIStatus.Initial );
    const {dateFreeHoursForDay} = settingsRecordScreenAPI()
    const { getFreeHoursInDays } = recordScreenActionCreators()
    
    const currentToken = useSelector(state => state.verification.token)
    const token = currentToken || defaultToken
   
    const fetchFreeHoursDateRecordScreen = React.useCallback( (dateSelect, id) => {
        dateSelect = dateSelect?.split('.')?.reverse()?.join('-')
        setStatus( APIStatus.Loading );
        dateFreeHoursForDay({
            date: dateSelect,
            token,
            idSpecialist: id,
            onSuccess: response => {
                const dateFreeHours = response?.data?.map((item, index) => {
                    return {...item, id: index}
                    }
                    )
                setStatus(APIStatus.Success)
                getFreeHoursInDays(dateFreeHours)
                return dateFreeHours
            },
            onError: err => {
                console.log( err, 'error  dateFreeHours' )
                setStatus( APIStatus.Failure );
            },
            
        })
    }, []);
    return {fetchFreeHoursDateRecordScreen, status}
}


