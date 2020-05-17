import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import ApplicationError from "@shared/errors/ApplicationError";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function enforceAuthentication(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new ApplicationError("JWT Token Missing.", 400);
  }

  const [, jwtToken] = authHeader.split(" ");

  const decoded = verify(jwtToken, authConfig.jwt.secret);

  const { sub } = decoded as ITokenPayload;
  request.user = {
    id: sub,
  };

  return next();
}
