import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

const fetchBusinessCards = args => {
  return callAPI({
    url: 'getBackgrounds',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const fetchActivityKinds = args => {
  return callAPI({
    url: 'getActivityKinds',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const getClientById = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/profile/${args.id}`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const updateClientData = args => {
  return callAPI({
    url: `client/profile/${args.id}`,
    config: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args.token}`,
      },
      data: args.data,
    },
    data: args.data,

    ...args,
  });
};

const getLoggedInClient = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/profile/`,
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const sendCreateSpecialist = args => {
  return callAPI({
    url: 'specialist/profile',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const sendImage = args => {
  return callAPI({
    url: 'image',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${args.variables.token}`,
      },
    },
    ...args,
  });
};

export const APIs = {
  fetchBusinessCards,
  sendImage,
  sendCreateSpecialist,
  fetchActivityKinds,
  getClientById,
  getLoggedInClient,
  updateClientData,
};

export const settingsProfileAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
