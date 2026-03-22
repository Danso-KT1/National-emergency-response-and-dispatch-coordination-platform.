import axios from 'axios';
import { storage } from '@/lib/storage';

export const authHttp = axios.create();
export const incidentsHttp = axios.create();
export const trackingHttp = axios.create();
export const analyticsHttp = axios.create();

[authHttp, incidentsHttp, trackingHttp, analyticsHttp].forEach((client) => {
  client.interceptors.request.use((config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
});
