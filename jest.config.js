module.exports = {
    testEnvironment: 'jsdom', // Use jsdom as the test environment
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // Point to your setup file
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Supported file extensions
  };
  