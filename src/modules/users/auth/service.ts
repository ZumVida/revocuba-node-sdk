import { AxiosInstance } from 'axios';
import { IApiWrapper } from '@/types/pagination';
import {
  IAuthLoginRequest,
  IAuthRegisterRequest,
  IAuthResponse,
} from './types';
import { IUser } from '../types';

export default function (api: AxiosInstance) {
  const baseUrl = '/auth';

  return {
    current: () => api.post<IApiWrapper<IUser>>(baseUrl),
    login: (params: IAuthLoginRequest) =>
      api.post<IAuthResponse>(`${baseUrl}/login`, params),
    register: (params: IAuthRegisterRequest) =>
      api.post<IAuthResponse>(`${baseUrl}/register`, params),
  };
}
