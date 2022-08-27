import React from 'react';
import { useSelector } from 'react-redux'
import { userAPI } from '../../api/userApi'
import { APIStatus } from '../../lib/axiosAPI'
import {
  useGetBusinessCards
} from '../CreateBusinessCard/hooks/useGetBusinessCards'





export const useCreateCardsMass = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { createCardsMass } = userAPI();
  const token = useSelector(state => state.verification.token)
  const { fetch: fetchAll } = useGetBusinessCards()


  const fetch = (data) => {
    console.log(data, 'data')
    setStatus(APIStatus.Loading);
    createCardsMass({
      onSuccess: () => {
        setStatus(APIStatus.Success);
        fetchAll()
      },
      payload: {
        data: data
      },
        token,
      onError: (err) => {
        console.log(err)
        setStatus(APIStatus.Failure);
      }
    })
  }
  return {fetch, status}
}
