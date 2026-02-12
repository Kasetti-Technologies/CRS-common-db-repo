import { Router } from 'express'
import * as c from './center.controller'

const r = Router()
r.post('/', c.createCenter)
r.patch('/:centerId/status', c.updateStatus)
r.post('/:centerId/branch-admin', c.assignAdmin)

export default r
