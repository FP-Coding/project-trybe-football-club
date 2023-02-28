import TokenError from '../../errors/TokenError';
import { IUserLogin } from '../../interfaces/User/IUser';
import BadRequest from '../../errors/BadRequest';
import idSchema, { loginSchema } from './schema';

const validateId = (id: (string | number)) => {
  const { error } = idSchema.validate(id);
  if (error) throw new BadRequest(error.message);
};

export const validateLoginFields = (userInfoLogin: IUserLogin) => {
  const { error } = loginSchema.validate(userInfoLogin);
  if (error) {
    if (error.message.includes('required')) throw new BadRequest('All fields must be filled');
    if (error.message.includes('valid') || error.message.includes('at least')) {
      throw new TokenError('Invalid email or password');
    }
  }
  if (userInfoLogin.email === '' || userInfoLogin.password === '') {
    throw new BadRequest('All fields must be filled');
  }
};

export default validateId;
