import { prismaMock } from '../__mocks__/prisma'

jest.mock('../../prisma', () => ({
  prisma: prismaMock,
}))

import * as service from '../admin-api/modules/center/center.service'

describe('Center Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createCenter', () => {
    it('should create center', async () => {
      prismaMock.center.create.mockResolvedValue({
        id: 'c1',
        name: 'Center A'
      })

      const result = await service.createCenter({ name: 'Center A' })

      expect(prismaMock.center.create).toHaveBeenCalledWith({
        data: { name: 'Center A' }
      })

      expect(result.name).toBe('Center A')
    })

    it('should throw if prisma fails', async () => {
      prismaMock.center.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.createCenter({ name: 'Center A' })
      ).rejects.toThrow('DB Error')
    })
  })

  describe('updateStatus', () => {
    it('should update status', async () => {
      prismaMock.center.update.mockResolvedValue({
        id: 'c1',
        isActive: false
      })

      const result = await service.updateStatus('c1', false)

      expect(prismaMock.center.update).toHaveBeenCalledWith({
        where: { id: 'c1' },
        data: { isActive: false }
      })

      expect(result.isActive).toBe(false)
    })
  })

  describe('assignAdmin', () => {
    it('should assign branch admin', async () => {
      prismaMock.branchAdmin.create.mockResolvedValue({
        id: 'b1',
        name: 'Branch Admin'
      })

      const result = await service.assignAdmin('c1', {
        name: 'Branch Admin',
        email: 'admin@test.com'
      })

      expect(prismaMock.branchAdmin.create).toHaveBeenCalledWith({
        data: {
          centerId: 'c1',
          name: 'Branch Admin',
          email: 'admin@test.com'
        }
      })

      expect(result.name).toBe('Branch Admin')
    })
  })
})
