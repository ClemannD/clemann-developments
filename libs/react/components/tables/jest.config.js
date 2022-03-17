module.exports = {
    displayName: 'react-components-tables',
    preset: '../../../../jest.preset.js',
    transform: {
        '^.+\\.[tj]sx?$': 'babel-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    coverageDirectory: '../../../../coverage/libs/react/components/tables'
};
