import { useDispatch } from 'react-redux';
import { bindActionCreators, createSlice } from '@reduxjs/toolkit';

const initialState = {
  card: [],
  appointmentHistory: [],
  freeHours: [],
  newCard: null,
  duplicates: [],
  argsCreateHistoryCard: [],
};

export const recordScreenSlice = createSlice({
  name: 'recordScreenSlice',
  initialState,
  reducers: {
    changeSelected(state, action) {
      const type = typeof action?.payload?.id;
      if (type === 'number' || type === 'string') {
        state.card[action?.payload?.id].countServices = state.card[
          action?.payload?.id
        ]?.countServices?.slice(0, -1);
      }
      if (!state.card[action?.payload?.id]?.countServices?.length) {
        state.card[action?.payload?.id].selected = false;
        state.card[action?.payload?.id].countServices = null;
      }
    },
    addSelected(state, action) {
      const type = typeof action?.payload?.id;
      if (type === 'number' || type === 'string') {
        state.card[action?.payload?.id].selected = true;
        if (state.card[action?.payload?.id].countServices?.length) {
          state.card[action?.payload?.id].countServices = [
            ...state.card[action?.payload?.id].countServices,
            state.card[action?.payload?.id]?.countServices[
              state.card[action?.payload?.id]?.countServices.length - 1
            ] + 1,
          ];
        } else {
          state.card[action?.payload?.id].countServices = [0];
        }
      }
    },
    setHistory: (state, action) => {
      state.appointmentHistory = action.payload;
    },
    getRecordScreenService: (state, action) => {
      state.card = action.payload;
    },
    getFreeHoursInDays: (state, action) => {
      state.freeHours = action.payload;
    },
    setNewCard: (state, action) => {
      state.newCard = action.payload;
    },
    getDuplicateAppointment: (state, action) => {
      state.duplicates = action.payload;
    },
    setArgsCreateHistoryCard: (state, action) => {
      state.argsCreateHistoryCard = action.payload;
    },
  },
});

export const recordScreenActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...recordScreenSlice.actions,
    },
    dispatch,
  );
};
