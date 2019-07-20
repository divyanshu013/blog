import React from 'react';
import { Link, graphql } from 'gatsby';
import { object } from 'prop-types';

import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { rhythm } from '../utils/typography';

const BlogIndex = ({ data, location }) => {
	const siteTitle = data.site.siteMetadata.title;
	const posts = data.allMarkdownRemark.edges;

	return (
		<section
			css={{
				display: 'grid',
				gridTemplateColumns: 'auto 1fr',
				height: '100%',
				minHeight: '100vh',
				maxWidth: 1200,
				margin: '0 auto',
			}}
		>
			<Sidebar />
			<Layout location={location} title={siteTitle}>
				<Seo title="Home" />
				{posts.map(({ node }) => {
					const title = node.frontmatter.title || node.fields.slug;
					return (
						<div key={node.fields.slug}>
							<h3
								style={{
									marginBottom: rhythm(1 / 4),
								}}
							>
								<Link style={{ boxShadow: `none` }} to={node.fields.slug}>
									{title}
								</Link>
							</h3>
							<small>{node.frontmatter.date}</small>
							<p
								dangerouslySetInnerHTML={{
									__html: node.frontmatter.description || node.excerpt,
								}}
							/>
						</div>
					);
				})}
			</Layout>
		</section>
	);
};

BlogIndex.propTypes = {
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
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "MMMM DD, YYYY")
						title
						description
					}
				}
			}
		}
	}
`;

export default BlogIndex;
