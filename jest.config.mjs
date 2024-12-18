import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './'
});

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  reporters: ['default', 'jest-junit'],
  modulePaths: ['<rootDir>/app/'],
  resetMocks: true,
  moduleDirectories: ['node_modules', '<rootDir>']
};

export default createJestConfig(config);
