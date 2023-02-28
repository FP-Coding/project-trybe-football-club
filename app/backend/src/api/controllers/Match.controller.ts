import { Request, Response, NextFunction } from 'express';
import IMatchController, { IMatchService } from '../interfaces/Matches/IMatches';

class MatchController implements IMatchController {
  private service: IMatchService;
  constructor(service: IMatchService) {
    this.service = service;
  }

  async getAll(_req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const matches = await this.service.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
