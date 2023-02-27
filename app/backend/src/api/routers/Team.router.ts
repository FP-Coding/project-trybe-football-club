import {
  NextFunction, Request, Response, Router,
} from 'express';
import { ITeamController } from '../interfaces/Team/ITeam';
import TeamController from '../controllers/Team.controller';
import TeamService from '../services/Team.service';

const basedService = new TeamService();
const basedController = new TeamController(basedService);

class TeamsRouter {
  readonly route:Router;

  private controller: ITeamController;

  constructor(controller: ITeamController) {
    this.controller = controller;
    this.route = Router();
    this.loadRoutes();
  }

  loadRoutes() {
    this.route.get(
      '/:id',
      (req: Request, res: Response, next: NextFunction) => this.controller.getById(req, res, next),
    );
    this.route.get(
      '/',
      (req: Request, res: Response, next: NextFunction) => this.controller.getAll(req, res, next),
    );
  }
}

export default new TeamsRouter(basedController).route;
