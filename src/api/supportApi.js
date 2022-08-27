import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

const supportClient = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/support`,
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    },
    ...args,
  });
};

const APIs = {
  supportClient,
};

export const supportApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...APIs }, dispatch);
};
