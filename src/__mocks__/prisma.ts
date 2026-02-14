export const prismaMock = {
  vendor: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  vendorAdmin: {
    create: jest.fn(),
  },

  // ADD THIS 👇
  center: {
    create: jest.fn(),
    update: jest.fn(),
  },
  branchAdmin: {
    create: jest.fn(),
  },
};
