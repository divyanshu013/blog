import React, { useContext, useEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ThemeContext from './ThemeContext';

const commentNodeId = 'comments';

const Comments = () => {
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
		const script = document.createElement('script');
		script.src = 'https://utteranc.es/client.js';
		script.async = true;
		script.setAttribute('repo', data.site.siteMetadata.repo);
		script.setAttribute('issue-term', 'pathname');
		script.setAttribute('label', 'comment :speech_balloon:');
		script.setAttribute('theme', theme === 'dark' ? 'github-dark' : 'github-light');
		script.setAttribute('crossorigin', 'anonymous');

		const scriptParentNode = document.getElementById(commentNodeId);
		scriptParentNode.appendChild(script);

		return () => {
			scriptParentNode.removeChild(scriptParentNode.firstChild);
		};
	}, [data, theme]);

	return <div id={commentNodeId} />;
};

export default Comments;
