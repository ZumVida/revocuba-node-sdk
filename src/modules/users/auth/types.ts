import { IUser } from '../types.ts';

export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthRegisterRequest {
  name: string;
  email: string;
  phone: string | null;
  password: string;
  password_confirmation: string;
}

export interface IAuthResponse {
  data: IUser;
  token: string;
}
