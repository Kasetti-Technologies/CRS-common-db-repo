import { Request, Response } from 'express'
import * as s from './availability.service'

export const create = async (req: Request, res: Response) =>
  res.status(201).json(await s.create(req.body))
