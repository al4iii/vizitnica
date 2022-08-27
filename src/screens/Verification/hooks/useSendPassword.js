import React from 'react';
import { storeData } from '../../../../App';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationAPI } from '../../../api/verificationAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';
import { useSelector } from 'react-redux';

export const useSendPassword = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { sendPassword } = verificationAPI();
  const { setToken, setSignInStatus } = verificationActionCreators();
  const phoneNumber = useSelector(state => state.verification.phoneNumber);
  const countryCode = useSelector(state => state.verification.selectedCountry.code);
  const phoneUnmask = countryCode + phoneNumber;

  const fetch = React.useCallback((SMScode, successCb) => {
    setStatus(APIStatus.Loading);
    sendPassword({
      payload: {
        phone_number: phoneUnmask,
        pin: SMScode,
      },
      onSuccess: response => {
        setToken(response?.data);
        storeData(response?.data);
        setStatus(APIStatus.Success);
        successCb();
        setSignInStatus(true);
      },
      onError: () => {
        setSignInStatus(false);
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
