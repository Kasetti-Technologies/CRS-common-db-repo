import { prismaMock } from '../__mocks__/prisma'

jest.mock('../../prisma', () => ({
  prisma: prismaMock,
}))

import * as service from '../admin-api/modules/operator/operator.service'

describe('Operator Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create operator', async () => {
      prismaMock.operator.create.mockResolvedValue({
        id: 'op1',
        name: 'John',
        centerId: 'c1',
        modalityId: 'm1',
      })

      const result = await service.create({
        name: 'John',
        centerId: 'c1',
        modalityId: 'm1',
      })

      expect(prismaMock.operator.create).toHaveBeenCalledWith({
        data: {
          name: 'John',
          centerId: 'c1',
          modalityId: 'm1',
        },
      })

      expect(result.name).toBe('John')
    })

    it('should throw if prisma fails', async () => {
      prismaMock.operator.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.create({ name: 'John' })
      ).rejects.toThrow('DB Error')
    })
  })

  describe('addLeave', () => {
    it('should add operator leave', async () => {
      prismaMock.operatorLeave.create.mockResolvedValue({
        id: 'l1',
        operatorId: 'op1',
      })

      const result = await service.addLeave('op1', '2026-02-20')

      expect(prismaMock.operatorLeave.create).toHaveBeenCalledWith({
        data: {
          operatorId: 'op1',
          date: new Date('2026-02-20'),
        },
      })

      expect(result.id).toBe('l1')
    })

    it('should throw if prisma fails', async () => {
      prismaMock.operatorLeave.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.addLeave('op1', '2026-02-20')
      ).rejects.toThrow('DB Error')
    })
  })
})
