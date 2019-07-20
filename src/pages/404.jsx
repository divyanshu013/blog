import React from 'react';
import { graphql } from 'gatsby';
import { object } from 'prop-types';

import Layout from '../components/Layout';
import Seo from '../components/Seo';

const NotFoundPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<Layout location={location} title={siteTitle}>
			<Seo title="404: Not Found" />
			<h1>Not Found</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Layout>
	);
};

NotFoundPage.propTypes = {
	data: object.isRequired,
	location: object.isRequired,
};

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`;

export default NotFoundPage;
