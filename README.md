# vscode-snippet-expander

> VS Code's snippet parser with an `expand()` helper and a Vitest `toExpandTo` matcher

![License](https://img.shields.io/npm/l/vscode-snippet-expander?style=for-the-badge)
[![Version](https://img.shields.io/npm/v/vscode-snippet-expander?style=for-the-badge)](https://www.npmjs.org/package/vscode-snippet-expander)

Expands a TextMate snippet to the text VS Code would insert, so you can test your extension's snippets without launching an editor.

## Installation

```sh
npm install --save-dev vscode-snippet-expander
```

## Usage

```ts
import { expand } from 'vscode-snippet-expander';

expand('${1:x} $1');
// => "x x"

expand('${TM_FILENAME/(.*)\\..+$/$1/} ${1:x} $1', { TM_FILENAME: 'foo.ts', 1: 'bar' });
// => "foo bar bar"
```

`expand()` returns a string, so it works with the assertions of any test runner. With Mocha, which is what VS Code extensions use by default:

```ts
import assert from 'node:assert';

import { expand } from 'vscode-snippet-expander';

test('console.log snippet', () => {
	assert.strictEqual(expand('console.log($1);$0', { 1: 'foo' }), 'console.log(foo);');
});
```

### Methods

#### expand

Usage: `expand(template, values?)`

Parses a snippet and returns the text it expands to. Tabstops without a value fall back to their placeholder, unknown variables expand to an empty string.

##### values

Type: `Record<string | number, string>`

Variable values by name (`TM_FILENAME`) and tabstop values by index (`1`). Mirrors and transforms of a tabstop use its value.

#### SnippetParser

The unmodified parser from VS Code's source, for when you need the parsed snippet rather than its text.

### Vitest

Register the matcher in your Vitest config:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: { setupFiles: ['vscode-snippet-expander/vitest'] },
});
```

Then use `toExpandTo(expected, values?)` in your tests:

```ts
import { expect, test } from 'vitest';

test('mirror', () => expect('${1:x} $1').toExpandTo('bar bar', { 1: 'bar' }));
```

### Indentation

Indentation is returned as written. VS Code adjusts whitespace when it inserts a snippet: `\t` becomes the editor's indent unit, and every line after the first is prefixed with the indentation of the line the cursor is on. Neither happens in `expand()`, so write your expected output with the snippet's own tabs:

```ts
expand('if ($1) {\n\t${2:body}\n}', { 1: 'x' });
// => "if (x) {\n\tbody\n}"
```

## License

This work is licensed under [The MIT License](LICENSE). The snippet parser is taken from [VS Code](https://github.com/microsoft/vscode), © Microsoft Corporation, also licensed under the MIT License.
