import React from 'react';
import { APIStatus } from '../../../lib/axiosAPI';
import { settingsProfileAPI } from '../../../api/settingsProfileAPI';
import { settingsProfileActionCreators } from '../../../slices/settingsProfileSlice';

export const useFetchActivityKinds = () => {
  const [status, setStatus] = React.useState(APIStatus.Initial);
  const { fetchActivityKinds } = settingsProfileAPI();
  const { setActivityKinds, setDataBusiness } = settingsProfileActionCreators();

  const fetchActivity = React.useCallback(() => {
    setStatus(APIStatus.Loading);
    fetchActivityKinds({
      onSuccess: response => {
        const arr = [];
        response.data.map(r => arr.push(r.name));
        setActivityKinds(response.data);
        setDataBusiness(arr);
        setStatus(APIStatus.Success);
      },
      onError: () => {
        setStatus(APIStatus.Failure);
      },
    });
  }, []);

  return { fetchActivity, status };
};
