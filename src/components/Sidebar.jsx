import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { FiTwitter, FiGithub, FiYoutube, FiMail, FiMusic } from 'react-icons/fi';
import { SiMedium } from 'react-icons/si';
import { FaStackOverflow, FaGoodreadsG } from 'react-icons/fa';
import { mediaMax } from '@divyanshu013/media';

import Button from './Button';
import { rhythm } from '../utils/typography';
import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const SIDEBAR_QUERY = graphql`
	{
		avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
			childImageSharp {
				gatsbyImageData(layout: FIXED, width: 128, height: 128)
			}
		}
		site {
			siteMetadata {
				author
				bio
				social {
					twitter
					github
					music
					youtube
					email
					instagram
					stackoverflow
					goodreads
					medium
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
				<GatsbyImage
					alt={author}
					image={avatar.childImageSharp.gatsbyImageData}
					imgStyle={{ borderRadius: '50%' }}
					css={{
						borderRadius: '50%',
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
				<Button
					title="Twitter"
					aria-label="Link to my Twitter"
					as="a"
					circular
					href={social.twitter}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiTwitter />
				</Button>
				<Button
					title="GitHub"
					aria-label="Link to my GitHub"
					as="a"
					circular
					href={social.github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiGithub />
				</Button>
				<Button
					title="Stackoverflow"
					aria-label="Link to my Stackoverflow"
					as="a"
					circular
					href={social.stackoverflow}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaStackOverflow />
				</Button>
				<Button
					title="My coding YouTube channel"
					aria-label="Link to my JavaScript YouTube channel"
					as="a"
					circular
					href={social.youtube}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiYoutube />
				</Button>
				<Button
					title="Medium"
					aria-label="Some old blogs and featured blogs on other publications"
					as="a"
					circular
					href={social.medium}
					target="_blank"
					rel="noopener noreferrer"
				>
					<SiMedium />
				</Button>
				<Button
					title="Some music I've covered"
					aria-label="Link to my music"
					as="a"
					circular
					href={social.music}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiMusic />
				</Button>
				<Button
					title="What I'm reading these days"
					aria-label="Link to my Goodreads"
					as="a"
					circular
					href={social.goodreads}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGoodreadsG />
				</Button>
				<Button
					title="Good old email"
					aria-label="Email me"
					as="a"
					circular
					href={social.email}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FiMail />
				</Button>
			</div>
		</nav>
	);
};

export default Sidebar;
