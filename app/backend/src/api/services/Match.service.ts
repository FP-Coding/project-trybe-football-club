import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team.model';
import Match from '../../database/models/Match.model';
import { IMatch, IMatchService } from '../interfaces/Matches/IMatches';

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
}

export default MatchService;
