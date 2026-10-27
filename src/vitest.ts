import { expect } from 'vitest';

import { expand, type SnippetValues } from './index.ts';

expect.extend({
	toExpandTo(received: string, expected: string, values?: SnippetValues) {
		const actual = expand(received, values);
		return {
			pass: this.equals(actual, expected),
			message: () =>
				`expected snippet ${this.utils.printReceived(received)}${this.isNot ? ' not' : ''} to expand to ${this.utils.printExpected(expected)}\n\n${this.utils.diff(expected, actual)}`,
			actual,
			expected,
		};
	},
});

declare module 'vitest' {
	interface Matchers<R, T> {
		toExpandTo(expected: string, values?: SnippetValues): R;
	}
}
