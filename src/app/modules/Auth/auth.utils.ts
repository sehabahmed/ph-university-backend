import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  if (!secret) {
    throw new AppError(httpStatus.NOT_FOUND, 'JWT Secret is not provided');
  }

  return jwt.sign(jwtPayload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
