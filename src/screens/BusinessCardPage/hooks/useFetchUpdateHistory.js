import React from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { appointmentApi } from '../../../api/appointmentApi'
import { APIStatus } from '../../../lib/axiosAPI'

export const useFetchUpdateHistory = () => {
    
    const [status, setStatus] = React.useState( APIStatus.Initial )
    const {updateHistorySpecialist} = appointmentApi()
    const currentToken = useSelector( state => state.verification.token )
    const token = currentToken || defaultToken
  
    const fetchUpdateHistorySpecialist = React.useCallback( (orderNumber, payload) => {
        setStatus( APIStatus.Loading )
        updateHistorySpecialist( {
            onSuccess: response => {
                console.log(response, 'urrraaa update specialist')
                setStatus( APIStatus.Success )
            },
            onError: err => {
                setStatus( APIStatus.Failure )
                console.log( err, 'error fetching update appointment' )
            },
            token,
            orderNumber,
            payload,
        } )
    }, [] )
    
    return {fetchUpdateHistorySpecialist, status}
}
