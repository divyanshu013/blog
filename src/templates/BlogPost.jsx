import React from 'react';
import { Link, graphql } from 'gatsby';
import { object } from 'prop-types';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogInfo from '../components/BlogInfo';
import { rhythm } from '../utils/typography';
import ThemeProvider from '../components/ThemeProvider';
import ThemeContext from '../components/ThemeContext';
import { getTheme } from '../utils/theme';

const BlogPost = ({ data, pageContext, location }) => {
	const post = data.markdownRemark;
	const siteTitle = data.site.siteMetadata.title;
	const { previous, next } = pageContext;

	return (
		<ThemeProvider>
			<section css={{ height: '100%', minHeight: '100vh' }}>
				<ThemeContext.Consumer>
					{({ theme }) => (
						<Layout location={location} title={siteTitle}>
							<Seo
								title={post.frontmatter.title}
								description={post.frontmatter.description || post.excerpt}
								ogImage={data.site.siteMetadata.siteUrl.concat(
									post.frontmatter.ogImage.childImageSharp.fixed.src,
								)}
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
										borderBottomColor: getTheme(theme).color,
										'&:hover, &:focus': {
											borderBottomStyle: 'solid',
											borderBottomColor: getTheme(theme).color,
										},
									},
								}}
								dangerouslySetInnerHTML={{ __html: post.html }}
							/>
							<hr
								style={{
									borderBottom: `1px solid ${getTheme(theme).borderColor}`,
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
									margin: `${rhythm(1)} 0`,
								}}
							>
								<li>
									{previous && (
										<h4>
											<Link to={previous.fields.slug} rel="prev">
												← {previous.frontmatter.title}
											</Link>
										</h4>
									)}
								</li>
								<li>
									{next && (
										<h4>
											<Link to={next.fields.slug} rel="next">
												{next.frontmatter.title} →
											</Link>
										</h4>
									)}
								</li>
							</ul>
						</Layout>
					)}
				</ThemeContext.Consumer>
			</section>
		</ThemeProvider>
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
				siteUrl
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
				ogImage {
					childImageSharp {
						fixed(height: 630, width: 1200) {
							src
						}
					}
				}
			}
			timeToRead
		}
	}
`;

export default BlogPost;
