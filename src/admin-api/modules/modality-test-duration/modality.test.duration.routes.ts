import { Router } from 'express'
import * as c from './modality.test.duration.controller'

const r = Router()
r.post('/', c.create)
r.patch('/:id', c.update)

export default r