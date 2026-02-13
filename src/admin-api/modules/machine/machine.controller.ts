import { Request, Response } from 'express'
import * as s from './machine.service'

export const create = async (req: Request, res: Response) =>
  res.status(201).json(await s.create(req.body))

export const update = async (req: Request, res: Response) =>
  res.json(await s.update(req.params.id as string, req.body))
