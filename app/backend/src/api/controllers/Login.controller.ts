import { Request, Response, NextFunction } from 'express';
import ILoginController, { ILoginService } from '../interfaces/Login/ILogin';
import IUser from '../interfaces/User/IUser';
import { decodeToken } from '../utils/JWT';

class LoginController implements ILoginController {
  protected service: ILoginService;
  constructor(service: ILoginService) {
    this.service = service;
  }

  async getRole(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const token = req.headers.authorization as string;
      const infoUser = decodeToken(token) as IUser;
      const role = await this.service.getRole(infoUser);
      return res.status(200).json(role);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const infoUser = req.body;
      const token = await this.service.login(infoUser);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
