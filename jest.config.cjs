module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  clearMocks: true,

  moduleNameMapper: {
    '^../../../../generated/prisma/client$':
      '<rootDir>/src/__mocks__/generated/prisma/client.ts',
  },
}
