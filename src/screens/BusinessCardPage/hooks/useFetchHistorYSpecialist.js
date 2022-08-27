import React from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { appointmentApi } from '../../../api/appointmentApi'
import { APIStatus } from '../../../lib/axiosAPI'
import { specialistActionCreators } from "../../../slices/specialistSlice";

export const useFetchGetHistorySpecialist = () => {

    const [status, setStatus] = React.useState( APIStatus.Initial )
    const {getHistoryForSpecialist} = appointmentApi()
    const currentToken = useSelector( state => state.verification.token )
    const token = currentToken || defaultToken
    const {getHistorySpecialist} = specialistActionCreators()
    const fetchGetHistorySpecialist = React.useCallback( (idSpecialist) => {
        setStatus( APIStatus.Loading )
        getHistoryForSpecialist( {
            onSuccess: response => {
                getHistorySpecialist(response.data)
                setStatus( APIStatus.Success )
            },
            onError: err => {
                setStatus( APIStatus.Failure )
                console.log( err, 'error fetching delete appointment' )
            },
            token,
            id:idSpecialist,
        } )
    }, [] )

    return {fetchGetHistorySpecialist, status}
}
