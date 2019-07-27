import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { node, object } from 'prop-types';
import { mediaMax } from '@divyanshu013/media';
import { FiTerminal, FiSun, FiMoon } from 'react-icons/fi';

import ThemeContext from './ThemeContext';
import Button from './Button';
import { rhythm } from '../utils/typography';
import { EASE_IN_OUT_TRANSITION, TEXT_PRIMARY, getTheme } from '../utils/theme';

const Layout = ({ location, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { background } = getTheme(theme);
	const darkTheme = getTheme('dark');

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
					<FiTerminal css={{ marginRight: 8 }} /> Div’s Blog
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
					transition: EASE_IN_OUT_TRANSITION,
					borderBottom: `1px dashed transparent`,
					'&:hover, &:focus': {
						borderBottomColor: TEXT_PRIMARY,
					},
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
					circular
					onClick={toggleTheme}
					css={{
						background,
						transitionDuration: '0s',
						// delay background-color transition for nicer animation
						transitionDelay: theme === 'dark' ? '0s' : '0.75s',
						transitionProperty: 'background-color',
					}}
				>
					{theme === 'light' ? <FiSun /> : <FiMoon />}
					<div
						className={theme}
						css={{
							position: 'fixed',
							background: darkTheme.background,
							borderRadius: '50%',
							width: 32,
							height: 32,
							zIndex: -1,
							transition: 'transform 0.75s ease',
							'&.dark': {
								transform: 'scale(200)',
							},
						}}
					/>
				</Button>
			</header>
			<main>{children}</main>
		</div>
	);
};

Layout.propTypes = {
	location: object.isRequired,
	children: node.isRequired,
};

export default Layout;
