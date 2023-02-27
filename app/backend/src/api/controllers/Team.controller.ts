import { NextFunction, Request, Response } from 'express';
import ITeamsService, { ITeamController } from '../interfaces/Team/ITeam';

class TeamController implements ITeamController {
  private service: ITeamsService;

  constructor(service: ITeamsService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { id } = req.params;
      const teams = await this.service.getById(Number(id));
      console.log(teams);
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamController;
