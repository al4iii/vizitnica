import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

export const getBusinessCards = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: 'client/contactBook',
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

export const deleteCardById = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/contactBook/dummy/${args.id}`,
    config: {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

export const deleteSpecCardById = args => {
  console.log(args, 'args 33333');
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/contactBook/${args?.type}/${args.id}`,
    config: {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

export const uploadImage = args => {
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
    },
    ...args,
  });
};

export const getComplaints = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/report/reasons`,
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

export const sendComplaint = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/report/${args.id}`,
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

export const APIs = {
  getBusinessCards,
  deleteCardById,
  uploadImage,
  getComplaints,
  sendComplaint,
  deleteSpecCardById,
};

export const businessCardsApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
