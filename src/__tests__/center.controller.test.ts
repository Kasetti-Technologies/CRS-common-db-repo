import request from 'supertest'
import express from 'express'

jest.mock('../../prisma', () => ({
  prisma: {
    center: {
      create: jest.fn(),
      update: jest.fn(),
    },
    branchAdmin: {
      create: jest.fn(),
    },
  },
}))

import { prisma } from '../../prisma'
import centerRoutes from '../admin-api/modules/center/center.routes'

const app = express()
app.use(express.json())
app.use('/centers', centerRoutes)

describe('Center Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST /centers should create center', async () => {
    ;(prisma.center.create as jest.Mock).mockResolvedValue({
      id: 'c1',
      name: 'Center A'
    })

    const res = await request(app)
      .post('/centers')
      .send({ name: 'Center A' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Center A')
  })

  it('PATCH /centers/:id/status should update status', async () => {
    ;(prisma.center.update as jest.Mock).mockResolvedValue({
      id: 'c1',
      isActive: false
    })

    const res = await request(app)
      .patch('/centers/c1/status')
      .send({ isActive: false })

    expect(res.status).toBe(200)
    expect(res.body.isActive).toBe(false)
  })

  it('POST /centers/:id/branch-admin should assign admin', async () => {
    ;(prisma.branchAdmin.create as jest.Mock).mockResolvedValue({
      id: 'b1',
      name: 'Branch Admin'
    })

    const res = await request(app)
      .post('/centers/c1/branch-admin')
      .send({ name: 'Branch Admin', email: 'admin@test.com' })

    expect(res.status).toBe(201)
  })

  it('should return 500 if prisma fails', async () => {
    ;(prisma.center.create as jest.Mock).mockRejectedValue(new Error('DB Error'))

    const res = await request(app)
      .post('/centers')
      .send({ name: 'Center A' })

    expect(res.status).toBe(500)
  })
})
