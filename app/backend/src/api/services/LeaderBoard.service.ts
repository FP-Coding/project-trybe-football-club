import { Op, ModelStatic } from 'sequelize';
import sequelize = require('sequelize');
import Match from '../../database/models/Match.model';
import Team from '../../database/models/Team.model';
import ILeaderboard, {
  ILeaderboardDrawsAway,
  ILeaderboardDrawsHome,
  ILeaderboardInfoAway,
  ILeaderboardInfoHome,
  ILeaderboardLossesAway,
  ILeaderboardLossesHome,
  ILeaderboardService,
  ILeaderboardVictoriesAway,
  ILeaderboardVictoriesHome,
  TDrawQuantA,
  TDrawQuantH,
  TLossQuantA,
  TLossQuantH,
  TVictoryQuantA,
  TVictoryQuantH,
} from '../interfaces/Leaderboard/ILeaderboard';
import concentrateTeams from '../utils/concentrateTeams';
import calculatePoints,
{ calculateSucessRate, orderLeaderboard } from '../utils/manipulateLeaderBoard';
import objectControlSequelize,
{
  normalizeSequelizeResponseAwayDraws,
  normalizeSequelizeResponseAwayLosses,
  normalizeSequelizeResponseAwayVictories,
  normalizeSequelizeResponseGetAllAway,
  normalizeSequelizeResponseGetAllHome,
  normalizeSequelizeResponseHomeDraws,
  normalizeSequelizeResponseHomeLosses,
  normalizeSequelizeResponseHomeVictories,
} from '../utils/normalizeSequelize';

class LeaderBoardService implements ILeaderboardService {
  protected teamModel: ModelStatic<Team> = Team;

  protected matchModel: ModelStatic<Match> = Match;

  async getVictories(filter: 'home' | 'away'):
  Promise<ILeaderboardVictoriesHome[] | ILeaderboardVictoriesAway[]> {
    const awayOrHome = objectControlSequelize(filter);

    const victories = await this.matchModel.findAll({
      attributes: [
        awayOrHome.id,
        [sequelize.fn('COUNT', sequelize.col(awayOrHome.defensorGoals)), 'totalVictories'],
      ],
      group: [awayOrHome.id],
      include: { model: Team, as: awayOrHome.as, attributes: { exclude: ['id'] } },
      where: {
        totalVictories: sequelize.where(sequelize.col(awayOrHome.defensorGoals), {
          [Op.gt]: sequelize.col(awayOrHome.adversaryGoals) }),
        inProgress: false,
      },
    });
    return filter === 'home' ? normalizeSequelizeResponseHomeVictories(victories)
      : normalizeSequelizeResponseAwayVictories(victories);
  }

  async getLosses(filter: 'home' | 'away'):
  Promise<ILeaderboardLossesHome[] | ILeaderboardLossesAway[]> {
    const awayOrHome = objectControlSequelize(filter);
    const losses = await this.matchModel.findAll({
      attributes: [
        awayOrHome.id,
        [sequelize.fn('COUNT', sequelize.col(awayOrHome.adversaryGoals)), 'totalLosses'],
      ],
      group: [awayOrHome.id],
      include: { model: Team, as: awayOrHome.as, attributes: { exclude: ['id'] },
      },
      where: {
        totalLosses: sequelize.where(sequelize.col(awayOrHome.adversaryGoals), {
          [Op.gt]: sequelize.col(awayOrHome.defensorGoals),
        }),
        inProgress: false },
    });
    return filter === 'home' ? normalizeSequelizeResponseHomeLosses(losses)
      : normalizeSequelizeResponseAwayLosses(losses);
  }

  async getDraws(filter: 'home' | 'away'):
  Promise<ILeaderboardDrawsHome[] | ILeaderboardDrawsAway[]> {
    const awayOrHome = objectControlSequelize(filter);
    const draws = await this.matchModel.findAll({
      attributes: [
        awayOrHome.id,
        [sequelize.fn('COUNT', sequelize.col(awayOrHome.adversaryGoals)), 'totalDraws'],
      ],
      group: [awayOrHome.id],
      include: { model: Team, as: awayOrHome.as, attributes: { exclude: ['id'] } },
      where: {
        totalDraws: sequelize.where(sequelize.col(awayOrHome.adversaryGoals), {
          [Op.eq]: sequelize.col(awayOrHome.defensorGoals) }),
        inProgress: false },
    });
    return filter === 'home' ? normalizeSequelizeResponseHomeDraws(draws)
      : normalizeSequelizeResponseAwayDraws(draws);
  }

  static getInfosMatchesHome(
    wins: (ILeaderboardVictoriesHome)[],
    draws: ILeaderboardDrawsHome[],
    losses: ILeaderboardLossesHome[],
    homeTeamIdMap: number,
  ) {
    const winsQuant: TVictoryQuantH = wins.find(({ homeTeamId }) => homeTeamIdMap === homeTeamId);
    const drawQuant: TDrawQuantH = draws.find(({ homeTeamId }) => homeTeamIdMap === homeTeamId);
    const lossQuant: TLossQuantH = losses.find(({ homeTeamId }) => homeTeamIdMap === homeTeamId);
    const totalVictories = winsQuant?.totalVictories || 0;
    const totalDraws = drawQuant?.totalDraws || 0;
    const totalLosses = lossQuant?.totalLosses || 0;
    const totalPoints = calculatePoints(totalVictories, totalDraws);
    return { totalVictories, totalDraws, totalLosses, totalPoints };
  }

