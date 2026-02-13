import request from 'supertest'
import express from 'express'

jest.mock('../../prisma', () => ({
  prisma: {
    vendor: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
    vendorAdmin: {
      create: jest.fn(),
    },
  },
}))

import { prisma } from '../../prisma'
import vendorRoutes from '../admin-api/modules/vendor/vendor.routes'

const app = express()
app.use(express.json())
app.use('/vendors', vendorRoutes)

describe('Vendor Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST /vendors should create vendor', async () => {
    ;(prisma.vendor.create as jest.Mock).mockResolvedValue({
      id: 'v1',
      name: 'Apollo'
    })

    const res = await request(app)
      .post('/vendors')
      .send({ name: 'Apollo' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Apollo')
  })

  it('POST /vendors/:vendorId/admins should create admin', async () => {
    ;(prisma.vendorAdmin.create as jest.Mock).mockResolvedValue({
      id: 'a1',
      name: 'Admin'
    })

    const res = await request(app)
      .post('/vendors/v1/admins')
      .send({ name: 'Admin', email: 'admin@test.com' })

    expect(res.status).toBe(201)
  })

  it('GET /vendors should return vendors', async () => {
    ;(prisma.vendor.findMany as jest.Mock).mockResolvedValue([
      { id: 'v1', name: 'Apollo' }
    ])

    const res = await request(app).get('/vendors')

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
  })

  it('should return 500 on failure', async () => {
    ;(prisma.vendor.create as jest.Mock).mockRejectedValue(new Error('DB Error'))

    const res = await request(app)
      .post('/vendors')
      .send({ name: 'Apollo' })

    expect(res.status).toBe(500)
  })
})
