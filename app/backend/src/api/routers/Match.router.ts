import {
  NextFunction, Request, Response, Router,
} from 'express';
import MatchController from '../controllers/Match.controller';
import IMatchController from '../interfaces/Matches/IMatches';
import VerifyToken from '../middlewares/TokenVerify';
import MatchService from '../services/Match.service';

const basedService = new MatchService();
const basedController = new MatchController(basedService);

class MatchRouter {
  readonly route: Router;

  private controller: IMatchController;

  constructor(controller: IMatchController) {
    this.controller = controller;
    this.route = Router();
    this.loadRoutesPatch();
    this.loadRoutesGet();
    this.loadRoutesPost();
  }

  private loadRoutesGet() {
    this.route.get(
      '/',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getAll(req, res, next),
    );
  }

  private loadRoutesPatch() {
    this.route.patch(
      '/:id',
      (req: Request, res: Response, next: NextFunction) =>
        VerifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.changeScore(req, res, next),
    );
    this.route.patch(
      '/:id/finish',
      (req: Request, res: Response, next: NextFunction) =>
        VerifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.finishMatch(req, res, next),
    );
  }

  private loadRoutesPost() {
    this.route.post(
      '/',
      (req: Request, res: Response, next: NextFunction) =>
        VerifyToken.verify(req, res, next),
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.createMatch(req, res, next),
    );
  }
}

export default new MatchRouter(basedController).route;
