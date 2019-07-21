import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { mediaMax } from '@divyanshu013/media';
import { rhythm } from '../utils/typography';
import { TEXT_PRIMARY } from '../utils/theme';

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
				childImageSharp {
					fixed(width: 64, height: 64) {
						...GatsbyImageSharpFixed
					}
				}
			}
			site {
				siteMetadata {
					author
					social {
						twitter
						github
						youtube
					}
				}
			}
		}
	`);

	const { author, social } = data.site.siteMetadata;
	return (
		<div
			css={{
				display: `grid`,
				gridTemplateColumns: 'auto auto',
				alignItems: 'start',
				a: {
					borderBottomColor: TEXT_PRIMARY,
					'&:hover, &:focus': {
						borderBottomStyle: 'solid',
					},
				},
				[mediaMax.small]: {
					gridTemplateColumns: 'auto',
				},
			}}
		>
			<Image
				fixed={data.avatar.childImageSharp.fixed}
				alt={author}
				css={{
					marginTop: 8,
					marginRight: rhythm(1),
					borderRadius: `100%`,
					[mediaMax.small]: {
						marginBottom: 8,
					},
				}}
				imgStyle={{
					borderRadius: `50%`,
				}}
			/>
			<div css={{ fontFamily: 'Zilla Slab' }}>
				<p>
					Personal blog of <a href={social.twitter}>{author}</a>. I’m a{' '}
					<a href={social.github}>JavaScript engineer</a> working with React, React Native, GraphQL
					and Node. I also create <a href={social.youtube}>programming videos</a> with my friend. In
					my spare time I play music and DoTA.
				</p>
				<p>
					You may follow me on <a href={social.twitter}>twitter</a> for latest updates.
				</p>
			</div>
		</div>
	);
};

export default Bio;
