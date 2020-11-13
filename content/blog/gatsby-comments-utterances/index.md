---
title: 'Adding comments to Gatsby with Utterances'
description: 'How I added comments backed by GitHub on my Gatsby blog with utteranc.es'
date: 2020-11-13
categories: ['gatsby', 'react']
ogImage: ./og-image.png
---

For quite some time I've had my eyes set on this awesome project - [utteranc.es](https://utteranc.es/). It seemed to be the perfect fit for my needs - a lightweight client side comments system with control over data.

## Comments component

I created a `Comments` component which inserts the `script` tag for loading `utteranc.es` into the DOM.

> **Note**
>
> Rendering a `script` tag in JSX [doesn't work as expected](https://stackoverflow.com/a/64815699/4952669)

```jsx
// Comments.jsx

import React, { useContext, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ThemeContext from './ThemeContext';

const commentNodeId = 'comments';

const Comments = () => {
	// this query is for retrieving the repo name from gatsby-config
	const data = useStaticQuery(graphql`
		query RepoQuery {
			site {
				siteMetadata {
					repo
				}
			}
		}
	`);
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		// docs - https://utteranc.es/
		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', data.site.siteMetadata.repo);
		script.setAttribute('issue-term', 'pathname');
		script.setAttribute('label', 'comment :speech_balloon:');
		script.setAttribute(
			'theme',
			theme === 'dark' ? 'github-dark' : 'github-light',
		);
		script.setAttribute('crossorigin', 'anonymous');

		const scriptParentNode = document.getElementById(commentNodeId);
		scriptParentNode.appendChild(script);

		return () => {
			// cleanup - remove the older script with previous theme
			scriptParentNode.removeChild(scriptParentNode.firstChild);
		};
	}, [data, theme]);

	return <div id={commentNodeId} />;
};

export default Comments;
```

Since my blog has a light and dark theme, in the `useEffect` cleanup I'm removing the older comments script and loading the new one for the current active theme. There's an [alternate way](https://github.com/utterance/utterances/issues/401) of loading only the CSS for `utteranc.es` but it's an undocumented API and could change in the future.

So currently switching the blog's theme would reload the script but with browser caching the requests, it should do fine till there is a better solution.

And that's pretty much it.
