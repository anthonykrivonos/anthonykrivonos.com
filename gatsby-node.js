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

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions
	const typeDefs = `
		type Article {
			title: String!
			subtitle: String!
			caption: String
			imageUrl: String!
			tags: [String!]
			markdownBody: String!
			slug: String!
		}
	`
	createTypes(typeDefs)
}
  
exports.createPages = ({ actions, page }) => {
  	// const { createPage } = actions
	
	//   createPage(page)
	
	// return graphql(`
	// 	{
	// 		allMarkdownRemark(limit: 1000) {
	// 			edges {
	// 				node {
	// 					id
	// 					fields {
	// 						slug
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// `).then((result) => {
	// 	if (result.errors) {
	// 	result.errors.forEach((e) => console.error(e.toString()))
	// 	return Promise.reject(result.errors)
	// 	}

	// 	const articles = result.data.allMarkdownRemark.edges

	// 	articles.forEach((edge) => {
	// 	const id = edge.node.id
	// 	createPage({
	// 		path: edge.node.fields.slug,
	// 		component: path.resolve(
	// 			`src/templates/article-${String(edge.node.fields.slug)}.tsx`
	// 		),
	// 		// additional data can be passed via context
	// 		context: {
	// 			id,
	// 		},
	// 	})
	// 	})
	// })
}