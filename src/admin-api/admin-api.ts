import { Router } from 'express'
import routes from './routes'

const router = Router()
router.use('/admin', routes)

export default router