  static normalizeGetAllHome(
    matches: ILeaderboardInfoHome[],
    wins: ILeaderboardVictoriesHome[],
    draws: ILeaderboardDrawsHome[],
    losses: ILeaderboardLossesHome[],
  ) {
    const leaderboard = matches.map(({ homeTeamId, goalsFavor, goalsOwn, totalGames,
      homeTeam: { teamName: name },
    }: ILeaderboardInfoHome) => {
      const { totalPoints, ...r } = LeaderBoardService
        .getInfosMatchesHome(wins, draws, losses, homeTeamId);
      const efficiency = calculateSucessRate(totalPoints, totalGames);
      const goalsBalance = goalsFavor - goalsOwn;
      const info = { name, goalsFavor, goalsOwn, ...r, totalPoints };
      const info2 = { totalGames, goalsBalance, efficiency };
      return { ...info, ...info2 };
    });
    return leaderboard;
  }

  static getInfosMatchesAway(
    wins: ILeaderboardVictoriesAway[],
    draws: ILeaderboardDrawsAway[],
    losses: ILeaderboardLossesAway[],
    awayTeamIdMap: number,
  ) {
    const winsQuant: TVictoryQuantA = wins.find(({ awayTeamId }) => awayTeamIdMap === awayTeamId);
    const drawQuant: TDrawQuantA = draws.find(({ awayTeamId }) => awayTeamIdMap === awayTeamId);
    const lossQuant: TLossQuantA = losses.find(({ awayTeamId }) => awayTeamIdMap === awayTeamId);
    const totalVictories = winsQuant?.totalVictories || 0;
    const totalDraws = drawQuant?.totalDraws || 0;
    const totalLosses = lossQuant?.totalLosses || 0;
    const totalPoints = calculatePoints(totalVictories, totalDraws);
    return { totalVictories, totalDraws, totalLosses, totalPoints };
  }

  static normalizeGetAllAway(
    matches: ILeaderboardInfoAway[],
    wins: ILeaderboardVictoriesAway[],
    draws: ILeaderboardDrawsAway[],
    losses: ILeaderboardLossesAway[],
  ) {
    const leaderboard = matches.map(({ awayTeamId, goalsFavor, goalsOwn, totalGames,
      awayTeam: { teamName: name },
    }: ILeaderboardInfoAway) => {
      const { totalPoints, ...r } = LeaderBoardService
        .getInfosMatchesAway(wins, draws, losses, awayTeamId);
      const efficiency = calculateSucessRate(totalPoints, totalGames);
      const goalsBalance = goalsFavor - goalsOwn;
      const info = { name, goalsFavor, goalsOwn, ...r, totalPoints };
      const info2 = { totalGames, goalsBalance, efficiency };
      return { ...info, ...info2 };
    });
    return leaderboard;
  }

  async getAllHome(): Promise<ILeaderboard[]> {
    const matches = await this.matchModel.findAll({
      attributes: [
        'homeTeamId',
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.fn('COUNT', sequelize.col('`Match`.`id`')), 'totalGames'],
      ],
      group: ['homeTeamId'],
      include: { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
      where: { inProgress: false },
    });

    const matchArray = normalizeSequelizeResponseGetAllHome(matches);

    const wins = await this.getVictories('home') as ILeaderboardVictoriesHome[];
    const losses = await this.getLosses('home') as ILeaderboardLossesHome[];
    const draws = await this.getDraws('home') as ILeaderboardDrawsHome[];

    const leaderboard = LeaderBoardService.normalizeGetAllHome(matchArray, wins, draws, losses);
    const ordered = orderLeaderboard(leaderboard);

    return ordered;
  }

  async getAllAway(): Promise<ILeaderboard[]> {
    const matches = await this.matchModel.findAll({
      attributes: [
        'awayTeamId',
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsOwn'],
        [sequelize.fn('COUNT', sequelize.col('`Match`.`id`')), 'totalGames'],
      ],
      group: ['awayTeamId'],
      include: { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      where: { inProgress: false },
    });

    const matchArray = normalizeSequelizeResponseGetAllAway(matches);

    const wins = await this.getVictories('away') as ILeaderboardVictoriesAway[];

    const losses = await this.getLosses('away') as ILeaderboardLossesAway[];

    const draws = await this.getDraws('away') as ILeaderboardDrawsAway[];

    const leaderboard = LeaderBoardService.normalizeGetAllAway(matchArray, wins, draws, losses);
    const ordered = orderLeaderboard(leaderboard);

    return ordered;
  }

  async getAll(): Promise<ILeaderboard[]> {
    const teamsHome = await this.getAllHome();
    const teamsAway = await this.getAllAway();

    const allTeams = concentrateTeams(teamsHome, teamsAway);
    return orderLeaderboard(allTeams);
  }
}

export default LeaderBoardService;
