import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { verificationAPI } from '../../../api/verificationAPI'
import { APIStatus } from '../../../lib/axiosAPI'


export const useUpdatePersonalData = () => {
  const { updatePersonalData } = verificationAPI()

  const [status, setStatus] = useState(APIStatus.Initial)

  const currentToken = useSelector(state => state.verification.token)
  const token = currentToken || defaultToken


  const fetch = useCallback((args) => {
    setStatus(APIStatus.Loading)
    updatePersonalData({
      onSuccess: (res) => {

        setStatus(APIStatus.Success)
      },
      onError: (err) => {
        console.log(err, 'err in update')
        setStatus(APIStatus.Failure)
      },
      payload: args.data,
      token,
    })

  })

  return { updateUserData: fetch, status }
}
