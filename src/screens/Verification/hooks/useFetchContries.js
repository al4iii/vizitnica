import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { verificationAPI } from '../../../api/verificationAPI';
import { verificationActionCreators } from '../../../slices/verificationSlice';

export const useFetchContries = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { getCountries } = verificationAPI();
  const { setCountries } = verificationActionCreators();

  const fetch = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    getCountries({
      onSuccess: response => {
        setCountries(response.data);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetch, status };
};
