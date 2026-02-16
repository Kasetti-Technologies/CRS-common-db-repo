import { Request, Response } from 'express'
import * as s from './availability.service'

export const create = async (req: Request, res: Response) => {
  try {
    const result = await s.create(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create availability rule' })
  }
}
