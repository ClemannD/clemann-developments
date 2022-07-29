/* eslint-disable */
/* eslint-disable */
/* eslint-disable */
export default {
    displayName: 'react-hooks-use-window-dimensions',
    preset: '../../../../jest.preset.js',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.spec.json'
        }
    },
    transform: {
        '^.+\\.[tj]sx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory:
        '../../../../coverage/libs/react/hooks/use-window-dimensions'
};
