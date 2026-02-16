import { prismaMock } from '../__mocks__/prisma'

jest.mock('../../prisma', () => ({
  prisma: prismaMock,
}))

import * as service from '../admin-api/modules/availability/availability.service'

describe('Availability Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create availability rule', async () => {
    prismaMock.availabilityRule.create.mockResolvedValue({
      id: 'a1',
      centerId: 'c1',
      dayOfWeek: 1,
    })

    const result = await service.create({
      centerId: 'c1',
      dayOfWeek: 1,
      startTime: '09:00',
      endTime: '17:00',
    })

    expect(prismaMock.availabilityRule.create).toHaveBeenCalledWith({
      data: {
        centerId: 'c1',
        dayOfWeek: 1,
        startTime: '09:00',
        endTime: '17:00',
      },
    })

    expect(result.id).toBe('a1')
  })

  it('should throw if prisma fails', async () => {
    prismaMock.availabilityRule.create.mockRejectedValue(new Error('DB Error'))

    await expect(
      service.create({ centerId: 'c1' })
    ).rejects.toThrow('DB Error')
  })
})
