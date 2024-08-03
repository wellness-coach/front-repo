import axios from 'axios';
import { getCookie } from './Cookie';

const AxiosC = axios.create();

AxiosC.interceptors.request.use(async (config) => {
  const token = await getCookie('Authorization');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default AxiosC;
