import { prismaMock } from '../__mocks__/prisma'

jest.mock('../../prisma', () => ({
  prisma: prismaMock,
}))

import * as service from '../admin-api/modules/appointment/appointment.service'
import { AppointmentStatus } from '../__mocks__/generated/prisma/client'

describe('Appointment Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('block', () => {
    it('should create blocked appointment', async () => {
      prismaMock.appointment.create.mockResolvedValue({
        id: 'a1',
        status: AppointmentStatus.BLOCKED,
      })

      const result = await service.block({ centerId: 'c1' })

      expect(prismaMock.appointment.create).toHaveBeenCalledWith({
        data: {
          centerId: 'c1',
          status: AppointmentStatus.BLOCKED,
        },
      })

      expect(result.status).toBe(AppointmentStatus.BLOCKED)
    })

    it('should throw if prisma fails', async () => {
      prismaMock.appointment.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.block({ centerId: 'c1' })
      ).rejects.toThrow('DB Error')
    })
  })

  describe('cancel', () => {
    it('should cancel appointment', async () => {
      prismaMock.appointment.update.mockResolvedValue({
        id: 'a1',
        status: AppointmentStatus.CANCELLED,
      })

      const result = await service.cancel('a1')

      expect(prismaMock.appointment.update).toHaveBeenCalledWith({
        where: { id: 'a1' },
        data: { status: AppointmentStatus.CANCELLED },
      })

      expect(result.status).toBe(AppointmentStatus.CANCELLED)
    })

    it('should throw if prisma fails', async () => {
      prismaMock.appointment.update.mockRejectedValue(new Error('DB Error'))

      await expect(service.cancel('a1')).rejects.toThrow('DB Error')
    })
  })
})
