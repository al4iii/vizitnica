import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultToken } from '../../../api/api';
import { businessCardsApi } from '../../../api/businessCardsApi';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';

export const useGetComplaints = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { getComplaints } = businessCardsApi();
  const { setComplaints } = verificationActionCreators();
  const currentToken = useSelector(state => state.verification.token);
  const token = currentToken || defaultToken;

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    getComplaints({
      onSuccess: response => {
        setComplaints(response.data);
      },
      onError: err => {
        console.log(err, 'err');
      },
      token: token,
    });
  });

  return { fetch, status };
};
