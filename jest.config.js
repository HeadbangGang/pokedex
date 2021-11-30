module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    collectCoverage: false,
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    moduleDirectories: [
        'node_modules',
        'utils'
    ],
    setupFilesAfterEnv: ['<rootDir>/utils/setupTests.js'],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/utils/fileMock.js',
        '\\.(css|less)$': '<rootDir>/utils/styleMock.js'
    },
    transformIgnorePatterns: [
        '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
        '^.+\\.module\\.(css|sass|scss)$'
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
    ],
}
