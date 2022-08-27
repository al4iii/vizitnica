import axios from 'axios';
import { API_URL } from '../api/api'
import {apiURL} from '../constants/index';

// import store from "../store/configureStore";

const axiosApi = axios.create({
  baseURL: API_URL
});

// axiosApi.interceptors.request.use(config => {
//   try{
//     config.headers['Authorization'] = 'Token ' + store.getState().users.user.token
//   } catch {
//     // do nothing
//   }
//   return config
// });

export default axiosApi;