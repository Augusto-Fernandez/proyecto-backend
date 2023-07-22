/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "babel",
    verbose: true,
    detectOpenHandles: true,
    silent: false,
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/"
  ],
  coverageReporters: [
    "json",
    "text",
    "html"
  ],
  coverageThreshold: {
    global: {
      statements: '75',
      branches: '50',
      functions: '50',
      lines: '75',
    }
  },
  errorOnDeprecated: false,
  maxWorkers: "70%",
  moduleFileExtensions: [
    "js",
    "json",
    "node"
  ],
  moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "./src/tests/__mocks__/mocks.js",
      "\\.(css|less)$": "./src/Tests/__mocks__/mocks.js"
  },
  roots: [
    "./src"
  ],
  setupFiles: [
      'dotenv/config'
  ],
  testEnvironment: "node",
  testRegex: '((\\.|/)(test))\\.js?$',
  testTimeout: 16000,
  watchPathIgnorePatterns: ['globalConfig'],
  };

  export default config;
