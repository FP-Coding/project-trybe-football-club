import { Op, ModelStatic } from 'sequelize';
import Team from '../../database/models/Team.model';
import NotFound from '../errors/NotFound';
import ITeamsService, { ITeam } from '../interfaces/Team/ITeam';
import validateId from './validators/validateFields';

class TeamService implements ITeamsService {
  protected model: ModelStatic<Team> = Team;
  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll({ order: [['id', 'ASC']] });
    return teams;
  }

  async getById(id: string | number): Promise<ITeam> {
    validateId(id);
    const team = await this.model.findByPk(id);
    if (!team) throw new NotFound('Team not found');
    return team;
  }

  async getAllWithFilter(ids: (number | string)[]): Promise<ITeam[]> {
    ids.forEach((id) => validateId(id));
    const teams = await this.model.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    const teamsFormated = teams.map(({ dataValues }) => dataValues);
    return teamsFormated;
  }
}

export default TeamService;
