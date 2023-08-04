module.exports = {
	'env': {
		'browser': true,
		'node': true
	},
	'extends': [ 'eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier' ],
	'parser': '@typescript-eslint/parser',
	'plugins': [ '@typescript-eslint' ],
	'root': true,
	'rules': {
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-var-requires': 'off',
		'array-bracket-spacing': [ 'error', 'always' ],
		'arrow-parens': 'error',
		'arrow-spacing': 'error',
		'block-spacing': 'error',
		'camelcase': 'warn',
		'comma-dangle': 'error',
		'comma-spacing': 'error',
		'comma-style': [ 'error', 'last' ],
		'computed-property-spacing': [ 'error', 'always' ],
		'eol-last': [ 'error', 'always' ],
		'eqeqeq': 'error',
		'func-call-spacing': [ 'error', 'never' ],
		'indent': [ 'error', 'tab' ],
		'jsx-quotes': [ 'error', 'prefer-single' ],
		'key-spacing': [ 'error', { 'afterColon': true, 'mode': 'strict' } ],
		'keyword-spacing': 'error',
		'max-len': [ 'error', { 'code': 180 } ],
		'no-console': 'warn',
		'no-duplicate-imports': 'error',
		'no-multi-spaces': 'error',
		'no-multiple-empty-lines': 'error',
		'no-script-url': 'error',
		'no-trailing-spaces': 'error',
		'no-unused-expressions': 'error',
		'no-var': 'error',
		'no-whitespace-before-property': 'error',
		'object-curly-newline': 'error',
		'object-curly-spacing': [ 'error', 'always', { 'arraysInObjects': true, 'objectsInObjects': true } ],
		'quotes': [ 'error', 'single' ],
		'semi': [ 'error', 'never' ],
		'space-before-function-paren': 'error',
		'space-in-parens': 'error',
		'template-curly-spacing': [ 'error', 'always' ]
	}
}
