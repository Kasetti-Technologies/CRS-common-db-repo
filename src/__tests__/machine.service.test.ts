import { prismaMock } from '../__mocks__/prisma'

jest.mock('../../prisma', () => ({
  prisma: prismaMock,
}))

import * as service from '../admin-api/modules/machine/machine.service'

describe('Machine Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create machine', async () => {
      prismaMock.machine.create.mockResolvedValue({
        id: 'mac1',
        name: 'MRI-1'
      })

      const result = await service.create({ name: 'MRI-1' })

      expect(prismaMock.machine.create).toHaveBeenCalledWith({
        data: { name: 'MRI-1' }
      })

      expect(result.name).toBe('MRI-1')
    })

    it('should throw if prisma fails', async () => {
      prismaMock.machine.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.create({ name: 'MRI-1' })
      ).rejects.toThrow('DB Error')
    })
  })
  // 
  describe('update', () => {
    it('should update machine name', async () => {
      prismaMock.machine.update.mockResolvedValue({
        id: 'mac1',
        centerId: 'c1',
        modalityId: 'm1',
        name: 'MRI-Updated',
        dailyCapacity: 20,
      })
  
      const result = await service.update('mac1', { name: 'MRI-Updated' })
  
      expect(prismaMock.machine.update).toHaveBeenCalledWith({
        where: { id: 'mac1' },
        data: { name: 'MRI-Updated' },
      })
  
      expect(result.name).toBe('MRI-Updated')
    })
  
    it('should throw if prisma fails', async () => {
      prismaMock.machine.update.mockRejectedValue(new Error('DB Error'))
  
      await expect(
        service.update('mac1', { name: 'MRI-Updated' })
      ).rejects.toThrow('DB Error')
    })
  })
  
  //   
})
