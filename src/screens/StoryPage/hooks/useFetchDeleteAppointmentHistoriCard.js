import React from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { appointmentApi } from '../../../api/appointmentApi'
import { APIStatus } from '../../../lib/axiosAPI'

export const useFetchDeleteAppointmentCardHistory = () => {

    const [status, setStatus] = React.useState( APIStatus.Initial )
    const {deleteAppointmentCardHistory} = appointmentApi()
    const currentToken = useSelector( state => state.verification.token )
    const token = currentToken || defaultToken

    const fetchDeleteAppointmentHistoryCard = React.useCallback( (orderNumbers) => {
        setStatus( APIStatus.Loading )
        deleteAppointmentCardHistory( {
            onSuccess: response => {
                console.log('uraaa deleted')
                setStatus( APIStatus.Success )
            },
            onError: err => {
                setStatus( APIStatus.Failure )
                console.log( err, 'error fetching delete appointment' )
            },
            token,
            orderNumbers,
        } )
    }, [] )

    return {fetchDeleteAppointmentHistoryCard, status}
}
