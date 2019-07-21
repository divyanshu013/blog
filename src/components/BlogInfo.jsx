import React from 'react';
import { number, string } from 'prop-types';
import { FiCoffee } from 'react-icons/fi';

import { TEXT_MUTED } from '../utils/theme';

const BlogInfo = ({ timeToRead, date }) => (
	<div css={{ display: 'flex', alignItems: 'center', color: TEXT_MUTED }}>
		<small css={{ marginRight: 4 }}>
			{date} • {timeToRead} min read
		</small>
		{Array.from({ length: timeToRead / 7 + 1 }).map((item, index) => (
			<FiCoffee key={index} />
		))}
	</div>
);

BlogInfo.propTypes = {
	timeToRead: number.isRequired,
	date: string.isRequired,
};

export default BlogInfo;
