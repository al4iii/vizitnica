import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

const getIsUserExists = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: 'isUserExists',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const getCurrentUserData = args => {
  return callAPI({
    url: 'client/profile',
    config: {
      method: 'get',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
  });
};

const getSpecialistById = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `specialist/profile/${args?.specialistId}`,
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

const createCardsMass = args => {
  return callAPI({
    url: 'client/contactBook/mass',
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

const getUserCard = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: 'client/card',
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

const APIs = {
  getIsUserExists,
  getSpecialistById,
  getUserCard,
  getCurrentUserData,
  createCardsMass,
};

export const userAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...APIs }, dispatch);
};
