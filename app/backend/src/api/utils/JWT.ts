import 'dotenv/config';
// import { sign, SignOptions, verify } from 'jsonwebtoken';
import * as JWT from 'jsonwebtoken';
import TokenError from '../errors/TokenError';
import IUser from '../interfaces/User/IUser';

const config: JWT.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '7d',
};
const secretJwt = process.env.JWT_SECRET || 'fpdsmecn';

const generateToken = (userInfo: IUser) => JWT.sign(userInfo, secretJwt, config);

export const decodeToken = (token: string) => {
  try {
    const decodeInfo = JWT.verify(token, secretJwt);
    return decodeInfo;
  } catch (error) {
    throw new TokenError('Token must be a valid token');
  }
};

export default generateToken;
