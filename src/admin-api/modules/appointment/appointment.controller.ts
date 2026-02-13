import { Request, Response } from 'express'
import * as s from './appointment.service'

export const block = async (req: Request, res: Response) =>
  res.status(201).json(await s.block(req.body))

export const cancel = async (req: Request, res: Response) =>
  res.json(await s.cancel(req.params.id as string))
