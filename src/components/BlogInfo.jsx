import React, { useContext } from 'react';
import { number, string } from 'prop-types';
import { FiCoffee } from 'react-icons/fi';

import { getTheme } from '../utils/theme';
import ThemeContext from './ThemeContext';

const BlogInfo = ({ timeToRead, date }) => {
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	return (
		<div className="muted" css={{ display: 'flex', alignItems: 'center', color: muted }}>
			<small css={{ marginRight: 4 }}>
				{date} • {timeToRead} min read
			</small>
			{Array.from({ length: timeToRead / 7 + 1 }).map((item, index) => (
				<FiCoffee key={index} css={{ marginRight: 4 }} />
			))}
		</div>
	);
};

BlogInfo.propTypes = {
	timeToRead: number.isRequired,
	date: string.isRequired,
};

export default BlogInfo;
