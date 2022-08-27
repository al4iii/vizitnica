import React from "react";
import { APIStatus } from "../../../lib/axiosAPI";
import {settingsRecordScreenAPI} from "../../../api/settingsRecordScreen"
import { useSelector } from "react-redux";
import { defaultToken } from "../../../api/api";
import { recordScreenActionCreators } from "../../../slices/recordScreenSlice";


export const useFetchCheckForDuplicates = () => {
    
    const [status, setStatus] = React.useState(APIStatus.Initial)
    const { checkForDuplicates } = settingsRecordScreenAPI()
    const currentToken = useSelector(state => state.verification.token)
    const token = currentToken || defaultToken
    const {getDuplicateAppointment} = recordScreenActionCreators()
    
    const fetchCheckForDuplicates = React.useCallback((id, day, date, idService) => {
        setStatus(APIStatus.Loading)
        checkForDuplicates ({
            onSuccess: response => {
                getDuplicateAppointment(response?.data)
                console.log(response, 'uraaaaa post duplicate');
                setStatus(APIStatus.Success)
            },
            onError: err => {
                setStatus(APIStatus.Failure)
                console.log(err, 'error fetching duplicate appointment')
            },
            token,
            id,
            payload: {
                maintenances: idService,
                date: day,
                time_start: date
            }
            
        })
    }, [])
    
    return { fetchCheckForDuplicates, status }
}
