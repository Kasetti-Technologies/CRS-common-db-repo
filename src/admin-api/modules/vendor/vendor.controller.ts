import { Request, Response } from 'express'
import * as s from './vendor.service'

export const createVendor = async (req: Request, res: Response) => {
  try {
    const result = await s.createVendor(req.body)
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create vendor' })
  }
}

export const createVendorAdmin = async (req: Request, res: Response) => {
  try {
    const result = await s.createVendorAdmin(
      req.params.vendorId as string,
      req.body
    )
    res.status(201).json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create vendor admin' })
  }
}

export const listVendors = async (_: Request, res: Response) => {
  try {
    const result = await s.listVendors()
    res.json(result)
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch vendors' })
  }
}
