import { Request, Response } from 'express'
import * as s from './center.service'

export const createCenter = async (req: Request, res: Response) =>
  res.status(201).json(await s.createCenter(req.body))

export const updateStatus = async (req: Request, res: Response) =>
  res.json(await s.updateStatus(req.params.centerId as string, req.body.isActive))

export const assignAdmin = async (req: Request, res: Response) =>
  res.status(201).json(await s.assignAdmin(req.params.centerId as string, req.body))
