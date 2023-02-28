import {
  NextFunction, Request, Response, Router,
} from 'express';
import LoginController from '../controllers/Login.controller';
import ILoginController from '../interfaces/Login/ILogin';
import VerifyToken from '../middlewares/TokenVerify';
import LoginService from '../services/Login.service';

const basedService = new LoginService();
const basedController = new LoginController(basedService);

class LoginRouter {
  readonly route: Router;

  private controller: ILoginController;

  constructor(controller: ILoginController) {
    this.controller = controller;
    this.route = Router();
    this.loadRoutes();
  }

  private loadRoutes() {
    this.route.get(
      '/role',
      (req: Request, res: Response, next: NextFunction) => VerifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) => this.controller.getRole(req, res, next),
    );
    this.route.post(
      '/',
      (req: Request, res: Response, next: NextFunction) => this.controller.login(req, res, next),
    );
  }
}

export default new LoginRouter(basedController).route;
