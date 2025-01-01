import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();
const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

// calendarApi.defaults.headers.post['Content-Type'] = 'application/json';

// calendarApi.interceptors.request.use(config => {
//   config.headers.Authorization = `Bearer ${import.meta.env.VITE_API_TOKEN}`;
//   return config;
// });

// calendarApi.interceptors.response.use(
//   config => {
//     return config;
//   },
//   async error => {
//     if (error.response.status === 401) {
//       console.log('Token no válido');
//     }
//     return Promise.reject(error);
//   },
// );

export default calendarApi;
