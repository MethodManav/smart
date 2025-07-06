// src/middleware/traceMiddleware.ts
import { Request, Response, NextFunction } from "express";
import logger from "../Logger";

export const traceMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { method, originalUrl } = req;
  const startTime = Date.now();

  logger.info(`Incoming -> ${method} ${originalUrl}`);

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(
      `Outgoing <- ${method} ${originalUrl} [${res.statusCode}] (${duration} ms)`
    );
  });

  next();
};
