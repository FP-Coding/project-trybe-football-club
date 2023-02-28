export interface IUserCreate extends IUserInfo {
  password: string;
}

export interface IUserRole {
  role: string;
}

export interface IUserInfo extends IUserRole {
  username: string;
  email: string;
}

export interface IUserLogin {
  email: string,
  password: string
}

export default interface IUser extends IUserInfo {
  id: number;
}
