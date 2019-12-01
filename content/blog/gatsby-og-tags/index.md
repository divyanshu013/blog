---
title: 'OG tags in Gatsby'
description: 'A comprehensive guide on implementing open graph tags in GatsbyJS.'
date: 2019-08-10
categories: ['gatsby']
ogImage: ./og-image.png
---

OG tags are `meta` tags for making a webpage compatible with the [open graph](https://ogp.me/) protocol. They're commonly used by social networking sites such as Facebook and Twitter to turn a simple link into rich content. For example, check out [this tweet](https://twitter.com/divyanshu013/status/1158223045535731712). Here's how to turn your blog links into rich content like the tweet.

## Add a SEO component

Most gatsby starters already have a `Seo` component which uses [`react-helmet`](https://github.com/nfl/react-helmet) to set appropriate `meta` tags in the document `head`. The [docs](https://www.gatsbyjs.org/docs/add-seo-component/) also have a guide in case you don't have a `Seo` component for your blog. These tags look like following in the document `head` (which you may also check by opening the HTML inspector on this page):

```html
<meta property="og:title" content="OG tags in Gatsby" />
<meta
	property="og:description"
	content="A comprehensive guide on implementing open graph tags in GatsbyJS."
/>
```

### Tweak for Twitter cards

`react-helmet` does the heavy lifting of rendering these tags in the document `head`. Here's my `Seo` component which is a tweaked version of the default `Seo` component that comes with the starter. The important bits are highlighted.

```jsx
// src/components/Seo.jsx

import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function Seo({ description, lang, meta, title, ogImage: ogImageProp }) {
	const { site, ogImageDefault } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
						siteUrl
					}
				}
				// highlight-start
				ogImageDefault: file(absolutePath: { regex: "/assets/og-image/" }) {
					childImageSharp {
						fixed(height: 630, width: 1200) {
							src
						}
					}
				}
				// highlight-end
			}
		`,
	);

	// highlight-start
	// use defaults if blog post did not provide any
	const metaDescription = description || site.siteMetadata.description;

	// the image url has to be an absolute url with http:// or https://
	// relative links do not work
	const ogImage =
		ogImageProp ||
		site.siteMetadata.siteUrl.concat(ogImageDefault.childImageSharp.fixed.src);

	const ogTitle = title || site.siteMetadata.title;
	// highlight-end

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={ogTitle}
			titleTemplate={title && `%s | ${site.siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: ogTitle,
				},
				{
					property: `og:description`,
					content: metaDescription,
				},
				{
					property: `og:type`,
					content: `website`,
				},
				{
					name: 'og:image',
					content: ogImage,
				},
				// highlight-start
				{
					name: `twitter:card`,
					content: `summary_large_image`,
				},
				// highlight-end
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: ogTitle,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				// highlight-start
				{
					name: 'twitter:image',
					content: ogImage,
				},
				// highlight-end
			].concat(meta)}
		/>
	);
}
```

For `twitter:image` OG tag, the recommended dimensions are **1200 \* 630** pixels. I created a default image at `/content/assets/og-image.png` and retrieved it in the component with the graphql query. Using `childImageSharp` ensures the image is optimized. An [important thing](https://stackoverflow.com/questions/9858577/open-graph-can-resolve-relative-url) to note is the `og-image` tag should have a `http://` or `https://` url. Relative links will not work everywhere. A simple trick to do this is prefixing the `siteUrl` to the image source.

The remaining tags that would be needed are `twitter:card` as `summary_large_image`, `twitter:title` and `twitter:description`. A complete list of tags is available on the [open graph protocol](https://ogp.me/) website.

Twitter has a [card validator](https://cards-dev.twitter.com/validator) which is helpful for debugging any bugs or issues with the meta tags.

## Add OG image for blog posts

The `Seo` component above already takes care of picking a default OG image in case the blog post template provides none. Using similar approach, for blog posts:

```jsx
// src/templates/BlogPost.jsx

import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ThemeProvider from '../components/ThemeProvider';
import ThemeContext from '../components/ThemeContext';

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
								// highlight-start
								ogImage={data.site.siteMetadata.siteUrl.concat(
									post.frontmatter.ogImage.childImageSharp.fixed.src,
								)}
								// highlight-end
							/>
							{/* rest of the stuff here */}
						</Layout>
					)}
				</ThemeContext.Consumer>
			</section>
		</ThemeProvider>
	);
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
				// highlight-start
				ogImage {
					childImageSharp {
						fixed(height: 630, width: 1200) {
							src
						}
					}
				}
				// highlight-end
			}
			timeToRead
		}
	}
`;

export default BlogPost;
```

I've added a new field in the frontmatter of my markdown files called `ogImage` (highlighted graphql query) which points to the OG image path for the blog post. The image source is then prefixed by the `siteUrl`. For example the frontmatter for this post looks like:

```md
title: 'OG tags in Gatsby'
description: 'A comprehensive guide on implementing open graph tags in GatsbyJS.'
date: 2019-08-09
categories: ['gatsby']
ogImage: ./og-image.png // highlight-line
```

## Summary

To summarize this blog post here's what I did:

1. Added a `Seo` component which sets the appropriate `meta` tags.
1. Included the OG image in the graphql query. The final url should be prefixed by the `siteUrl` which begins with `http://` or `https://`.
1. Added the OG images for blog posts in frontmatter and included the field in the graphql query.

## Related

- [Dark mode in Gatsby](/blog/gatsby-dark-mode/)
