import { Request, Response } from 'express'
import * as mtds from './modality.test.duration.service'

export const create = async (req: Request, res: Response) => {
  try {
    const result = await mtds.create(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create ModalityTestDuration' })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const result = await mtds.update(req.params.id as string, req.body)
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update ModalityTestDuration' })
  }
}
