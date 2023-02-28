import {
  ILeaderboardDrawsAway,
  ILeaderboardDrawsHome,
  ILeaderboardInfoAway,
  ILeaderboardInfoHome,
  ILeaderboardLossesAway,
  ILeaderboardLossesHome,
  ILeaderboardVictoriesAway,
  ILeaderboardVictoriesHome,
  IResponseGetDrawsAway,
  IResponseGetDrawsHome,
  IResponseGetInfoMatchesAway,
  IResponseGetInfoMatchesHome,
  IResponseGetLossesAway,
  IResponseGetLossesHome,
  IResponseGetVictoriesAway,
  IResponseGetVictoriesHome,
} from '../interfaces/Leaderboard/ILeaderboard';

export const normalizeSequelizeResponseHomeVictories = (
  array: IResponseGetVictoriesHome[],
): ILeaderboardVictoriesHome[] => array.map(
  ({
    dataValues: {
      homeTeam: { dataValues: homeTeam },
      ...infoMatches
    },
  }: IResponseGetVictoriesHome) =>
    ({ ...infoMatches, homeTeam }),
);

export const normalizeSequelizeResponseAwayVictories = (
  array: IResponseGetVictoriesAway[],
): ILeaderboardVictoriesAway[] => array.map(
  ({
    dataValues: {
      awayTeam: { dataValues: awayTeam },
      ...infoMatches
    },
  }: IResponseGetVictoriesAway) =>
    ({ ...infoMatches, awayTeam }),
);

export const normalizeSequelizeResponseHomeDraws = (
  array: IResponseGetDrawsHome[],
): ILeaderboardDrawsHome[] => array.map(
  ({
    dataValues: {
      homeTeam: { dataValues: homeTeam },
      ...infoMatches
    },
  }: IResponseGetDrawsHome) =>
    ({ ...infoMatches, homeTeam }),
);

export const normalizeSequelizeResponseAwayDraws = (
  array: IResponseGetDrawsAway[],
): ILeaderboardDrawsAway[] => array.map(
  ({
    dataValues: {
      awayTeam: { dataValues: awayTeam },
      ...infoMatches
    },
  }: IResponseGetDrawsAway) =>
    ({ ...infoMatches, awayTeam }),
);

export const normalizeSequelizeResponseHomeLosses = (
  array: IResponseGetLossesHome[],
): ILeaderboardLossesHome[] => array.map(
  ({
    dataValues: {
      homeTeam: { dataValues: homeTeam },
      ...infoMatches
    },
  }: IResponseGetLossesHome) =>
    ({ ...infoMatches, homeTeam }),
);

export const normalizeSequelizeResponseAwayLosses = (
  array: IResponseGetLossesAway[],
): ILeaderboardLossesAway[] => array.map(
  ({
    dataValues: {
      awayTeam: { dataValues: awayTeam },
      ...infoMatches
    },
  }: IResponseGetLossesAway) =>
    ({ ...infoMatches, awayTeam }),
);

export const normalizeSequelizeResponseGetAllHome = (
  array: IResponseGetInfoMatchesHome[],
): ILeaderboardInfoHome[] => array.map(
  ({
    dataValues: {
      homeTeam: { dataValues: homeTeam },
      goalsFavor,
      goalsOwn,
      ...infoMatches
    },
  }:IResponseGetInfoMatchesHome) => ({ ...infoMatches,
    goalsFavor: Number(goalsFavor),
    goalsOwn: Number(goalsOwn),
    homeTeam }),
);

export const normalizeSequelizeResponseGetAllAway = (
  array: IResponseGetInfoMatchesAway[],
): ILeaderboardInfoAway[] => array.map(
  ({
    dataValues: {
      awayTeam: { dataValues: awayTeam },
      goalsFavor,
      goalsOwn,
      ...infoMatches
    },
  }:IResponseGetInfoMatchesAway) => ({
    ...infoMatches,
    goalsFavor: Number(goalsFavor),
    goalsOwn: Number(goalsOwn),
    awayTeam }),
);

const objectControlSequelize = (filter: 'home' | 'away') => {
  const awayOrHome = {
    id: '',
    defensorGoals: '',
    adversaryGoals: '',
    as: '',
  };

  if (filter === 'home') {
    awayOrHome.id = 'homeTeamId';
    awayOrHome.defensorGoals = 'home_team_goals';
    awayOrHome.as = 'homeTeam';
    awayOrHome.adversaryGoals = 'away_team_goals';
  } else {
    awayOrHome.id = 'awayTeamId';
    awayOrHome.defensorGoals = 'away_team_goals';
    awayOrHome.as = 'awayTeam';
    awayOrHome.adversaryGoals = 'home_team_goals';
  }

  return awayOrHome;
};

export default objectControlSequelize;
