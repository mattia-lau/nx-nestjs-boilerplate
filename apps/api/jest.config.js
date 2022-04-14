const ts = require('typescript');
const { config } = ts.readConfigFile('./tsconfig.json', ts.sys.readFile);
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { join } = require('path');

module.exports = {
  preset: 'ts-jest',
  displayName: 'api',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  testEnvironment: 'node',
  coverageDirectory: '../../coverage/apps/api',
  moduleNameMapper: pathsToModuleNameMapper(config.compilerOptions.paths, {
    prefix: join(__dirname, '..', '..'),
  }),
};
