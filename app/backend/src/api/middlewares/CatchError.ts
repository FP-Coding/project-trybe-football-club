import { NextFunction, Request, Response } from 'express';
import IError from '../interfaces/Error/IError';

class ErrorHandler {
  public static handler(err: Error, _req: Request, res: Response, _next: NextFunction): Response {
    const error = err as unknown as IError;
    if (error.status) return res.status(error.status).json({ message: error.message });
    return res.status(500).json({ message: 'Internal error' });
  }
}

export default ErrorHandler;
