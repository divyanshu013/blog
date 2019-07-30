import React, { useEffect, useState } from 'react';
import { node } from 'prop-types';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';

import ThemeContext from './ThemeContext';
import {
	useTheme,
	getTheme,
	CUBIC_BEZIER_TRANSITION,
	BACKGROUND_TRANSITION_TIME,
} from '../utils/theme';

const ThemeProvider = ({ children }) => {
	const [theme, toggleTheme] = useTheme();
	const [key, forceUpdate] = useState(0);
	const currentTheme = getTheme(theme);
	const darkTheme = getTheme('dark');
	const { color } = currentTheme;
	useEffect(() => {
		forceUpdate(1);
		document.body.classList.remove('dark');
	}, []);
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<EmotionThemeProvider theme={currentTheme}>
				<Global
					styles={css({
						html: {
							scrollbarColor:
								theme === 'dark' ? `${darkTheme.muted} ${darkTheme.background}` : 'auto',
						},
						body: {
							// for rubber band effect in Chrome on MacOS and outside the scaled div with background color
							backgroundColor: currentTheme.background,
							transitionDelay: theme === 'dark' ? BACKGROUND_TRANSITION_TIME : '0s',
						},
						'body.dark': {
							'.container': {
								background: darkTheme.background,
								color: darkTheme.color,
							},
							'.muted': {
								color: darkTheme.muted,
							},
						},
					})}
				/>
				<div
					className="container"
					css={{
						color,
						transition: CUBIC_BEZIER_TRANSITION,
						zIndex: 1,
						position: 'relative',
						overflow: 'hidden',
					}}
					key={key}
				>
					{children}
				</div>
			</EmotionThemeProvider>
		</ThemeContext.Provider>
	);
};

ThemeProvider.propTypes = {
	children: node.isRequired,
};

export default ThemeProvider;
