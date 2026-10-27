import { expect, test } from 'vitest';

test('plain text', () => expect('hello').toExpandTo('hello'));
test('variable', () => expect('$TM_FILENAME').toExpandTo('foo.ts', { TM_FILENAME: 'foo.ts' }));
test('variable default', () => expect('${FOO:bar}').toExpandTo('bar'));
test('unknown variable', () => expect('a${FOO}b').toExpandTo('ab'));
test('variable transform', () => expect('${TM_FILENAME/(.*)\\..+$/$1/}').toExpandTo('foo', { TM_FILENAME: 'foo.ts' }));
test('tabstop default', () => expect('${1:x}$0').toExpandTo('x'));
test('mirror', () => expect('${1:x} $1').toExpandTo('x x'));
test('tabstop value', () => expect('${1:x} $1').toExpandTo('bar bar', { 1: 'bar' }));
test('tabstop value with mirror transform', () =>
	expect('${1:x} ${1/(.*)/${1:/upcase}/}').toExpandTo('bar BAR', { 1: 'bar' }));
test('nested placeholder', () => expect('${1:a ${2:b}}').toExpandTo('a c', { 2: 'c' }));
test('choice', () => expect('${1|a,b|}').toExpandTo('a'));
test('escapes', () => expect('\\$1 \\}').toExpandTo('$1 }'));
test('mixed', () =>
	expect('${TM_FILENAME/(.*)\\..+$/$1/} ${1:x} $1').toExpandTo('foo bar bar', { TM_FILENAME: 'foo.ts', 1: 'bar' }));
test('not', () => expect('${1:x}').not.toExpandTo('y'));
test('indentation', () => expect('if ($1) {\n\t${2:body}\n}').toExpandTo('if (x) {\n\tbody\n}', { 1: 'x' }));
test('multi-line value is not re-indented', () => expect('{\n\t$1\n}').toExpandTo('{\n\ta\nb\n}', { 1: 'a\nb' }));
