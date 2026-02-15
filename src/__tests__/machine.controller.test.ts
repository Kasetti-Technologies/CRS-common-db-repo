import request from 'supertest'
import express from 'express'

jest.mock('../../prisma', () => ({
  prisma: {
    machine: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}))

import { prisma } from '../../prisma'
import machineRoutes from '../admin-api/modules/machine/machine.routes'

const app = express()
app.use(express.json())
app.use('/machines', machineRoutes)

describe('Machine Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST /machines should create machine', async () => {
    ;(prisma.machine.create as jest.Mock).mockResolvedValue({
      id: 'mac1',
      name: 'MRI-1'
    })

    const res = await request(app)
      .post('/machines')
      .send({ name: 'MRI-1' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('MRI-1')
  })

//
  it('PATCH /machines/:id should update machine', async () => {
    ;(prisma.machine.update as jest.Mock).mockResolvedValue({
      id: 'mac1',
      centerId: 'c1',
      modalityId: 'm1',
      name: 'MRI-Updated',
      dailyCapacity: 20,
    })
  
    const res = await request(app)
      .patch('/machines/mac1')
      .send({ name: 'MRI-Updated' })
  
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('MRI-Updated')
  })
//

  it('should return 500 if prisma fails', async () => {
    ;(prisma.machine.create as jest.Mock).mockRejectedValue(new Error('DB Error'))

    const res = await request(app)
      .post('/machines')
      .send({ name: 'MRI-1' })

    expect(res.status).toBe(500)
  })
})
