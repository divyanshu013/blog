import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import { rhythm } from '../utils/typography';

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
				childImageSharp {
					fixed(width: 50, height: 50) {
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
					}
				}
			}
		}
	`);

	const { author, social } = data.site.siteMetadata;
	return (
		<div
			style={{
				display: `flex`,
				marginBottom: rhythm(2.5),
			}}
		>
			<Image
				fixed={data.avatar.childImageSharp.fixed}
				alt={author}
				style={{
					marginRight: rhythm(1 / 2),
					marginBottom: 0,
					minWidth: 50,
					borderRadius: `100%`,
				}}
				imgStyle={{
					borderRadius: `50%`,
				}}
			/>
			<p>
				Personal blog of{' '}
				<a href={`https://twitter.com/${social.twitter}`}>
					<strong>{author}</strong>
				</a>
				. Life, music and <a href={`https://github.com/${social.github}`}>code</a>!
			</p>
		</div>
	);
};

export default Bio;
