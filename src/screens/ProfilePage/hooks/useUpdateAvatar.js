import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { updateDataApi } from '../../../api/updateDataAPI'
import { APIStatus } from '../../../lib/axiosAPI'
import { verificationActionCreators } from '../../../slices/verificationSlice'


export const useUpdateAvatar = () => {
  const [status, setStatus] = useState(APIStatus.Initial)
  const { updateAvatar } = updateDataApi()
  const {setAvatarPicId, setAvatarPic } = verificationActionCreators()

  const currentToken = useSelector(state => state.verification.token)
  const token = currentToken || defaultToken


  const fetch = useCallback((args) => {
    setStatus(APIStatus.Loading)
    updateAvatar({
      onSuccess: (response) => {
        setStatus(APIStatus.Success)
        setAvatarPicId(response.data.id)
        setAvatarPic(response.url)

      },
      onError: () => {
        setStatus(APIStatus.Failure)
      },
      payload: args.formData,
      token,

    })

  }, [])

  return { fetch, status }
}
