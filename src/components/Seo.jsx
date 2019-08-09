import React from 'react';
import PropTypes from 'prop-types';
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
				ogImageDefault: file(absolutePath: { regex: "/assets/og-image/" }) {
					childImageSharp {
						fixed(height: 630, width: 1200) {
							src
						}
					}
				}
			}
		`,
	);

	const metaDescription = description || site.siteMetadata.description;
	const ogImage =
		ogImageProp || `${site.siteMetadata.siteUrl}/${ogImageDefault.childImageSharp.fixed.src}`;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title || site.siteMetadata.title}
			titleTemplate={title && `%s | ${site.siteMetadata.title}`}
			meta={[
				{
					name: `description`,
					content: metaDescription,
				},
				{
					property: `og:title`,
					content: title,
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
				{
					name: `twitter:card`,
					content: `summary_large_image`,
				},
				{
					name: `twitter:creator`,
					content: site.siteMetadata.author,
				},
				{
					name: `twitter:title`,
					content: title,
				},
				{
					name: `twitter:description`,
					content: metaDescription,
				},
				{
					name: 'twitter:image',
					content: ogImage,
				},
			].concat(meta)}
		/>
	);
}

Seo.defaultProps = {
	lang: `en`,
	meta: [],
	description: ``,
};

Seo.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string,
	ogImage: PropTypes.string,
};

export default Seo;
