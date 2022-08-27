import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationAPI } from '../../../api/verificationAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';

export const useFetchSMSCode = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { sendSMSCode } = verificationAPI();
  const { getSMSCode } = verificationActionCreators();

  const fetch = React.useCallback((phoneUnmask, successCb) => {
    setStatus(APIStatus.Loading);
    sendSMSCode({
      onSuccess: response => {
        getSMSCode(response?.data?.code);
        setStatus(APIStatus.Success);
        typeof successCb === 'function' && successCb(response?.data?.code);
      },
      payload: {
        phone_number: phoneUnmask,
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
