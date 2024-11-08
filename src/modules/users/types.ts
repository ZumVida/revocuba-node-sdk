export interface IUser {
  id: string;
  name: string;
  email: string;
  profile?: IUserProfile;
  roles: IUserRole[];
}

export interface IUserProfile {
  phone: string | null;
  phone_verified_at: string | null;
  image: string | null;
}

export interface IUserRole {
  name: UserRoleName[];
}

export enum UserRoleName {
  ADMIN = 'admin',
  USER = 'user',
}
