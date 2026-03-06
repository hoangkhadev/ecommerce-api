import type { Config } from 'jest'
import { createDefaultPreset } from 'ts-jest'
const tsJestTransformCfg = createDefaultPreset().transform

const jestConfig: Config = {
  testEnvironment: 'node',
  transform: {
    ...tsJestTransformCfg
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  clearMocks: true,
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
}

export default jestConfig
