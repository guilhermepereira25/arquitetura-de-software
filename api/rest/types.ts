import type { Request } from 'express';

export interface AppRequest extends Request {
  hateoasBase?: string;
}