import { Router } from 'express'
import * as c from './operator.controller'

const r = Router()
r.post('/', c.create)
r.post('/:id/leaves', c.addLeave)

export default r
