import { useCallback, useState } from 'react';
import { API_URL } from '../../../api/api';
import { verificationAPI } from '../../../api/verificationAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';

export const useVerification = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { verification } = verificationAPI();
  const { setToken } = verificationActionCreators();

  const fetch = useCallback((body, successCb) => {
    setStatus(APIStatus.Loading);
    verification({
      customBaseUrl: API_URL,
      onSuccess: resp => {
        setToken(resp.data, 'verification data');
        setStatus(APIStatus.Success);
        successCb();
      },
      onError: err => {
        console.log(err, 'error in verification');
        setStatus(APIStatus.Failure);
      },
      payload: body,
    });
  });

  return { fetch, status };
};
