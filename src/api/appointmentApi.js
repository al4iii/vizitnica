import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { callAPI } from '../lib/axiosAPI';
import { API_URL } from './api';

const getAppointmentHistory = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `client/appointment/history`,
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

const deleteAppointmentById = args => {
  return callAPI({
    url: `specialist/appointment/${args.id}`,
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

const createAppointment = args => {
  return callAPI({
    url: `client/appointment/specialist/${args.id}`,
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

export const deleteAppointmentCardHistory = args => {
  return callAPI({
    customBaseUrl: API_URL,
    url: `specialist/appointment/${args.orderNumbers}`,
    config: {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

const getHistoryForSpecialist = args => {
  return callAPI({
    url: `client/appointment/specialist/${args.id}/history`,
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

const updateHistorySpecialist = args => {
  return callAPI({
    url: `client/appointment/specialist/${args?.orderNumber}`,
    config: {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${args?.token}`,
      },
    },
    ...args,
  });
};

export const APIs = {
  getAppointmentHistory,
  deleteAppointmentById,
  createAppointment,
  deleteAppointmentCardHistory,
  getHistoryForSpecialist,
  updateHistorySpecialist,
};

export const appointmentApi = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...APIs,
    },
    dispatch,
  );
};
