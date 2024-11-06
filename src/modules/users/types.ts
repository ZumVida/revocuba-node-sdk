export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  roles: IUserRole[];
}

export interface IUserRole {
  name: UserRoleName[];
}

export enum UserRoleName {}
