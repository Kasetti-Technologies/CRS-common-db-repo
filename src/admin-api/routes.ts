import { Router } from 'express'

import vendorRoutes from './modules/vendor/vendor.routes'
import centerRoutes from './modules/center/center.routes'


const router = Router()

router.use('/vendors', vendorRoutes)
router.use('/centers', centerRoutes)

export default router
