import { getTheme, COLOR_PRIMARY } from '../theme';

describe('theme utils', () => {
	it('returns the light theme palette', () => {
		const theme = getTheme('light');

		expect(theme.color).toBeTruthy();
		expect(theme.background).toBeTruthy();
		expect(COLOR_PRIMARY).toBeTruthy();
	});

	it('returns the dark theme palette', () => {
		const theme = getTheme('dark');

		expect(theme.background).not.toEqual(getTheme('light').background);
	});
});
