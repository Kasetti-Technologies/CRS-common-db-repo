import { Request, Response } from 'express'
import * as s from './machine.service'

export const create = async (req: Request, res: Response) => {
  try {
    const result = await s.create(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create machine' })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const result = await s.update(req.params.id as string, req.body)
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update machine' })
  }
}
