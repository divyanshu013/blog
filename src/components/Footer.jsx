import React, { useEffect, useState, useContext } from 'react';
import { getRandom } from '@divyanshu013/inspirational-quotes';
import { FaQuoteLeft } from 'react-icons/fa';
import { mediaMin } from '@divyanshu013/media';

import ThemeContext from './ThemeContext';
import { getTheme } from '../utils/theme';

const Footer = () => {
	const [quote, setQuote] = useState(null);
	useEffect(() => setQuote(getRandom()), []);
	const { theme } = useContext(ThemeContext);
	const { muted } = getTheme(theme);
	return (
		<footer
			css={{
				fontFamily: 'Zilla Slab',
				color: muted,
				display: 'grid',
				gridTemplateColumns: 'auto 1fr',
				gridGap: 16,
				[mediaMin.medium]: {
					marginLeft: -32,
				},
			}}
		>
			<FaQuoteLeft />
			<div>
				<div css={{ fontStyle: 'italic' }}>
					{quote?.quote} - {quote?.author}
				</div>
				<small css={{ fontFamily: 'Open Sans' }}>{quote?.source}</small>
			</div>
		</footer>
	);
};

export default Footer;
