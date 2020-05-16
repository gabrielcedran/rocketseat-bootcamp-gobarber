import { Request, Response, NextFunction } from "express";
import ApplicationError from "@shared/errors/ApplicationError";

export default function globalExceptionHandler(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response<{ message: string; statusCode: number }> {
  if (error instanceof ApplicationError) {
    return response
      .status(error.statusCode)
      .json({ message: error.message, statusCode: error.statusCode });
  }

  console.error(error);

  return response
    .status(500)
    .json({ message: "Something unexpected went wrong.", statusCode: 500 });
}
