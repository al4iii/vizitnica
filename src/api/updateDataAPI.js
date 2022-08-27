import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

const updatePersonalData = args => {
  return callAPI({
    url: `client/profile/`,
    config: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const updateBusinessCard = args => {
  return callAPI({
    url: `client/card/${args?.id}`,
    config: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        ContentType: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const updateAvatar = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `image`,
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${args?.token}`,
      },
      ...args,
      payload: args.payload,
    },
  });
};

export const APIs = {
  updatePersonalData,
  updateAvatar,
  updateBusinessCard,
};

export const updateDataApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
