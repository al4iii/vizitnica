import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultToken } from '../../api/api';
import { businessCardsApi } from '../../api/businessCardsApi';
import { APIStatus } from '../../lib/axiosAPI';
import { verificationActionCreators } from '../../slices/verificationSlice';

export const useSendComplaint = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const currentToken = useSelector(state => state.verification.token);
  const token = currentToken || defaultToken;
  const { sendComplaint } = businessCardsApi();
  const { sentComplaints } = verificationActionCreators();

  const fetch = useCallback((id, reason) => {
    setStatus(APIStatus.Loading);
    sendComplaint({
      onSuccess: () => {        
        sentComplaints(true)
      },
      onError: err => {
        sentComplaints(false)
        // console.log(err, 'error in creating user');       
      },
      id,
      payload: {
        reason: reason,
      },
      token,
    });
  });

  return { fetch, status };
};
