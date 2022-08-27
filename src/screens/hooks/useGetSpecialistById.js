import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultToken } from '../../api/api';
import { userAPI } from '../../api/userApi';
import { APIStatus } from '../../lib/axiosAPI';

export const useGetSpecialistById = () => {
  const { getSpecialistById } = userAPI();
  const [status, setStatus] = useState(APIStatus.Initial);
  const currentToken = useSelector(state => state.verification.token);
  const token = currentToken || defaultToken;

  const fetch = useCallback((id = 0, successCb) => {
    getSpecialistById({
      specialistId: id,
      token,
      onSuccess: res => {
        setStatus(APIStatus.Success);
        if (typeof successCb === 'function') {
          successCb(res);
        }
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
