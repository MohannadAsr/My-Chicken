import { Domain } from '@src/enums/Domain';
import { useAuth } from '@src/hooks/useAuth';
import { useToast } from '@src/hooks/useToast';
import { AppDispatch, RootState } from '@src/store/store';
import type { AxiosError } from 'axios';
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const { toast } = useToast();
const { LogOut } = useAuth();

// Error Handler
const errorHandler = async (error: AxiosError) => {
  const config: AxiosRequestConfig | undefined = error?.config;

  if (error.response?.status === 400) {
    toast('invalid data submitted !', 'error');
  }
  if (error.response?.status === 408) {
    toast('Request timed out. Please try again.', 'error');
  }
  if (error.response.status == 401) {
    LogOut();
  }

  return Promise.reject(error);
};

const requestHandler = async (request: AxiosRequestConfig) => {
  const { GetAccessToken } = useAuth();
  // Add Access Token to Request Header
  if (request.headers && GetAccessToken()) {
    request.headers.Authorization = `Bearer ${GetAccessToken()}`;
  }

  return request;
};

const responseHandler = (response: AxiosResponse) => {
  return response;
};

const axiosInstance = axios.create({
  baseURL: `${Domain.API_URL}`,
  //   headers: { lang: 'ar' },
});

axiosInstance.interceptors.request.use(requestHandler as any);
axiosInstance.interceptors.response.use(responseHandler, errorHandler);

export { axiosInstance };
