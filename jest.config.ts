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
  clearMocks: true
}

export default jestConfig
