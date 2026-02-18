import { Request, Response } from 'express'
import * as cms from './center.modality.service'

export const create = async (req: Request, res: Response) => {
  try {
    const result = await cms.create(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create CenterModality' })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const result = await cms.update(req.params.id as string, req.body)
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update CenterModality' })
  }
}
