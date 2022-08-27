import { useCallback, useState } from 'react';
import { API_URL } from '../../../api/api';
import { verificationAPI } from '../../../api/verificationAPI';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';

export const useSignIn = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { signIn } = verificationAPI();
  const { setToken, getSMSCode } = verificationActionCreators();

  const fetch = useCallback(({ payload }, successCb) => {
    setStatus(APIStatus.Loading);
    signIn({
      customBaseUrl: API_URL,
      onSuccess: resp => {
        setToken(resp.data, 'verification data');
        getSMSCode(resp?.data.code);
        setStatus(APIStatus.Success);
        typeof successCb === 'function' && successCb();
      },
      onError: err => {
        console.log(err, 'eror sing in');
        setStatus(APIStatus.Failure);
      },
      payload,
    });
  });

  return { fetch, status };
};
