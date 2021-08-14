import React, { useContext } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import { mediaMax } from '@divyanshu013/media';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
				childImageSharp {
					gatsbyImageData(layout: FIXED, width: 64, height: 64)
				}
			}
			site {
				siteMetadata {
					author
					social {
						twitter
						github
						youtube
						newsletter
					}
				}
			}
		}
	`);

	const { author, social } = data.site.siteMetadata;
	const { theme } = useContext(ThemeContext);
	const { color, secondary } = getTheme(theme);
	return (
		<div
			css={{
				display: `grid`,
				gridTemplateColumns: 'auto auto',
				alignItems: 'start',
				a: {
					borderBottomColor: color,
					'&:hover, &:focus': {
						borderBottomStyle: 'solid',
						borderBottomColor: color,
					},
				},
				[mediaMax.small]: {
					gridTemplateColumns: 'auto',
				},
			}}
		>
			<GatsbyImage
				image={data.avatar.childImageSharp.gatsbyImageData}
				alt={author}
				css={{
					marginTop: 8,
					marginRight: rhythm(1),
					borderRadius: `100%`,
					opacity: 0.87,
					[mediaMax.small]: {
						marginBottom: 8,
					},
				}}
				imgStyle={{
					borderRadius: `50%`,
				}}
			/>
			<div css={{ fontSize: 16, color: secondary }}>
				<p>
					Personal blog of <a href={social.twitter}>{author}</a>. I’m a{' '}
					<a href={social.github}>software engineer</a> working mostly on frontend. I also create <a href={social.youtube}>programming videos</a>{' '}
					with my friend. In my spare time I play music and DoTA.
				</p>
				<p>
					You may follow me on <a href={social.twitter}>twitter</a> or join my{' '}
					<a href={social.newsletter}>newsletter</a> for latest updates.
				</p>
			</div>
		</div>
	);
};

export default Bio;
