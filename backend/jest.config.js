module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  coveragePathIgnorePatterns: [
    './.build',
    './node-modules',
    './dist',
    './cdk.out',
    './src/models',
    './src/constants',
    './prisma',
    './src/data/db-client',
  ],
  modulePathIgnorePatterns: ['./.build', './node-modules', './dist', './cdk.out'],
  moduleDirectories: ['node_modules', 'src'],
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '<rootDir>/.build/'],
  globalSetup: './test/global-setup.js',
  restoreMocks: true,
};
