import request from 'supertest'
import express from 'express'

jest.mock('../../prisma', () => ({
  prisma: {
    modality: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

import { prisma } from '../../prisma'
import modalityRoutes from '../admin-api/modules/modality/modality.routes'

const app = express()
app.use(express.json())
app.use('/modalities', modalityRoutes)

describe('Modality Controller API', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('POST /modalities should create modality', async () => {
    ;(prisma.modality.create as jest.Mock).mockResolvedValue({
      id: 'm1',
      name: 'MRI'
    })

    const res = await request(app)
      .post('/modalities')
      .send({ name: 'MRI' })

    expect(res.status).toBe(201)
    expect(res.body.name).toBe('MRI')
  })

  it('GET /modalities should return modalities', async () => {
    ;(prisma.modality.findMany as jest.Mock).mockResolvedValue([
      { id: 'm1', name: 'MRI' }
    ])

    const res = await request(app).get('/modalities')

    expect(res.status).toBe(200)
    expect(res.body.length).toBe(1)
  })

  it('should return 500 if prisma fails', async () => {
    ;(prisma.modality.create as jest.Mock).mockRejectedValue(new Error('DB Error'))

    const res = await request(app)
      .post('/modalities')
      .send({ name: 'MRI' })

    expect(res.status).toBe(500)
  })
})
