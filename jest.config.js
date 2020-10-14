module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/*.d.ts',
        '!**/node_modules/**',
    ],
    moduleDirectories: ['node_modules', '.yalc'],
    testPathIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
};
