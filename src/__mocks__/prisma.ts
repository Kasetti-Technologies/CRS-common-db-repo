export const prismaMock = {
  vendor: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  vendorAdmin: {
    create: jest.fn(),
  },
  center: {
    create: jest.fn(),
    update: jest.fn(),
  },
  branchAdmin: {
    create: jest.fn(),
  },
  modality: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  machine: {
    create: jest.fn(),
    update: jest.fn(),
  },
  operator: {
    create: jest.fn(),
  },
  operatorLeave: {
    create: jest.fn(),
  },
  availabilityRule: {
    create: jest.fn(),
  },

  // ✅ ADD APPOINTMENT
  appointment: {
    create: jest.fn(),
    update: jest.fn(),
  },
}
