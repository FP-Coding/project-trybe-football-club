import { NextFunction, Request, Response } from 'express';
import TokenError from '../errors/TokenError';
import { decodeToken } from '../utils/JWT';

class VerifyToken {
  public static verify(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers.authorization;
    if (!token) throw new TokenError('Token not found');
    decodeToken(token);
    return next();
  }
}

export default VerifyToken;
