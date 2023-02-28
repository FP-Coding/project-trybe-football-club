import {
  NextFunction, Request, Response, Router,
} from 'express';
import MatchController from '../controllers/Match.controller';
import IMatchController from '../interfaces/Matches/IMatches';
import MatchService from '../services/Match.service';

const basedService = new MatchService();
const basedController = new MatchController(basedService);

class MatchRouter {
  readonly route: Router;

  private controller: IMatchController;

  constructor(controller: IMatchController) {
    this.controller = controller;
    this.route = Router();
    this.loadRoutes();
  }

  private loadRoutes() {
    this.route.get(
      '/',
      (req: Request, res: Response, next: NextFunction) => this.controller.getAll(req, res, next),
    );
  }
}

export default new MatchRouter(basedController).route;
