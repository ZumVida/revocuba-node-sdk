import { AxiosInstance } from 'axios';
import { IApiWrapper } from '@/types/pagination';
import {
  IAuthLoginRequest,
  IAuthRegisterRequest,
  IAuthResponse,
} from './types';
import { IUser } from '../types';

export default function (api: AxiosInstance) {
  return {
    current: () => api.post<IApiWrapper<IUser>>('/auth'),
    login: (params: IAuthLoginRequest) =>
      api.post<IAuthResponse>('/auth/login', params),
    register: (params: IAuthRegisterRequest) =>
      api.post<IAuthResponse>('/auth/register', params),
  };
}
