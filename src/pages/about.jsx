import React from 'react';
import { graphql } from 'gatsby';
import { object } from 'prop-types';

import ThemeProvider from '../components/ThemeProvider';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const AboutPage = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;

	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<Layout location={location} title={siteTitle}>
					<Seo title="About" />
					<div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
				</Layout>
			</section>
		</ThemeProvider>
	);
};

AboutPage.propTypes = {
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
		markdownRemark(fileAbsolutePath: { regex: "/about/" }) {
			frontmatter {
				title
			}
			html
		}
	}
`;

export default AboutPage;
