import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { storeData } from '../../App';

const card = {
  id: 1,
  photo: '',
  name: '',
  surname: '',
  phoneNumber: '',
  speciality: '',
  description: '',
};

const initialState = {
  selectedCountry: {
    code: '+7',
    flag: 'https://flagcdn.com/w320/ru.png',
  },
  countries: [
    {
      code: '+7',
      flag: 'https://flagcdn.com/w320/ru.png',
      name: 'Россия',
    },
  ],
  phoneNumber: null,
  SMSCode: null,
  token: null,
  isClientExists: null,
  avatarPicId: null,
  userData: {
    id: null,
    photo: '',
    name: '',
    surname: '',
    phone: '',
    avatarPicId: null,
  },
  businessCards: [],
  businessCard: card,
  editBusinessCard: null,
  visibleModalFullScreen: false,
  signInStatus: false,
  shouldShowOnboarding: true,
  image: null,
  complaints: null,
  isSentComplaints: null,
  userExistsInfo: {
    user: false,
    device: false,
    client: false,
    specialist: false,
  },
  isCadrSpecialist: null,
};

export const verificationSlice = createSlice({
  name: 'verificationSlice',
  initialState,
  reducers: {
    resetStore: state => {
      state.businessCards = [];
      state.SMSCode = null;
      state.userData = {
        id: null,
        photo: '',
        name: '',
        surname: '',
        phone: '',
        avatarPicId: null,
      };
      state.phoneNumber = null;
      state.businessCard = {
        id: 1,
        photo: '',
        name: '',
        surname: '',
        phoneNumber: '',
        speciality: '',
        description: '',
      };
      state.signInStatus = false;
    },
    setUserExistsInfo: (state, { payload }) => {
      state.userExistsInfo = { ...state.userExistsInfo, ...payload };
    },
    setAvatarPicId: (state, { payload }) => {
      state.avatarPicId = payload;
    },
    setShouldShowOnboarding: (state, { payload }) => {
      state.shouldShowOnboarding = payload;
    },
    setAvatarUrl: (state, { payload }) => {
      state.userData.photo = payload;
    },
    updateSelectedCountry: (state, { payload }) => {
      state.selectedCountry.code = payload.code;
      state.selectedCountry.flag = payload.flag;
    },
    openModalFullScreen(state, action) {
      state.visibleModalFullScreen = true;
      state.indexContentModalFullScreen = action.payload;
    },
    setCountries(state, action) {
      state.countries = action.payload;
    },
    getPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    updateUserData(state, action) {
      state.userData = action.payload;
    },
    updateUserDataVerify(state, action) {
      state.userData.phone = action.payload.phone;
      state.userData.name = action.payload.name;
      state.userData.surname = action.payload.surname;
      state.userData.photo = action.payload.avatar;
    },
    updateBusinessCard(state, action) {
      state.businessCard = action.payload;
    },
    addBusinessCard(state, action) {
      const isExists = state.businessCards.some(
        ({ card }) => card?.id !== action.payload?.id,
      );
      if (isExists) {
        state.businessCards = [...state.businessCards];
      } else {
        state.businessCards = [...state.businessCards, action.payload];
      }
    },
    editBusinessCardAction(state, action) {
      state.editBusinessCard = action.payload;
    },
    editBusinessCardActionFinish(state, action) {
      state.businessCards = action.payload;
    },
    getSMSCode(state, action) {
      state.SMSCode = action.payload;
    },
    setBusinessCards: (state, action) => {
      state.businessCards = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
    cleanBusinessCard: state => {
      state.businessCard = card;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
      payload && storeData(payload);
    },
    setIsClientExists: (state, { payload }) => {
      state.isClientExists = payload;
    },
    setSignInStatus: (state, { payload }) => {
      state.signInStatus = payload;
    },
    setComplaints: (state, { payload }) => {
      state.complaints = payload;
    },
    setIsCadrSpecialist: (state, { payload }) => {
      state.isCadrSpecialist = payload;
    },
    sentComplaints: (state, { payload }) => {
      state.isSentComplaints = payload;
    },
  },
});

export const verificationActionCreators = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    {
      ...verificationSlice.actions,
    },
    dispatch,
  );
};
