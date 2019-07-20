import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { FiTwitter, FiGithub, FiInstagram, FiYoutube, FiMail } from 'react-icons/fi';
import { FaSoundcloud, FaStackOverflow } from 'react-icons/fa';

import Button from './Button';
import { rhythm } from '../utils/typography';
import { TEXT_MUTED } from '../utils/theme';

const SIDEBAR_QUERY = graphql`
	{
		avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
			childImageSharp {
				fixed(width: 128, height: 128) {
					...GatsbyImageSharpFixed
				}
			}
		}
		site {
			siteMetadata {
				author
				bio
				social {
					twitter
					github
					soundcloud
					youtube
					email
					instagram
					stackoverflow
				}
			}
		}
	}
`;

const Sidebar = () => {
	const data = useStaticQuery(SIDEBAR_QUERY);
	const { avatar } = data;
	const { author, bio, social } = data.site.siteMetadata;
	return (
		<nav
			css={{
				// boxShadow: '0 7px 30px -10px rgba(150,170,180,0.5)',
				borderRight: '1px solid hsl(0, 0%, 0%, 0.1)',
				margin: '24px 0',
				padding: '16px 64px',
			}}
		>
			<Image
				alt={author}
				fixed={avatar.childImageSharp.fixed}
				imgStyle={{ borderRadius: '50%' }}
				css={{ marginBottom: rhythm(0.8) }}
			/>
			<h3>{author}</h3>
			<p css={{ color: TEXT_MUTED }}>{bio}</p>
			<div
				css={{
					display: 'grid',
					gridGap: 16,
					gridTemplateColumns: 'repeat(4, auto)',
					justifyItems: 'center',
					justifyContent: 'start',
				}}
			>
				<Button as="a" circular href={social.twitter} target="_blank">
					<FiTwitter />
				</Button>
				<Button as="a" circular href={social.github} target="_blank">
					<FiGithub />
				</Button>
				<Button as="a" circular href={social.stackoverflow} target="_blank">
					<FaStackOverflow />
				</Button>
				<Button as="a" circular href={social.youtube} target="_blank">
					<FiYoutube />
				</Button>
				<Button as="a" circular href={social.instagram} target="_blank">
					<FiInstagram />
				</Button>
				<Button as="a" circular href={social.soundcloud} target="_blank">
					<FaSoundcloud />
				</Button>
				<Button as="a" circular href={social.email} target="_blank">
					<FiMail />
				</Button>
			</div>
		</nav>
	);
};

export default Sidebar;
