import { useCallback, useState } from 'react';
import deviceInfoModule from 'react-native-device-info';
import { useSelector } from 'react-redux';
import { verificationAPI } from '../../api/verificationAPI';
import { APIStatus } from '../../lib/axiosAPI';

export const useLogout = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const [device_id, setDeviceId] = useState(null);
  const { logOut } = verificationAPI();
  const token = useSelector(state => state.verification.token);

  deviceInfoModule.getUniqueId().then(uniqueId => {
    setDeviceId(uniqueId);
  });

  const fetch = useCallback(() => {
    setStatus(APIStatus.Loading);
    logOut({
      onSuccess: () => {
        setStatus(APIStatus.Success);
      },
      onError: err => {
        setStatus(APIStatus.Failure);
      },
      payload: { device_id },
      token,
    });
  });

  return { fetch, status };
};
