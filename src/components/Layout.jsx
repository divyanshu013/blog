import React from 'react';
import { Link } from 'gatsby';
import { node, object, string } from 'prop-types';
import { mediaMax } from '@divyanshu013/media';

import { rhythm } from '../utils/typography';
import { EASE_IN_OUT_TRANSITION, TEXT_PRIMARY } from '../utils/theme';

const Layout = ({ location, title, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;

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
					}}
					to="/"
				>
					{title}
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
			<header>{header}</header>
			<main>{children}</main>
		</div>
	);
};

Layout.propTypes = {
	location: object.isRequired,
	title: string.isRequired,
	children: node.isRequired,
};

export default Layout;
