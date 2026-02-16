import request from 'supertest'
import express from 'express'

jest.mock('../../prisma', () => ({
  prisma: {
    availabilityRule: {
      create: jest.fn(),
    },
  },
}))

import { prisma } from '../../prisma'
import availabilityRoutes from '../admin-api/modules/availability/availability.routes'

const app = express()
app.use(express.json())
app.use('/availability', availabilityRoutes)

describe('Availability Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST /availability should create availability rule', async () => {
    ;(prisma.availabilityRule.create as jest.Mock).mockResolvedValue({
      id: 'a1',
    })

    const res = await request(app)
      .post('/availability')
      .send({
        centerId: 'c1',
        dayOfWeek: 1,
        startTime: '09:00',
        endTime: '17:00',
      })

    expect(res.status).toBe(201)
    expect(res.body.id).toBe('a1')
  })

  it('should return 500 if prisma fails', async () => {
    ;(prisma.availabilityRule.create as jest.Mock).mockRejectedValue(
      new Error('DB Error')
    )

    const res = await request(app)
      .post('/availability')
      .send({ centerId: 'c1' })

    expect(res.status).toBe(500)
  })
})
