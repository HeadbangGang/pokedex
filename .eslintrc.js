module.exports = {
    env: {
        'amd': true,
        'browser': true,
        'es6': true,
        'jest': true,
        'mocha': true,
        'node': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended'
    ],
    plugins: [
        'react',
        'jsx-a11y',
        'react-hooks',
        '@typescript-eslint'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            'jsx': true
        },
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: {
        'react/prop-types': 0,
        'no-empty': 0,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'eqeqeq': [2, 'smart'],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'never'
        ],
        'no-nested-ternary': 2,
        'jsx-a11y/href-no-hash': 0,
        'jsx-a11y/img-has-alt': 0,
        'jsx-a11y/img-redundant-alt': [2, { components: ['Image'], words: ['.*[pP]hone', 'picture', '.*photo', '.*image', 'picture of', 'image of'] }],
        'jsx-a11y/onclick-has-focus': 0,
        'jsx-a11y/onclick-has-role': 0,
        'jsx-a11y/label-has-for': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'indent': 1,
        'jsx-a11y/no-noninteractive-element-interactions': 1,
        'react/no-typos': 2,
        'max-len': [2, {
            code: 180,
            tabWidth: 4,
            ignoreTemplateLiterals: true,
            ignoreUrls: true,
            ignoreComments: true, // cannot have variable declarations split up onto multiple lines, p tags also cannot be split
            ignorePattern: '.*<p .*</p>|[\\s\\w\\d]*|[\\s\\w\\d]*|\\w*: \\w*|const [\\W\\s\\w\\d]* = [\\S\\W\\s\\w\\d\\(\\)]*|const [\\W\\s\\w\\d]* = [\\w\\W\\d\\D\\s\\S]*\\([\\S\\W\\s\\w\\d]*\\)'
        }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error'
    },
    overrides: [
        {
            files: ['*test.js'],
            rules: {
                'no-import-assign': 'off',
                'max-len': 'off'
            }
        }, {
            files: ['*.ts, *.tsx'],
            plugins: ['@typescript-eslint/eslint-plugin ']
        }
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
}
