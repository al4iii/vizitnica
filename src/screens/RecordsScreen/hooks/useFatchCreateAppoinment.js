import React from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { appointmentApi } from '../../../api/appointmentApi'
import { APIStatus } from '../../../lib/axiosAPI'

export const useFetchCreateAppointment = () => {
    
    const [status, setStatus] = React.useState(APIStatus.Initial)
    const { createAppointment } = appointmentApi()
    const currentToken = useSelector(state => state.verification.token)
    const token = currentToken || defaultToken
    
    const fetch = React.useCallback((objArgs) => {
        setStatus(APIStatus.Loading)
        createAppointment({
            onSuccess: response => {
                console.log(response, 'uraaaaa post');
                setStatus(APIStatus.Success)
            },
            onError: err => {
                setStatus(APIStatus.Failure)
                console.log(err, 'error fetching create appointment')
            },
            token,
            id: objArgs?.idSpecialist,
            payload: {
                maintenances: objArgs?.idService,
                date: objArgs?.day,
                time_start: objArgs?.dateInFetch
            }
            
        })
    }, [])
    
    return { fetch, status }
}
