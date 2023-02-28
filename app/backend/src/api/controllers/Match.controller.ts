import { Request, Response, NextFunction } from 'express';
import BadRequest from '../errors/BadRequest';
import IMatchController, { IMatchService, TInProgress } from '../interfaces/Matches/IMatches';

class MatchController implements IMatchController {
  private service: IMatchService;
  constructor(service: IMatchService) {
    this.service = service;
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const inProgress = req.query.inProgress as TInProgress;
      let matches;
      if (inProgress) {
        const condition1 = inProgress !== 'true';
        const condition2 = inProgress !== 'false';
        if (condition1 && condition2) throw new BadRequest('inProgress must be "true" or "false"');
        matches = await this.service.getAll(inProgress);
      } else matches = await this.service.getAll();
      return res.status(200).json(matches);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
