import { Request, Response } from 'express'
import * as s from './operator.service'

export const create = async (req: Request, res: Response) =>
  res.status(201).json(await s.create(req.body))

export const addLeave = async (req: Request, res: Response) =>
  res.status(201).json(await s.addLeave(req.params.id as string, req.body.date))
