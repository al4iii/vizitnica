import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../../api/api'
import { businessCardsApi, deleteCardById } from '../../../api/businessCardsApi'
import { APIStatus } from '../../../lib/axiosAPI'


export const useDeleteBusinessCardById = () => {

  const [status, setStatus ]  = useState(APIStatus.Initial)
  const { deleteCardById } = businessCardsApi()
  const currentToken = useSelector(state => state.verification.token)
  const token = currentToken || defaultToken



  const fetch = useCallback((args) => {

    deleteCardById({
      onSuccess: (res) => {
        setStatus(APIStatus.Success)
      },
      onError: (err) => {
        setStatus(APIStatus.Failure)
      },
      id: args.id,
      token: token,
    })

  })

  return { fetch, status }
}
