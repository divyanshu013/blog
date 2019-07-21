import React from 'react';
import { Link, graphql } from 'gatsby';
import { object } from 'prop-types';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogInfo from '../components/BlogInfo';
import { rhythm } from '../utils/typography';
import { TEXT_PRIMARY, COLOR_PRIMARY } from '../utils/theme';

const BlogPost = ({ data, pageContext, location }) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;

	return (
		<Layout location={location} title={siteTitle}>
			<Seo
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
			/>
			<BlogInfo date={post.frontmatter.date} timeToRead={post.timeToRead} />
			<h1
				style={{
					marginTop: rhythm(1 / 4),
					marginBottom: rhythm(1),
				}}
			>
				{post.frontmatter.title}
			</h1>
			<div
				css={{
					a: {
						borderBottomColor: TEXT_PRIMARY,
						'&:hover, &:focus': {
							borderBottomStyle: 'solid',
						},
					},
				}}
				dangerouslySetInnerHTML={{ __html: post.html }}
			/>
			<hr
				style={{
					borderBottom: '1px solid #eee',
					height: 0,
					marginBottom: rhythm(1),
				}}
			/>
			<Bio />

			<ul
				style={{
					display: `flex`,
					flexWrap: `wrap`,
					justifyContent: `space-between`,
					listStyle: `none`,
					padding: 0,
				}}
			>
				<li>
					{previous && (
						<Link to={previous.fields.slug} rel="prev">
							← {previous.frontmatter.title}
						</Link>
					)}
				</li>
				<li>
					{next && (
						<Link to={next.fields.slug} rel="next">
							{next.frontmatter.title} →
						</Link>
					)}
				</li>
			</ul>
		</Layout>
	);
};

BlogPost.propTypes = {
	data: object.isRequired,
	pageContext: object.isRequired,
	location: object.isRequired,
};

export const pageQuery = graphql`
	query BlogPostBySlug($slug: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(fields: { slug: { eq: $slug } }) {
			id
			excerpt(pruneLength: 160)
			html
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
			}
			timeToRead
		}
	}
`;

export default BlogPost;
