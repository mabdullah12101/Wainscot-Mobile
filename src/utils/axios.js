import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosApiIntances = axios.create({
  // baseURL: 'http://192.168.174.111:3001/api',
  // baseURL: 'http://192.168.43.5:3001/api',
  // baseURL: 'http://192.168.202.103:3001/api',

  baseURL: 'https://wainscot-event-organizer-backend.vercel.app/api',
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const token = await AsyncStorage.getItem('token');
    config.headers = {
      Authorization: `Bearer ${token}`,
      refreshtoken: refreshToken,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default axiosApiIntances;
