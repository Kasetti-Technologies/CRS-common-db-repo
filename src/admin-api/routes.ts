import { Router } from 'express'

import vendorRoutes from './modules/vendor/vendor.routes'
import centerRoutes from './modules/center/center.routes'
import modalityRoutes from './modules/modality/modality.routes'
import machineRoutes from './modules/machine/machine.routes'
import operatorRoutes from './modules/operator/operator.routes'
import availabilityRoutes from './modules/availability/availability.routes'
import appointmentRoutes from './modules/appointment/appointment.routes'



const router = Router()

router.use('/vendors', vendorRoutes)
router.use('/centers', centerRoutes)
router.use('/modalities', modalityRoutes)
router.use('/machines', machineRoutes)
router.use('/operators', operatorRoutes)
router.use('/availability', availabilityRoutes)
router.use('/appointments', appointmentRoutes)



export default router
