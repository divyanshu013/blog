export default `
	code[class*='language-'],
	pre[class*='language-'] {
		color: #e3e8ff; /* base00 */
		font-family: 'Fira Mono', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
		font-size: 16px;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		word-wrap: normal;
		transition: 0.4s ease;

		line-height: 1.65;

		-moz-tab-size: 2;
		-o-tab-size: 2;
		tab-size: 2;

		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
	}

	pre[class*='language-']::-moz-selection,
	pre[class*='language-'] ::-moz-selection,
	code[class*='language-']::-moz-selection,
	code[class*='language-'] ::-moz-selection {
		background: rgba(255, 255, 255, 0.09); /* base02 */
	}

	pre[class*='language-']::selection,
	pre[class*='language-'] ::selection,
	code[class*='language-']::selection,
	code[class*='language-'] ::selection {
		background: rgba(255, 255, 255, 0.09); /* base02 */
	}

	/* Code blocks */
	pre[class*='language-'] {
		padding: 1em;
		margin: 0.5em 0;
		overflow: auto;
		border-radius: 0.3em;
	}

	:not(pre) > code[class*='language-'],
	pre[class*='language-'] {
		background-color: rgba(255, 255, 255, 0.05);
	}

	/* Inline code */
	:not(pre) > code[class*='language-'] {
		color: #84ffff;
		padding: 0.1em;
		border-radius: 0.3em;
	}

	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: rgba(227,232,255,0.5); /* base1 */
	}

	.token.punctuation {
		color: rgba(227,232,255,0.6); /* base01 */
	}

	.namespace {
		opacity: 0.7;
	}

	.token.property,
	.token.tag,
	.token.boolean,
	.token.number {
		color: #82aaff;
	}

	.token.constant,
	.token.symbol,
	.token.deleted {
		color: #c792ea /* blue */
	}

	.token.selector,
	.token.attr-name,
	.token.string,
	.token.char,
	.token.builtin,
	.token.url,
	.token.inserted {
		color: #c3e88d; /* cyan */
	}

	.token.entity {
		color: rgba(227,232,255,0.7);
		background: rgba(255, 255, 255, 0.05);
	}

	.token.atrule,
	.token.attr-value,
	.token.keyword {
		color: #f07178;
		font-style: italic;
		font-family: 'Space Mono';
	}

	.token.function,
	.token.class-name {
		color: #ffcb6b; /* yellow */
	}

	.token.regex,
	.token.important,
	.token.variable {
		color: #f78c6c; /* orange */
	}

	.token.important,
	.token.bold {
		font-weight: bold;
	}
	.token.italic {
		font-family: 'Space Mono';
		font-style: italic;
	}

	.token.entity {
		cursor: help;
	}
`;
