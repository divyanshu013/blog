import React from 'react';
import { node } from 'prop-types';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import ThemeContext from './ThemeContext';
import { useTheme, getTheme, CUBIC_BEZIER_TRANSITION } from '../utils/theme';

const ThemeProvider = ({ children }) => {
	const [theme, toggleTheme] = useTheme();
	const themeObject = getTheme(theme);
	const { background, color } = themeObject;
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<EmotionThemeProvider theme={themeObject}>
				<div css={{ background, color, transition: CUBIC_BEZIER_TRANSITION }}>{children}</div>
			</EmotionThemeProvider>
		</ThemeContext.Provider>
	);
};

ThemeProvider.propTypes = {
	children: node.isRequired,
};

export default ThemeProvider;
