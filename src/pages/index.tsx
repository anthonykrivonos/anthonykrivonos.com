import React, { Component } from "react"
import { Router, RouteComponentProps } from "@reach/router"
import { graphql } from 'gatsby'

import { Home, Article } from '../templates'
import { Article as ArticleInterface } from '../models'

export interface PageProps extends RouteComponentProps {
	data?:any
}

export class App extends Component<PageProps> {

	public render = () => {
		const articles = this.getArticles()
		console.log(articles)
		return (
			<Router>
				{
					articles.map((article, i) => (
						<Article key={`article-${i}`} path={`/article${article.slug}`} article={article} />
					))
				}
                <Home exact path={'/'} articles={articles} />
			</Router>
		)
	}

	private getArticles = ():ArticleInterface[] => {
        const data = this.props.data
		const posts = data.allMarkdownRemark.edges
		const slugs = posts.map(post => post.node.fields.slug)
		const articles = posts.map((post, i) => {
			const articleFields = post.node.frontmatter
			articleFields.slug = slugs[i]
			articleFields.image = articleFields.image.publicURL
			return articleFields as ArticleInterface
		})
		return articles
	}

}

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
`

export default App