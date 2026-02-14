import { Request, Response } from 'express'
import * as s from './center.service'

export const createCenter = async (req: Request, res: Response) => {
  try {
    const result = await s.createCenter(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create center' })
  }
}

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const result = await s.updateStatus(
      req.params.centerId as string,
      req.body.isActive
    )
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update center status' })
  }
}

export const assignAdmin = async (req: Request, res: Response) => {
  try {
    const result = await s.assignAdmin(
      req.params.centerId as string,
      req.body
    )
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to assign branch admin' })
  }
}
