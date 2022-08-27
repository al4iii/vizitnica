import { useState } from 'react';
import { useSelector } from 'react-redux';
import { userAPI } from '../../../api/userApi';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';
import { useFetchSMSCode } from '../../Verification/hooks/useFetchSMSCode';
import { useSignIn } from '../../Verification/hooks/useSignIn';
import DeviceInfo from 'react-native-device-info';

export const useGetIsUserExists = () => {
  const [deviceId, setDeviceId] = useState(null);
  const [status, setStatus] = useState(APIStatus.Initial);
  const { getIsUserExists } = userAPI();
  const { setIsClientExists, setUserExistsInfo } = verificationActionCreators();
  const { fetch: signIn } = useSignIn();
  const { fetch: sendSMSCode } = useFetchSMSCode();

  const phoneNumber = useSelector(state => state.verification.phoneNumber);
  const countryCode = useSelector(({ verification }) => verification.selectedCountry.code);
  const { fetch: fetchSendSms } = useFetchSMSCode();
  const phoneUnmask = (countryCode + phoneNumber + '').split(' ').join('');

  DeviceInfo.getUniqueId().then(uniqueId => {setDeviceId(uniqueId)});

  const fetch = (phone, successCb) => {
    setStatus(APIStatus.Loading);
    getIsUserExists({
      payload: {
        phone_number: phone,
        device_id: deviceId,
      },
      onSuccess: resp => {
        setStatus(APIStatus.Success);
        typeof successCb === 'function' && successCb(resp.data);
        if (resp.data.user) {
          if (resp.data?.client || resp.data?.specialist) {
            setIsClientExists(true);
            setUserExistsInfo({
              user: resp.data.user,
              device: resp.data.device,
              client: resp.data.client,
            });
            const signInBody = {
              phone_number: phoneUnmask,
              device_id: deviceId,
            };
            if (resp.data.user && resp.data.client && resp.data.device) {
              signIn({ payload: signInBody });
            }
            if (resp.data.user && resp.data.client && !resp.data.device) {
              sendSMSCode(phone, null);
            }
          }
        } else {
          fetchSendSms(phoneUnmask);
        }
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  };
  return { fetch, status };
};
