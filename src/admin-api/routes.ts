import { Router } from 'express'

import vendorRoutes from './modules/vendor/vendor.routes'

const router = Router()

router.use('/vendors', vendorRoutes)

export default router
