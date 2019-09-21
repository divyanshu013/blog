module.exports = {
	siteMetadata: {
		bio: 'Life, music, code and things in between…',
		title: `Divyanshu Maithani`,
		author: `Divyanshu Maithani`,
		description: `Personal blog of Divyanshu Maithani`,
		siteUrl: `https://divyanshu013.dev`,
		social: {
			twitter: `https://twitter.com/divyanshu013`,
			github: 'https://github.com/divyanshu013',
			youtube: 'https://youtube.com/WhatTheJavaScript',
			soundcloud: 'https://soundcloud.com/divyanshu-maithani',
			instagram: 'https://instagram.com/divyanshu013',
			email: 'mailto:div.blackcat@gmail.com',
			stackoverflow: 'https://stackoverflow.com/users/4952669/divyanshu-maithani',
			newsletter: 'https://tinyletter.com/divyanshu',
		},
	},
	plugins: [
		`gatsby-plugin-emotion`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Div's Blog`,
				short_name: `Div`,
				start_url: `/`,
				background_color: `#000000`,
				theme_color: `#fa8072`,
				display: `minimal-ui`,
				icon: `static/favicon.png`,
			},
		},
		`gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				color: `salmon`,
			},
		},
		{
			resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
			options: {
				devMode: false,
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: 'UA-54730700-3',
				head: false,
				anonymize: true,
				respectDNT: true,
			},
		},
	],
};
