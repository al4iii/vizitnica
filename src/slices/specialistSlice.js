import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const initialState = {
  specialistData: {
    id: '',
    name: '',
    surname: '',
    avatar: null,
    title: '',   
  },
  contacts: null,
  historySpecialist: [],
};

const name = 'specialistSlice';

export const specialistSlice = createSlice({
  initialState,
  name,
  reducers: {
    updateSpecialist: (state, { payload }) => {
      state.specialistData = payload;
    },
    setContacts: (state, { payload }) => {
      state.contacts = payload;
    },
    getHistorySpecialist: (state, { payload }) => {
      state.historySpecialist = payload;
    },
  },
});

export const specialistActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...specialistSlice.actions,
    },
    dispatch,
  );
};
