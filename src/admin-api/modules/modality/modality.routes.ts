import { Router } from 'express'
import * as c from './modality.controller'

const r = Router()
r.post('/', c.create)
r.get('/', c.list)

export default r
