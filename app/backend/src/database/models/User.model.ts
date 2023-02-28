import { Model, STRING, INTEGER } from 'sequelize';
import db from '.';

class User extends Model {
  declare readonly id: number;

  declare username: string;

  declare role: string;

  declare email: string;

  declare password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  sequelize: db,
  modelName: 'User',
  timestamps: false,
  tableName: 'users',
  underscored: true,
});

export default User;
