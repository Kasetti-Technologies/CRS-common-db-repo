import { Request, Response } from 'express'
import * as s from './appointment.service'

export const block = async (req: Request, res: Response) => {
  try {
    const result = await s.block(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to block appointment' })
  }
}

export const cancel = async (req: Request, res: Response) => {
  try {
    const result = await s.cancel(req.params.id as string)
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to cancel appointment' })
  }
}
