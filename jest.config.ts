import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
  moduleNameMapper: {
    '^@pages$': '<rootDir>/src/pages',
    '^@components$': '<rootDir>/src/components',
    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui-pages$': '<rootDir>/src/components/ui/pages',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices$': '<rootDir>/src/services/slices',
    '^@selectors$': '<rootDir>/src/services/selectors',
    '\\.(jpg|jpeg|png|gif|svg|woff|woff2)$': '<rootDir>/src/__mocks__/fileMock.ts'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(css|scss)$': 'jest-css-modules-transform'
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.tsx']
};

export default config;
