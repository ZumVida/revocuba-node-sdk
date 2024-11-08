import { IUser } from '../types';

export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IAuthResponse {
  data: IUser;
  token: string;
}
