import { prismaMock } from '../__mocks__/prisma'

jest.mock('../../prisma', () => ({
  prisma: prismaMock,
}))

import * as service from '../admin-api/modules/vendor/vendor.service'

describe('Vendor Service', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createVendor', () => {

    it('should create vendor successfully', async () => {
      prismaMock.vendor.create.mockResolvedValue({
        id: 'v1',
        name: 'Apollo'
      })

      const result = await service.createVendor({ name: 'Apollo' })

      expect(prismaMock.vendor.create).toHaveBeenCalledWith({
        data: { name: 'Apollo' }
      })

      expect(result.name).toBe('Apollo')
    })

    it('should throw error if prisma fails', async () => {
      prismaMock.vendor.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.createVendor({ name: 'Apollo' })
      ).rejects.toThrow('DB Error')
    })
  })

  describe('createVendorAdmin', () => {

    it('should create vendor admin', async () => {
      prismaMock.vendorAdmin.create.mockResolvedValue({
        id: 'a1',
        name: 'Admin',
        email: 'admin@test.com'
      })

      const result = await service.createVendorAdmin(
        'vendor-1',
        { name: 'Admin', email: 'admin@test.com' }
      )

      expect(prismaMock.vendorAdmin.create).toHaveBeenCalledWith({
        data: {
          vendorId: 'vendor-1',
          name: 'Admin',
          email: 'admin@test.com'
        }
      })

      expect(result.email).toBe('admin@test.com')
    })

    it('should throw error if prisma fails', async () => {
      prismaMock.vendorAdmin.create.mockRejectedValue(new Error('DB Error'))

      await expect(
        service.createVendorAdmin('vendor-1', {
          name: 'Admin',
          email: 'admin@test.com'
        })
      ).rejects.toThrow('DB Error')
    })
  })

  describe('listVendors', () => {

    it('should return vendors list', async () => {
      prismaMock.vendor.findMany.mockResolvedValue([
        { id: 'v1', name: 'Apollo' }
      ])

      const result = await service.listVendors()

      expect(prismaMock.vendor.findMany).toHaveBeenCalledWith({
        include: { centers: true, admins: true }
      })

      expect(result.length).toBe(1)
    })

    it('should throw error if prisma fails', async () => {
      prismaMock.vendor.findMany.mockRejectedValue(new Error('DB Error'))

      await expect(service.listVendors()).rejects.toThrow('DB Error')
    })
  })
})
