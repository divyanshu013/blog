import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { node, object } from 'prop-types';
import { mediaMax } from '@divyanshu013/media';
import { FiTerminal, FiSun, FiMoon } from 'react-icons/fi';
import { keyframes } from '@emotion/react';

import ThemeContext from './ThemeContext';
import Button from './Button';
import Footer from './Footer';
import { rhythm } from '../utils/typography';
import { BACKGROUND_TRANSITION_TIME, EASE_IN_OUT_TRANSITION, getTheme } from '../utils/theme';

const Layout = ({ location, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { color, background, secondary } = getTheme(theme);
	const darkTheme = getTheme('dark');

	const terminalAnimation = keyframes({
		from: {
			stroke: color,
		},
		to: {
			stroke: background,
		},
	});

	const terminalStyles = {
		marginRight: 8,
		line: {
			animation: `${terminalAnimation} 0.5s ease-in-out infinite`,
			animationDirection: 'alternate',
		},
	};

	if (location.pathname !== rootPath) {
		header = (
			<h2
				style={{
					marginTop: 0,
				}}
			>
				<Link
					style={{
						boxShadow: `none`,
						textDecoration: `none`,
						color: `inherit`,
						display: 'inline-flex',
						alignItems: 'flex-end',
					}}
					to="/"
				>
					<FiTerminal css={terminalStyles} /> Div’s Blog
				</Link>
			</h2>
		);
	}
	return (
		<div
			css={{
				marginLeft: location.pathname === rootPath ? 64 : `auto`,
				marginRight: location.pathname === rootPath ? 64 : `auto`,
				[mediaMax.small]: {
					marginLeft: 'auto',
					marginRight: 'auto',
				},
				maxWidth: rhythm(24),
				padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
				a: {
					color: 'inherit',
					textDecoration: 'none',
					transition: `border-color ${EASE_IN_OUT_TRANSITION}`,
					borderBottom: `1px dashed transparent`,
					'&:hover, &:focus': {
						borderBottomColor: color,
					},
				},
				blockquote: {
					color: secondary,
					borderColor: secondary,
				},
			}}
		>
			<header
				css={{
					display: 'flex',
					flexDirection: location.pathname === rootPath ? 'row-reverse' : 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				{header}
				<Button
					aria-label="Light and dark mode switch"
					circular
					onClick={toggleTheme}
					className="container"
					css={{
						background,
						transitionDuration: '0s',
						// delay background-color transition for nicer animation
						transitionDelay: theme === 'dark' ? '0s' : BACKGROUND_TRANSITION_TIME,
						transitionProperty: 'background-color, color',
					}}
				>
					{theme === 'light' ? <FiSun /> : <FiMoon />}
					<div
						className={theme}
						css={{
							position: 'absolute',
							background: darkTheme.background,
							borderRadius: '50%',
							width: 32,
							height: 32,
							zIndex: -1,
							transition: `transform ${BACKGROUND_TRANSITION_TIME} ease`,
							'&.dark': {
								transform: 'scale(150)',
							},
						}}
					/>
				</Button>
			</header>
			{location.pathname === rootPath && (
				<div
					css={{
						display: 'flex',
						marginBottom: rhythm(0.5),
					}}
				>
					<Link to="/about">About</Link>
				</div>
			)}
			<main>{children}</main>
			<Footer />
		</div>
	);
};

Layout.propTypes = {
	location: object.isRequired,
	children: node.isRequired,
};

export default Layout;
