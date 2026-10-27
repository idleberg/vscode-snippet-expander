import { defineConfig } from 'oxlint';

export default defineConfig({
	categories: {
		correctness: 'error',
		suspicious: 'warn',
		pedantic: 'warn',
	},
	// Vendored from VS Code, kept identical to upstream
	ignorePatterns: ['dist/', 'node_modules/', 'src/charCode.ts', 'src/snippetParser.ts'],
	plugins: ['import', 'oxc', 'typescript', 'unicorn'],
	rules: {
		eqeqeq: 'warn',
		'import/no-cycle': 'error',
	},
});
