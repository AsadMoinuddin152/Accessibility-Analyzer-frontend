import { defaults } from "jest-config";

export default {
  ...defaults,
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/src/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
  ],
};
