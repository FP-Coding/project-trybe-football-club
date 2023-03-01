import { NextFunction, Request, Response } from 'express';
import { IBodyNewTeam } from '../Team/ITeam';

interface ILeaderboardHome {
  homeTeamId: number,
  homeTeam: IBodyNewTeam
}

interface ILeaderboardAway {
  awayTeamId: number,
  awayTeam: IBodyNewTeam
}

export interface ILeaderboardVictoriesHome extends ILeaderboardHome {
  totalVictories: number,
}

export interface ILeaderboardVictoriesAway extends ILeaderboardAway {
  totalVictories: number,
}

export interface ILeaderboardLossesHome extends ILeaderboardHome {
  totalLosses: number,
}

export interface ILeaderboardLossesAway extends ILeaderboardAway {
  totalLosses: number,
}

export interface ILeaderboardDrawsHome extends ILeaderboardHome {
  totalDraws: number,
}

export interface ILeaderboardDrawsAway extends ILeaderboardAway {
  totalDraws: number,
}

export default interface ILeaderboard {
  name: string,
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  totalPoints: number,
  totalGames: number,
  goalsBalance: number,
  efficiency: string
}

interface ILeaderboardInfo {
  totalGames: number,
  goalsFavor: number,
  goalsOwn: number,
}

export interface ILeaderboardInfoHome extends ILeaderboardInfo {
  homeTeamId: number,
  homeTeam: IBodyNewTeam,
}

export interface ILeaderboardInfoAway extends ILeaderboardInfo {
  awayTeamId: number,
  awayTeam: IBodyNewTeam
}

export interface IResponseGetInfoMatchesHome {
  dataValues: {
    homeTeam: { dataValues: IBodyNewTeam }
    homeTeamId: number,
    goalsFavor: string,
    goalsOwn: string,
    totalGames: number,
  }
}

export interface IResponseGetInfoMatchesAway {
  dataValues: {
    awayTeam: { dataValues: IBodyNewTeam }
    awayTeamId: number,
    goalsFavor: string,
    goalsOwn: string,
    totalGames: number,
  }
}

export interface IResponseGetVictoriesHome {
  dataValues: {
    homeTeam: { dataValues: IBodyNewTeam }
    totalVictories: number,
    homeTeamId: number
  }
}

export interface IResponseGetVictoriesAway {
  dataValues: {
    awayTeam: { dataValues: IBodyNewTeam }
    totalVictories: number,
    awayTeamId: number
  }
}

export interface IResponseGetDrawsHome {
  dataValues: {
    homeTeam: { dataValues: IBodyNewTeam }
    totalDraws: number,
    homeTeamId: number
  }
}

export interface IResponseGetDrawsAway {
  dataValues: {
    awayTeam: { dataValues: IBodyNewTeam }
    totalDraws: number,
    awayTeamId: number
  }
}

export interface IResponseGetLossesHome {
  dataValues: {
    homeTeam: { dataValues: IBodyNewTeam }
    totalLosses: number,
    homeTeamId: number
  }
}

export interface IResponseGetLossesAway {
  dataValues: {
    awayTeam: { dataValues: IBodyNewTeam }
    totalLosses: number,
    awayTeamId: number
  }
}

export interface ILeaderboardService {
  getVictories(filter: string): Promise<ILeaderboardVictoriesHome[] | ILeaderboardVictoriesAway[]>,
  getLosses(filter: string): Promise<ILeaderboardLossesHome[] | ILeaderboardLossesAway[]>,
  getDraws(filter: string): Promise<ILeaderboardDrawsHome[] | ILeaderboardDrawsAway[]>,
  getAllHome(): Promise<ILeaderboard[]>,
  getAllAway(): Promise<ILeaderboard[]>,
  getAll(): Promise<ILeaderboard[]>,
}

export interface ILeaderboardController {
  getAllHome(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
  getAllAway(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
  getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>,
}

export type TVictoryQuantH = ILeaderboardVictoriesHome | undefined;
export type TDrawQuantH = ILeaderboardDrawsHome | undefined;
export type TLossQuantH = ILeaderboardLossesHome | undefined;
export type TVictoryQuantA = ILeaderboardVictoriesAway | undefined;
export type TDrawQuantA = ILeaderboardDrawsAway | undefined;
export type TLossQuantA = ILeaderboardLossesAway | undefined;
