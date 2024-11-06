import { AxiosInstance } from 'axios';
import {
  IAuthLoginRequest,
  IAuthRegisterRequest,
  IAuthResponse,
} from './types.ts';
import { IUser } from '../types';
import { IApiWrapper } from '../../../types/pagination';

export default function (api: AxiosInstance) {
  const baseUrl = '';

  return {
    current: () => api.post<IApiWrapper<IUser>>(baseUrl),
    login: (params: IAuthLoginRequest) =>
      api.post<IAuthResponse>(`${baseUrl}/login`, params),
    register: (params: IAuthRegisterRequest) =>
      api.post<IAuthResponse>(`${baseUrl}/register`, params),
  };
}
