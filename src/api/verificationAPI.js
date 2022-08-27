import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

const getCountries = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: 'getCountries',
    config: {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const sendPersonalData = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: 'client/profile',
    config: {
      method: 'post',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    body: args.payload,
    ...args,
  });
};

const updatePersonalData = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: 'client/profile',
    config: {
      method: 'put',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    body: args.payload,
    ...args,
  });
};

const sendSMSCode = args => {
  return callAPI({
    url: 'auth/signup',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const sendPassword = args => {
  return callAPI({
    url: 'client/auth/sendPassword',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const verification = args => {
  return callAPI({
    url: 'auth/verify',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const signIn = args => {
  return callAPI({
    url: 'auth/signin',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};
const createUser = args => {
  return callAPI({
    url: 'client/profile',
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

const logOut = args => {
  return callAPI({
    url: 'auth/logout',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
   ...args
  });
};

const verifyNewDevice = args => {
  return callAPI({
    url: 'auth/verify',
    config: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

export const APIs = {
  getCountries,
  sendSMSCode,
  sendPersonalData,
  updatePersonalData,
  sendPassword,
  verification,
  createUser,
  signIn,
  logOut,
  verifyNewDevice,
};

export const verificationAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
