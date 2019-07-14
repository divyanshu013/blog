import Typography from 'typography';

const typography = new Typography({
	title: 'typography-theme-div-blog',
	headerFontFamily: ['Zilla Slab', 'Helvetica', 'sans-serif'],
	bodyFontFamily: ['Open Sans', 'sans-serif'],
	baseLineHeight: 1.65,
	scaleRatio: 3.5,
	headerWeight: 500,
	baseFontSize: 18,
	overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
		blockquote: {
			...adjustFontSizeTo('22px'),
			color: 'hsl(0,0%,0%,0.75)',
			fontFamily: ['Zilla Slab', 'Helvetica', 'sans-serif'].join(),
			fontStyle: 'italic',
			paddingLeft: rhythm(13 / 16),
			marginLeft: rhythm(-1),
			borderLeft: `${rhythm(2.5 / 16)} solid hsl(0,0%,0%,0.75)`,
		},
	}),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
	typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
