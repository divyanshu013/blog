import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Image from 'gatsby-image';
import { FiTwitter, FiGithub, FiInstagram, FiYoutube, FiMail } from 'react-icons/fi';
import { FaSoundcloud, FaStackOverflow } from 'react-icons/fa';
import { mediaMax } from '@divyanshu013/media';

import Button from './Button';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

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
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	const borderStartingColor = theme === 'light' ? 'hsla(0, 0%, 0%, 0.1)' : 'hsla(0, 0%, 100%, 0.1)';
	return (
		<nav
			css={{
				borderRight: '1px solid',
				margin: '24px 0',
				padding: '16px 64px',
				alignSelf: 'start',
				borderImage: `linear-gradient(to bottom, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
				[mediaMax.large]: {
					borderBottom: '1px solid',
					borderImage: `linear-gradient(to right, ${borderStartingColor}, hsla(0, 0%, 0%, 0)) 1 100%`,
					borderImageSlice: 1,
					padding: `16px 0 ${rhythm(2)} 0`,
					margin: '24px 32px',
				},
			}}
		>
			<div
				css={{
					[mediaMax.small]: {
						display: 'grid',
						gridTemplateColumns: 'auto auto',
						gridGap: 16,
						alignItems: 'center',
						justifyContent: 'start',
					},
				}}
			>
				<Image
					alt={author}
					fixed={avatar.childImageSharp.fixed}
					imgStyle={{ borderRadius: '50%' }}
					css={{
						marginBottom: rhythm(0.8),
						opacity: 0.87,
						[mediaMax.small]: {
							width: '64px !important',
							height: '64px !important',
							order: 1,
						},
					}}
				/>
				<h3>{author}</h3>
			</div>
			<p className="muted" css={{ color: muted }}>
				{bio}
			</p>
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
