import { NextFunction, Request, Response } from 'express';
import { ILeaderboardController,
  ILeaderboardService } from '../interfaces/Leaderboard/ILeaderboard';

class LeaderboardController implements ILeaderboardController {
  private service: ILeaderboardService;

  constructor(service: ILeaderboardService) {
    this.service = service;
  }

  async getAllHome(_req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const teams = await this.service.getAllHome();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
