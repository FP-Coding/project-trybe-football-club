import { NextFunction, Request, Response } from 'express';

export interface IBodyNewTeam {
  teamName: string
}

export interface ITeam extends IBodyNewTeam {
  id: number;
}

interface ITeamsService {
  getAll(): Promise<ITeam[]>,
  getById(id: number | string): Promise<ITeam>,
  // getAllWithFilter(ids: (number | string)[]): Promise<ITeam[]>
}

export interface ITeamController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
  getById(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
}

export default ITeamsService;
