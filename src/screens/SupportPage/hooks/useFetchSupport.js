import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { defaultToken } from '../../../api/api';
import { APIStatus } from '../../../lib/axiosAPI';
import { supportApi } from '../../../api/supportApi';

export const useFetchSupport = () => {
  const [status, setStatus] = useState(APIStatus.Initial);
  const { supportClient } = supportApi();
  const currentToken = useSelector(state => state.verification.token);
  const token = currentToken || defaultToken;

  const fetchSupport = useCallback(formData => {
    setStatus(APIStatus.Loading);
    console.log(formData, 'formData')
    supportClient({
      onSuccess: response => {
        setStatus(APIStatus.Success);
        console.log(response, 'ura support');
      },
      onError: err => {
        setStatus(APIStatus.Failure);
        console.log(err, 'error support');
      },
      payload: formData,
      token,
    });
  }, []);

  return { fetchSupport, status };
};
