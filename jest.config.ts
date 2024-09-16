// jest.config.js
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src", "<rootDir>/test"],
  testRegex: ".*\\.spec\\.ts$",
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
