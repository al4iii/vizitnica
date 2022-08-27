import React from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { updateDataApi } from '../../../api/updateDataAPI'
import { APIStatus } from '../../../lib/axiosAPI'
import { verificationActionCreators } from '../../../slices/verificationSlice'


export const useUpdateData = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial)
  const { updatePersonalData} = updateDataApi()
  const { updateUserData } = verificationActionCreators()
  const currentToken = useSelector(state => state.verification.token)
  const token = currentToken || defaultToken

  const fetch = React.useCallback((args) => {
    setStatus(APIStatus.Loading)
    updatePersonalData({
      onSuccess: response => {
        updateUserData({name: args.name, surname: args.surname,  })
        setStatus(APIStatus.Success)
      },
      onError: () => {
        setStatus(APIStatus.Failure)
      },
      payload: {
        name: args.name,
        surname: args.surname,
        avatar_id: args.avatar_id,
      },
      token,
      id: args.id,
    })
  }, [])

  return { fetch, status }
}
