import { combineReducers } from '@reduxjs/toolkit';
import { specialistSlice } from '../slices/specialistSlice';
import { verificationSlice } from '../slices/verificationSlice';
import { recordScreenSlice } from '../slices/recordScreenSlice';

const rootReducer = combineReducers({
  verification: verificationSlice.reducer,
  recordScreen: recordScreenSlice.reducer,
  specialistData: specialistSlice.reducer,
});

export default rootReducer;
