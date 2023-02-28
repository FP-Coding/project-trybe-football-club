import { NextFunction, Request, Response } from 'express';

import { IUserInfo, IUserLogin, IUserRole } from '../User/IUser';

export default interface ILoginController {
  login(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
  getRole(req: Request, res: Response, next: NextFunction): Promise<Response | void>
}

export interface ILoginService {
  login(userLoginInfo: IUserLogin): Promise<string>,
  getRole(userInfo: IUserInfo): Promise<IUserRole>
}
