import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../api/api';
import { verificationAPI } from '../../../api/verificationAPI';
import { APIStatus } from '../../../lib/axiosAPI';

export const useCreateClient = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { createUser } = verificationAPI();
  const currentToken = useSelector(state => state.verification.token);

  const fetch = useCallback(body => {
    setStatus(APIStatus.Loading);
    createUser({
      customBaseUrl: API_URL,
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        console.log(err, 'error in verification');
        setStatus(APIStatus.Failure);
      },
      payload: body,
      token: currentToken,
    });
  });
  return { fetch, status };
};
