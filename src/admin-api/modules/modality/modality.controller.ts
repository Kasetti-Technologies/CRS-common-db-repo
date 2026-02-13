import { Request, Response } from 'express'
import * as s from './modality.service'

export const create = async (req: Request, res: Response) =>
  res.status(201).json(await s.create(req.body))

export const list = async (_: Request, res: Response) =>
  res.json(await s.list())
