import { Request, Response } from 'express'
import * as s from './operator.service'

export const create = async (req: Request, res: Response) => {
  try {
    const result = await s.create(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create operator' })
  }
}

export const addLeave = async (req: Request, res: Response) => {
  try {
    const result = await s.addLeave(
      req.params.id as string,
      req.body.date
    )
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to add operator leave' })
  }
}
