import { SnippetParser, Text } from './snippetParser.ts';

/** Variable values by name (`TM_FILENAME`) and tabstop values by index (`1`). */
export type SnippetValues = Record<string | number, string>;

/** Expands a TextMate snippet to the text VS Code would insert, with `values` filled in. */
export function expand(template: string, values: SnippetValues = {}): string {
	const snippet = new SnippetParser().parse(template);
	snippet.resolveVariables({ resolve: (variable) => values[variable.name] });
	for (const placeholder of snippet.placeholders) {
		const value = values[placeholder.index];
		if (value !== undefined) {
			snippet.replace(placeholder, [new Text(placeholder.transform ? placeholder.transform.resolve(value) : value)]);
		}
	}
	return snippet.toString();
}

export { SnippetParser } from './snippetParser.ts';
