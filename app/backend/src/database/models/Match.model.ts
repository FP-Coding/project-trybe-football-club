import {
  Model, NUMBER, INTEGER, BOOLEAN,
} from 'sequelize';
import Team from './Team.model';
import db from '.';

class Match extends Model {
  declare readonly id: number;

  declare homeTeamId: number;

  declare homeTeamGoals: number;

  declare awayTeamId: number;

  declare awayTeamGoals:number;

  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: NUMBER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    references: {
      model: Team,
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
  timestamps: false,
  tableName: 'matches',
  underscored: true,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'id', as: 'homeMatches' });
Team.hasMany(Match, { foreignKey: 'id', as: 'awayMatches' });

export default Match;
