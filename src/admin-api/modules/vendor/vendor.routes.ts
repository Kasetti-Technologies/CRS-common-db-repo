import { Router } from 'express'
import * as c from './vendor.controller'

const r = Router()
r.post('/', c.createVendor)
r.post('/:vendorId/admins', c.createVendorAdmin)
r.get('/', c.listVendors)

export default r
