module.exports = {
	siteMetadata: {
		bio: 'Life, music, code and things in between…',
		title: `Div’s Blog`,
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
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				// trackingId: `ADD YOUR TRACKING ID HERE`,
			},
		},
		`gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Div's Blog`,
				short_name: `Div`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
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
			resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
			options: {
				devMode: false,
			},
		},
	],
};
