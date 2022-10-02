import axios from 'axios';
import { backendApiBaseUrl } from '.';

const defaultHeaders = { 'Content-Type': 'application/json' };

export default axios.create({
  baseURL: backendApiBaseUrl,
  headers: defaultHeaders,
});

export const axiosPrivate = axios.create({
  baseURL: backendApiBaseUrl,
  headers: defaultHeaders,
  withCredentials: true,
});
