import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		// The bundle includes VS Code's snippet parser, whose license requires this notice
		banner: '/*! Includes code from VS Code, Copyright (c) Microsoft Corporation, MIT License */',
		clean: true,
		dts: isProduction,
		entry: ['src/index.ts', 'src/vitest.ts'],
		format: ['esm', 'cjs'],
		minify: isProduction,
		platform: 'node',
		target: 'node20',
		treeshake: isProduction,
	};
});
