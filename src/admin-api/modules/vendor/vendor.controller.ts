import { Request, Response } from 'express'
import * as s from './vendor.service'

export const createVendor = async (req: Request, res: Response) =>
  res.status(201).json(await s.createVendor(req.body))

export const createVendorAdmin = async (req: Request, res: Response) =>
  res.status(201).json(await s.createVendorAdmin(req.params.vendorId as string, req.body))

export const listVendors = async (_: Request, res: Response) =>
  res.json(await s.listVendors())
