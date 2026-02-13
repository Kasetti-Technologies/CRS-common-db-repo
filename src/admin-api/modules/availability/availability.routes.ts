import { Router } from 'express'
import * as c from './availability.controller'

const r = Router()
r.post('/', c.create)

export default r
