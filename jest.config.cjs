/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/api'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'api/**/*.ts',
    '!api/**/*.d.ts',
    '!api/**/*.test.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
