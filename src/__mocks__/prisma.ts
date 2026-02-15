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

  // ADD 👇
  machine: {
    create: jest.fn(),
    update: jest.fn(),
  },
};
