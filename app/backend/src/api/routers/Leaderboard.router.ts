import {
  NextFunction, Request, Response, Router,
} from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';
import { ILeaderboardController } from '../interfaces/Leaderboard/ILeaderboard';
import LeaderBoardService from '../services/LeaderBoard.service';

const basedService = new LeaderBoardService();
const basedController = new LeaderboardController(basedService);

class LeaderboardRouter {
  readonly route: Router;

  private controller: ILeaderboardController;

  constructor(controller: ILeaderboardController) {
    this.controller = controller;
    this.route = Router();
    this.loadRoutes();
  }

  loadRoutes() {
    this.route.get(
      '/away',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getAllAway(req, res, next),
    );
    this.route.get(
      '/home',
      (req: Request, res: Response, next: NextFunction) =>
        this.controller.getAllHome(req, res, next),
    );
    this.route.get('/', (req: Request, res: Response, next: NextFunction) =>
      this.controller.getAll(req, res, next));
  }
}

export default new LeaderboardRouter(basedController).route;
