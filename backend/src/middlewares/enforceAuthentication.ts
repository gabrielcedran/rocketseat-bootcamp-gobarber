import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function enforceAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error("JWT Token Missing.");
  }

  const [, jwtToken] = authHeader.split(" ");

  try {
    const decoded = verify(jwtToken, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error("Invalid JWT Token");
  }
}
