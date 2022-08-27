import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { defaultToken } from '../../api/api'
import { businessCardsApi } from '../../api/businessCardsApi'
import { APIStatus } from '../../lib/axiosAPI'
import {
  useGetBusinessCards
} from '../CreateBusinessCard/hooks/useGetBusinessCards'



export const useDeleteSpecById = () => {

  const  [status, setStatus ] = useState(APIStatus.Initial)
  const { deleteSpecCardById } = businessCardsApi()
  const currentToken = useSelector(state => state.verification.token)
  const token = currentToken || defaultToken
  const {fetch: fetchAllCards} = useGetBusinessCards()



  const fetch = useCallback((args) => {

    console.log(args)
    deleteSpecCardById({
      onSuccess: (res) => {
        setStatus(APIStatus.Success)
        fetchAllCards()
      },
      onError: (err) => {
        setStatus(APIStatus.Failure)
      },
      id: args?.id,
      token: token,
      ...args,
    })

  }, [])

  return { fetch, status }
}
