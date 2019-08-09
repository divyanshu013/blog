---
title: 'Dark mode in Gatsby'
description: 'A comprehensive guide on implementing dark mode in GatsbyJS.'
date: 2019-07-28
categories: ['gatsby', 'react', 'emotion', 'ssr', 'css']
ogImage: ./og-image.png
---

I recently migrated my blog from [Medium](https://medium.com/@divyanshu013) to **GatsbyJS**. One of the reasons was to make it more customizable (hello dark mode). However, adding dark mode wasn’t quite straightforward so I decided to document the approach in case anyone else were interested.

## Problems

I was primarily interested in a few things:

1. A nice dark theme easy on the eyes
1. A switch to toggle between light and dark mode
1. Persist the theme setting in the browser `localStorage`
1. No visible [Flash of Unstyled Content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) (FoUC)
1. A nice animation to transition the theme

> tl;dr - My blog is [open-source](https://github.com/divyanshu013/blog) if you prefer the code without exposition. For the complete story, please read on…

## Deciding a theme

I wanted a minimal design for my blog with a simple dark theme. According to [material design](https://material.io/design/color/dark-theme.html):

> Dark themes reduce the luminance emitted by device screens, while still meeting minimum color contrast ratios. They help improve visual ergonomics by reducing eye strain…

After searching around the internet with my novice designer skills, _for the perfect dark theme_, [material design](https://material.io/design/color/dark-theme.html) looked quite promising. Its easy on the eyes and has a good contrast ratio. The docs also have a concise guideline to choosing colors.

## Hooking up the theme

Since I wanted to use the theme across multiple components I created a reusable hook:

```js
// src/utils/theme.js

import { useState, useEffect } from 'react';

/**
 * A hook to get and update the current theme for dark mode
 * @returns [theme, toggleTheme] - [current theme, function to toggle theme]
 */
export const useTheme = () => {
	const storedTheme =
		typeof window !== 'undefined' && window.localStorage.getItem('theme');
	const [theme, setTheme] = useState(storedTheme || 'light');
	const toggleTheme = () =>
		setTheme(prevTheme => {
			return prevTheme === 'light' ? 'dark' : 'light';
		});
	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem('theme', theme);
		}
	}, [theme]);
	return [theme, toggleTheme];
};
```

Next, I created a function to get the theme tokens based on the received theme:

```js
// src/utils/theme.js

export const getTheme = theme =>
	theme === 'light'
		? {
				background: '#fff',
				color: 'hsla(0, 0%, 0%, 0.8)',
				secondary: 'hsla(0, 0%, 0%, 0.7)',
				muted: 'hsla(0, 0%, 0%, 0.6)',
				borderColor: '#eee',
				borderHoverColor: 'transparent',
		  }
		: {
				background: '#121212',
				color: 'hsla(0, 0%, 100%, 0.87)',
				secondary: 'hsla(0, 0%, 100%, 0.75)',
				muted: 'hsla(0, 0%, 100%, 0.60)',
				borderColor: 'hsla(0, 0%, 100%, 0.60)',
				borderHoverColor: COLOR_PRIMARY,
		  };
```

## Creating a theme context

Since the theme has to be shared amongst all child components, I created a theme context:

```jsx
// src/components/ThemeContext.jsx

import { createContext } from 'react';

const ThemeContext = createContext();

export default ThemeContext;
```

This simply creates a context with no default value. I'll use it to pass the current theme and a function to toggle it. Any child component would then be able to `useContext` to render appropriately based on the current theme.

## Creating a theme provider

Here's how my context provider look which also sets the background color based on the currently active theme. I'll use this at the root level and pass my [layout component](https://www.gatsbyjs.org/docs/layout-components/) as a child:

```jsx
// src/components/ThemeProvider.jsx

import React, { useEffect, useState } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';

import ThemeContext from './ThemeContext';
import {
	useTheme,
	getTheme,
	CUBIC_BEZIER_TRANSITION,
	BACKGROUND_TRANSITION_TIME,
} from '../utils/theme';
import PRISM_THEME_LIGHT from '../styles/prism-theme-light';
import PRISM_THEME_DARK from '../styles/prism-theme-dark';

const ThemeProvider = ({ children }) => {
	const [theme, toggleTheme] = useTheme();
	const currentTheme = getTheme(theme);
	const darkTheme = getTheme('dark');
	const { color } = currentTheme;
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<EmotionThemeProvider theme={currentTheme}>
				<Global
					styles={css({
						html: {
							scrollbarColor:
								theme === 'dark'
									? `${darkTheme.muted} ${darkTheme.background}`
									: 'auto',
						},
						body: {
							// for rubber band effect in Chrome on MacOS
							// and outside the scaled div with background color
							backgroundColor: currentTheme.background,
						},
					})}
				/>
				<Global
					// set syntax highlighting theme
					styles={css(theme === 'dark' ? PRISM_THEME_DARK : PRISM_THEME_LIGHT)}
				/>
				<div
					css={{
						color,
						transition: CUBIC_BEZIER_TRANSITION,
						zIndex: 1,
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					{children}
				</div>
			</EmotionThemeProvider>
		</ThemeContext.Provider>
	);
};
```

The `ThemeProvider` take care of setting the background color of `body` based on the currently active theme and works fine as a basic implementation. However, there is a problem with the above approach.

### Flash of Unstyled Content

The theme is being loaded and applied after React renders the component. However, Gatsby generates a HTML file for each blog post at [build time](https://www.gatsbyjs.org/docs/quick-start/#create-a-production-build) which is requested when you visit the route (check your `/public` directory). That's one of the reasons Gatsby is so fast. Content is loaded before javascript. When javascript loads and is parsed, React [hydrates](https://reactjs.org/docs/react-dom.html#hydrate) the components.

Since at build time, Gatsby is unaware of the `localStorage` and hence the currently active theme, the pages are created with a default _light_ theme via the `useTheme` hook. Thus the initial HTML generated from components follow the _light_ theme. As soon as the browser receives the initial HTML payload, it renders the content following the _light_ theme. When javascript loads and React hydrates the component the next render would update the background and colors to correctly reflect the theme.

If you were on _light_ theme, it doesn't matter much. However, if you had _dark_ theme currently active, the page would briefly render with the _light_ theme and switch to the _dark_ theme after a delay (when javascript has been parsed and React renders the component correctly). This results in a bad experience often termed [FoUC](https://en.wikipedia.org/wiki/Flash_of_unstyled_content).

## Fixing the FoUC

In order to resolve this reliably, the correct styles have to be somehow loaded before the content is displayed by the browser. Since javascript for rendering the component is executed after the content loads, this has to be done before the script loads.

I'm using [Emotion](https://emotion.sh/docs/introduction) as my CSS-in-JS library. It extracts the critical CSS out from the components and puts it before the markup in the final HTML build. If I can check the `localStorage` before rest of the content is parsed, I can use it to apply a `class` to the body. The components can then style elements correctly in dark mode using the `className` property if the body has a `class` of `dark`.

### 1. Script to apply dark mode class

Gatsby has a variety of SSR APIs. I'm using the [`onRenderBody`](https://www.gatsbyjs.org/docs/ssr-apis/#onRenderBody) API to add a script before the body. This should be added in the `gatsby-ssr.js` file:

```js
// gatsby-ssr.js

import { createElement } from 'react';

const applyDarkModeClass = `
(function() {
  try {
    var mode = localStorage.getItem('theme');
    if (mode === 'dark') {
			document.body.classList.add('dark');
		}
  } catch (e) {}
})();
`;

export const onRenderBody = ({ setPreBodyComponents }) => {
	const script = createElement('script', {
		dangerouslySetInnerHTML: {
			__html: applyDarkModeClass,
		},
	});
	setPreBodyComponents([script]);
};
```

This script will take care of applying a `dark` class to the body.

### 2. CSS rules

CSS rules should be added to elements which we care about styling correctly on the initial load. Here's how the `ThemeProvider` looks after adding these along with `className`:

```jsx
// src/components/ThemeProvider.jsx

const ThemeProvider = ({ children }) => {
	const [theme, toggleTheme] = useTheme();
	const currentTheme = getTheme(theme);
	const darkTheme = getTheme('dark');
	const { color } = currentTheme;
	// highlight-starts
	const [key, forceUpdate] = useState(0);
	useEffect(() => {
		// let react take care of dynamic styles
		forceUpdate(1);
		// after mounting, remove the class from body
		document.body.classList.remove('dark');
	}, []);
	// highlight-ends
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<EmotionThemeProvider theme={currentTheme}>
				<Global
					styles={css({
						html: {
							scrollbarColor:
								theme === 'dark'
									? `${darkTheme.muted} ${darkTheme.background}`
									: 'auto',
						},
						body: {
							// for rubber band effect in Chrome on MacOS
							// and outside the scaled div with background color
							backgroundColor: currentTheme.background,
							// highlight-starts
							// add transition delay only after initial rendering
							// for continuing reading while maintaining
							// scroll position in dark mode on refresh
							transitionDelay:
								theme === 'dark' && key === 1
									? BACKGROUND_TRANSITION_TIME
									: '0s',
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
						// highlight-ends
					})}
				/>
				<Global
					styles={css(theme === 'dark' ? PRISM_THEME_DARK : PRISM_THEME_LIGHT)}
				/>
				<div
					css={{
						color,
						transition: CUBIC_BEZIER_TRANSITION,
						zIndex: 1,
						position: 'relative',
						overflow: 'hidden',
					}}
					// highlight-starts
					className="container"
					key={key}
					// highlight-ends
				>
					{children}
				</div>
			</EmotionThemeProvider>
		</ThemeContext.Provider>
	);
};
```

You might have noticed the `useEffect`. It serves a couple of purposes:

1. Remove the `dark` class which was added to the body tag.
1. Force an update when the component mounts. After the component mounts we can take care of styles dynamically without relying on `className` property.

The `div` surrounding `children` has a `container` class which takes care of styling it correctly on initial load, therefore fixing the FoUC. After the component mounts, the added `dark` class on body is removed and styling happens dynamically via javascript.

## Animating background transition

A simple trick to smoothen transition between light and dark mode is to add a transition all CSS property, for example:

```css
body {
	transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

I was inspired by the animations from [Darkmode.js](https://darkmodejs.learn.uno/) and tried to implement something similar. In my [`Layout`](https://www.gatsbyjs.org/docs/layout-components/) component I added a dark mode switch that also animates when switching themes.

```jsx
// src/components/Layout.jsx

import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { FiTerminal, FiSun, FiMoon } from 'react-icons/fi';

import ThemeContext from './ThemeContext';
import Button from './Button';
import { rhythm } from '../utils/typography';
import { BACKGROUND_TRANSITION_TIME, EASE_IN_OUT_TRANSITION, getTheme } from '../utils/theme';

const Layout = ({ location, children }) => {
	const rootPath = `${__PATH_PREFIX__}/`;
	let header;
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { color, background, secondary } = getTheme(theme);
	const darkTheme = getTheme('dark');

	if (location.pathname !== rootPath) {
		header = (
			// the header title et al
		);
	}
	return (
		<div
			css={{
				// layout styles
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
				// highlight-start
				<Button
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
				// highlight-end
			</header>
			<main>{children}</main>
		</div>
	);
};

export default Layout;
```

The [`scale`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale) transformation applies a circular animation while switching themes. After a brief transition delay (which gives enough time for the circle to cover the screen), the `ThemeProvider` component sets the background color on the `body` tag

## Theming components

Similarly you may theme all the components. Read the theme from the context and apply the theme tokens (color, background, etc…). If you're using a CSS-in-JS library such as [Emotion](https://emotion.sh) or [styled components](https://www.styled-components.com/), it's possible to directly read the theme.

I'm using the [theme provider](https://emotion.sh/docs/emotion-theming#themeprovider-reactcomponenttype) from Emotion in my `ThemeProvider` component which passes all theme properties. Here's how my `Button` component look using the [`styled`](https://emotion.sh/docs/styled) API.

```jsx
// src/components/Button.jsx

import styled from '@emotion/styled';

import { COLOR_PRIMARY, CUBIC_BEZIER_TRANSITION } from '../utils/theme';

const Button = styled('button')(props => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: props.circular ? '50%' : 4,
	background: 'transparent',
	border: `1px solid ${props.theme.borderColor}`, // highlight-line
	padding: props.circular ? 16 : '16px 32px',
	transition: CUBIC_BEZIER_TRANSITION,
	cursor: 'pointer',
	color: 'inherit',
	'&:hover, &:focus': {
		outline: 0,
		color: COLOR_PRIMARY,
		boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)',
		borderColor: props.theme.borderHoverColor, // highlight-line
	},
}));

export default Button;
```

## Summary

Although, this article is based on Gatsby, a similar approach can be used for any React application especially with SSR. You may also check out the entire source code in the [GitHub repo](https://github.com/divyanshu013/blog).
