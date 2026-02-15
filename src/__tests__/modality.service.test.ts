import { prismaMock } from '../__mocks__/prisma'

jest.mock('../../prisma', () => ({
  prisma: prismaMock,
}))

import * as service from '../admin-api/modules/modality/modality.service'

describe('Modality Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create modality', async () => {
      prismaMock.modality.create.mockResolvedValue({
        id: 'm1',
        name: 'MRI'
      })

      const result = await service.create({ name: 'MRI' })

      expect(prismaMock.modality.create).toHaveBeenCalledWith({
        data: { name: 'MRI' }
      })

      expect(result.name).toBe('MRI')
    })

    it('should throw if prisma fails', async () => {
      prismaMock.modality.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.create({ name: 'MRI' })
      ).rejects.toThrow('DB Error')
    })
  })

  describe('list', () => {
    it('should list modalities', async () => {
      prismaMock.modality.findMany.mockResolvedValue([
        { id: 'm1', name: 'MRI' }
      ])

      const result = await service.list()

      expect(prismaMock.modality.findMany).toHaveBeenCalled()
      expect(result.length).toBe(1)
    })

    it('should throw if prisma fails', async () => {
      prismaMock.modality.findMany.mockRejectedValue(new Error('DB Error'))

      await expect(service.list()).rejects.toThrow('DB Error')
    })
  })
})
