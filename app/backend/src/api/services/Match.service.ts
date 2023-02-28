import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team.model';
import Match from '../../database/models/Match.model';
import {
  IMatch,
  IMatchLazy,
  IMatchScore,
  IMatchService,
  INewMatch,
} from '../interfaces/Matches/IMatches';
import validateId, {
  validateNewMatchFields,
  validateScoreFields,
} from './validators/validateFields';
import NotFound from '../errors/NotFound';
import BadRequest from '../errors/BadRequest';
import TeamService from './Team.service';
import InvalidValues from '../errors/InvalidValues';

class MatchService implements IMatchService {
  protected model: ModelStatic<Match> = Match;

  async getAll(filter?: string | undefined): Promise<IMatch[]> {
    const whereCondition = filter ? { inProgress: JSON.parse(filter) } : {};
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: whereCondition,
    });
    const matchesFormated = matches.map(
      ({
        dataValues: {
          homeTeam: { dataValues: homeTeam },
          awayTeam: { dataValues: awayTeam },
          ...infoMatches
        },
      }) => ({ ...infoMatches, homeTeam, awayTeam }),
    );
    return matchesFormated;
  }

  async getById(id: string | number): Promise<INewMatch> {
    validateId(id);
    const match = await this.model.findByPk(id);
    if (!match) throw new NotFound('Match not found');
    return match;
  }

  async finishMatch(id: string | number): Promise<boolean> {
    await this.getById(id);
    const [affectedRows] = await this.model
      .update({ inProgress: false }, { where: { id } });
    return affectedRows === 1;
  }

  async changeScore(
    id: string | number,
    { awayTeamGoals, homeTeamGoals }: IMatchScore,
  ): Promise<IMatchScore> {
    await this.getById(id);
    validateScoreFields({ awayTeamGoals, homeTeamGoals });
    const [affectedRows] = await this.model
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    if (affectedRows !== 1) {
      throw new BadRequest('Score has no changed, the new value is the same as the current one');
    }
    return { homeTeamGoals, awayTeamGoals };
  }

  async createMatch(newMatch: INewMatch): Promise<IMatchLazy> {
    validateNewMatchFields(newMatch);
    if (newMatch.awayTeamId === newMatch.homeTeamId) {
      throw new InvalidValues('It is not possible to create a match with two equal teams');
    }
    const teams = await new TeamService()
      .getAllWithFilter([Number(newMatch.awayTeamId), Number(newMatch.homeTeamId)]);
    if (teams.length !== 2) throw new NotFound('There is no team with such id!');
    const { dataValues: dataNewMatch } = await this.model.create({ ...newMatch, inProgress: true });
    return dataNewMatch;
  }
}

export default MatchService;
