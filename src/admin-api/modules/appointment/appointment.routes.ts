import { Router } from 'express'
import * as c from './appointment.controller'

const r = Router()
r.post('/block', c.block)
r.patch('/:id/cancel', c.cancel)

export default r
