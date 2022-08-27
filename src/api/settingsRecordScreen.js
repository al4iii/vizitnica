import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

const settingsRecordScreen = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/specialist/${args.idSpecialist}/maintenances`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const dateFreeHoursForDay = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/specialist/${args.idSpecialist}/freeHours/${args.date}`,
    config: {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const checkForDuplicates = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/appointment/specialist/${args.id}/checkForDuplicates`,
    config: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${args?.token}`,
        Accept: 'application/json',
      },
    },
    ...args,
  });
};

const APIs = {
  settingsRecordScreen,
  dateFreeHoursForDay,
  checkForDuplicates,
};

export const settingsRecordScreenAPI = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...APIs }, dispatch);
};
