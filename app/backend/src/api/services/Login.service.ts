import { ModelStatic } from 'sequelize';
import User from '../../database/models/User.model';
import NotFound from '../errors/NotFound';
import TokenError from '../errors/TokenError';
import { ILoginService } from '../interfaces/Login/ILogin';
import IUser, { IUserLogin, IUserRole } from '../interfaces/User/IUser';
import { decodeHash } from '../utils/crypto';
import generateToken from '../utils/JWT';
import { validateLoginFields } from './validators/validateFields';

class LoginService implements ILoginService {
  protected model: ModelStatic<User> = User;

  async getRole({ email }: IUser): Promise<IUserRole> {
    const userFounded = await this.model.findOne({ where: { email } });
    if (!userFounded) throw new NotFound('Token must be a valid token');
    return { role: userFounded.role };
  }

  async login({ password, email }: IUserLogin): Promise<string> {
    validateLoginFields({ password, email });
    const user = await this.model.findOne({ where: { email } });
    if (!user) {
      throw new TokenError('Invalid email or password');
    }
    const verifationPassword = await decodeHash(password, user.password);
    if (!verifationPassword) throw new TokenError('Invalid email or password');
    const { dataValues: { password: p, ...info } } = user;
    return generateToken(info);
  }
}

export default LoginService;
