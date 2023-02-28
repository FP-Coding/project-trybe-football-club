import { NextFunction, Request, Response } from 'express';

export type TInProgress = string | undefined;

export interface IMatchScore {
  awayTeamGoals: number,
  homeTeamGoals: number
}

export interface INewMatch extends IMatchScore {
  homeTeamId: number,
  awayTeamId: number,
}

export interface ITeamName {
  teamName: string
}

export interface IMatch extends INewMatch {
  id: number,
  homeTeam: ITeamName,
  awayTeam: ITeamName
  inProgress: boolean,
}

export interface IMatchLazy extends INewMatch {
  id: number,
  inProgress: boolean,
}

export default interface IMatchController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void | Response>,
  finishMatch(req: Request, res: Response, next: NextFunction): Promise<void | Response>,
  changeScore(req: Request, res: Response, next: NextFunction): Promise<void | Response>,
  createMatch(req: Request, res: Response, next: NextFunction): Promise<void | Response>
}
export interface IMatchService {
  getAll(filter?: string): Promise<IMatch[]>,
  finishMatch(id: string | number): Promise<boolean>,
  getById(id: string | number): Promise<INewMatch>,
  changeScore(id: string | number, newScore: IMatchScore): Promise<IMatchScore>,
  createMatch(newMatch: INewMatch): Promise<IMatchLazy>,
}
