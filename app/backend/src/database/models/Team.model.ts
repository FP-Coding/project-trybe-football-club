import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class Team extends Model {
  declare readonly id: number;

  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
  underscored: true,
});

export default Team;
