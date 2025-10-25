import { Request, Response, NextFunction } from 'express';

export const hateoasMiddleware = (req: Request, res: Response, next: NextFunction) => {
  (req as any).hateoasBase = `${req.protocol}://${req.get('host')}`;
  next();
};