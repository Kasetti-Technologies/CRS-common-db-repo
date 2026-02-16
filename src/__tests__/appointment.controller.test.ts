import request from 'supertest'
import express from 'express'

jest.mock('../../prisma', () => ({
  prisma: {
    appointment: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}))

import { prisma } from '../../prisma'
import appointmentRoutes from '../admin-api/modules/appointment/appointment.routes'
import { AppointmentStatus } from '../__mocks__/generated/prisma/client'

const app = express()
app.use(express.json())
app.use('/appointments', appointmentRoutes)

describe('Appointment Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST /appointments/block should block appointment', async () => {
    ;(prisma.appointment.create as jest.Mock).mockResolvedValue({
      id: 'a1',
      status: AppointmentStatus.BLOCKED,
    })

    const res = await request(app)
      .post('/appointments/block')
      .send({ centerId: 'c1' })

    expect(res.status).toBe(201)
    expect(res.body.status).toBe(AppointmentStatus.BLOCKED)
  })

  it('PATCH /appointments/:id/cancel should cancel appointment', async () => {
    ;(prisma.appointment.update as jest.Mock).mockResolvedValue({
      id: 'a1',
      status: AppointmentStatus.CANCELLED,
    })

    const res = await request(app)
      .patch('/appointments/a1/cancel')

    expect(res.status).toBe(200)
    expect(res.body.status).toBe(AppointmentStatus.CANCELLED)
  })

  it('should return 500 if prisma fails', async () => {
    ;(prisma.appointment.create as jest.Mock).mockRejectedValue(
      new Error('DB Error')
    )

    const res = await request(app)
      .post('/appointments/block')
      .send({ centerId: 'c1' })

    expect(res.status).toBe(500)
  })
})
