import { defineConfig } from 'oxfmt';

export default defineConfig({
	arrowParens: 'always',
	bracketSpacing: true,
	endOfLine: 'lf',
	// Vendored from VS Code, kept identical to upstream
	ignorePatterns: ['dist/', 'node_modules/', 'src/charCode.ts', 'src/snippetParser.ts'],
	printWidth: 120,
	semi: true,
	singleQuote: true,
	sortImports: true,
	tabWidth: 2,
	trailingComma: 'all',
	useTabs: true,
});
