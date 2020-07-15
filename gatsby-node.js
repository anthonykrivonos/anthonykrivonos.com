const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions
	fmImagesToRelative(node)

	if (node.internal.type === 'MarkdownRemark') {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}
  
exports.createPages = async ({ graphql, actions }) => {
  	const { createPage } = actions
	
	const result = await graphql(`
		query {
			allMarkdownRemark(filter: {frontmatter: {templateKey: {eq: "article"}}}) {
				edges {
					node {
						frontmatter {
							caption
							date
							subtitle
							tags
							templateKey
							title
							image {
								publicURL
							}
						}
						fields {
							slug
						}
					}
				}
			}
		}
	`)

	if (result.errors) {
		result.errors.forEach((e) => console.error(e.toString()))
		return result.errors
	}

	// Create article pages
	const articles = result.data.allMarkdownRemark.edges
	articles.forEach((edge) => {
		const id = edge.node.id
		const slug = edge.node.fields.slug
		const pagePath = `/article${slug}`
		createPage({
			path: pagePath,
			component: path.resolve(`src/templates/article/Article.tsx`),
			context: {
				id,
				slug,
			},
		})
	})
}