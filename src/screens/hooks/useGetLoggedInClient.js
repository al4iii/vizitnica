import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { settingsProfileAPI } from '../../api/settingsProfileAPI'
import { APIStatus } from '../../lib/axiosAPI'
import { verificationActionCreators } from '../../slices/verificationSlice'


export const useGetLoggedInClient = () => {
  const [status, setStatus] = useState(APIStatus.Initial)
  const {getLoggedInClient} = settingsProfileAPI()
  const {updateUserData} = verificationActionCreators()
const token = useSelector(state => state.verification.token)
  const userData = useSelector(state => state.verification.userData)


  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading)
    getLoggedInClient({
      token,
      onSuccess: (res) => {
        setStatus(APIStatus.Success)
        const normalizedData = {
          ...userData,
          id: res.data.id,
          photo: res.data.avatar,
          name: res.data.name,
          surname: res.data.surname,
          phone: res.data.phone,
        }

        updateUserData(normalizedData)

      },
      onError: ()=> {
        setStatus(APIStatus.Failure)
      }
    })

  })

  return {fetch, status}
}
