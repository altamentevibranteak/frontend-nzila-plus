import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import { APIError } from '../types';

let authToken: string | null = null;
let signOutHandler: (() => void) | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export function setSignOutHandler(fn: () => void) {
  signOutHandler = fn;
}

const instance: AxiosInstance = axios.create({
  baseURL: config.API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((cfg: any) => {
  if (!cfg.headers) cfg.headers = {};
  if (authToken) {
    cfg.headers['Authorization'] = `Token ${authToken}`;
  }
  return cfg;
});

instance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err: unknown) => {
    // attempt to extract response
    const errorAny = err as any;
    const response = errorAny?.response;
    if (response && response.status === 401) {
      if (signOutHandler) signOutHandler();
    }
    const apiError: APIError = {
      message: (response?.data && (response.data.message || response.data.detail)) || (errorAny && errorAny.message) || 'Request failed',
      code: response?.data?.code || String(response?.status || ''),
      details: response?.data || null,
    };
    return Promise.reject(apiError);
  }
);

export async function get<T = unknown>(url: string, params?: Record<string, unknown>): Promise<T> {
  const r = await instance.get<T>(url, { params });
  return r.data;
}

export async function post<T = unknown, U = unknown>(url: string, body?: U): Promise<T> {
  const r = await instance.post<T>(url, body);
  return r.data;
}

export async function put<T = unknown, U = unknown>(url: string, body?: U): Promise<T> {
  const r = await instance.put<T>(url, body);
  return r.data;
}

export async function del<T = unknown>(url: string): Promise<T> {
  const r = await instance.delete<T>(url);
  return r.data;
}

export { instance as axiosInstance };
export default instance;
