import { useCallback, useState } from 'react'
import { verificationAPI } from '../../../api/verificationAPI'
import { APIStatus } from '../../../lib/axiosAPI'


export const useVerifyNewDevice = () => {
  const [status, setStatus] = useState(APIStatus.Initial)
  const { verifyNewDevice } = verificationAPI()

  const fetch = useCallback((payload, successCb) => {
    setStatus(APIStatus.Loading)
    verifyNewDevice({
      payload,
      onSuccess: (res) => {
        setStatus(APIStatus.Success)
        if (typeof successCb === 'function') {
          successCb()
        }
      },
      onError: (err) => {
        setStatus(APIStatus.Failure)
      }
    })

  }, [])


  return {fetch, status}
}
