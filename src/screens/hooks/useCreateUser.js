import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultToken } from '../../api/api';
import { verificationAPI } from '../../api/verificationAPI';
import { APIStatus } from '../../lib/axiosAPI';
import { verificationActionCreators } from '../../slices/verificationSlice';

export const useCreateUser = (callback, deps) => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { updateUserDataVerify } = verificationActionCreators();
  const currentToken = useSelector(state => state.verification.token);
  const token = currentToken || defaultToken;
  const { sendPersonalData } = verificationAPI();
  
  const fetch = useCallback(args => {
    setStatus(APIStatus.Loading);
    sendPersonalData({
      token,
      onSuccess: response => {
        updateUserDataVerify(response.data);
      },
      onError: err => {
        console.log(err, 'error in creating user');
      },
      ...args,
    });
  }, deps);

  return { fetch, status };
};
