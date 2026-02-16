import request from 'supertest'
import express from 'express'

jest.mock('../../prisma', () => ({
  prisma: {
    operator: {
      create: jest.fn(),
    },
    operatorLeave: {
      create: jest.fn(),
    },
  },
}))

import { prisma } from '../../prisma'
import operatorRoutes from '../admin-api/modules/operator/operator.routes'

const app = express()
app.use(express.json())
app.use('/operators', operatorRoutes)

describe('Operator Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST /operators should create operator', async () => {
    ;(prisma.operator.create as jest.Mock).mockResolvedValue({
      id: 'op1',
      name: 'John',
    })

    const res = await request(app)
      .post('/operators')
      .send({ name: 'John', centerId: 'c1', modalityId: 'm1' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('John')
  })

  it('POST /operators/:id/leaves should add leave', async () => {
    ;(prisma.operatorLeave.create as jest.Mock).mockResolvedValue({
      id: 'l1',
    })

    const res = await request(app)
      .post('/operators/op1/leaves')
      .send({ date: '2026-02-20' })

    expect(res.status).toBe(201)
  })

  it('should return 500 if prisma fails', async () => {
    ;(prisma.operator.create as jest.Mock).mockRejectedValue(new Error('DB Error'))

    const res = await request(app)
      .post('/operators')
      .send({ name: 'John' })

    expect(res.status).toBe(500)
  })
})
