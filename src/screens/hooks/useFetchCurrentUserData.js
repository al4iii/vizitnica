import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../api/api'
import { userAPI } from '../../api/userApi'
import { APIStatus } from '../../lib/axiosAPI'
import { verificationActionCreators } from '../../slices/verificationSlice'


export const useFetchCurrentUserData = () => {
  const [status, setStatus] = useState(APIStatus.Initial)
  const { getCurrentUserData } = userAPI()
  const { updateUserData } = verificationActionCreators()

  const currentToken = useSelector(state => state.verification.token)
  const token = currentToken || defaultToken

  const getCurrentUser = useCallback((args) => {
    setStatus(APIStatus.Loading)
    getCurrentUserData({
      token,
      onSuccess: response => {
        updateUserData({
          photo: response.data.avatar,
          ...response.data
        })
      }
    })

  })

  return { getCurrentUser, status }
}
