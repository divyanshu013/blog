import React from 'react';
import { render, screen } from '@testing-library/react';

import BlogInfo from '../BlogInfo';
import ThemeContext from '../ThemeContext';

const renderWithTheme = (ui, theme = 'light') =>
	render(
		<ThemeContext.Provider value={{ theme, toggleTheme: jest.fn() }}>{ui}</ThemeContext.Provider>,
	);

describe('BlogInfo', () => {
	it('renders the date and reading time', () => {
		renderWithTheme(<BlogInfo date="July 24, 2026" timeToRead={5} />);

		expect(screen.getByText(/July 24, 2026/)).toBeInTheDocument();
		expect(screen.getByText(/5 min read/)).toBeInTheDocument();
	});
});
