import React, { Component } from "react"
import { Router, RouteComponentProps } from "@reach/router"
import { graphql } from 'gatsby'
import ReactGA from 'react-ga'

import { Home, Article } from '../templates'
import { Article as ArticleInterface } from '../models'

export interface PageProps extends RouteComponentProps {
	data?:any
}

export class App extends Component<PageProps> {

	private articles!: ArticleInterface[]

	constructor (props: any) {
		super(props)
		this.articles = this.getArticles()
	}

	public componentDidMount = () => {
		try {
			ReactGA.initialize(process.env.GATSBY_GA_TRACKING_ID!)
			ReactGA.pageview(window.location.pathname + window.location.search)
		} catch {
			console.error('Could not load Google Analytics')
		}
	}

	public render = () => {
		const articles = this.articles
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
        console.log(posts)
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
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: {frontmatter: {templateKey: {eq: "article"}}}) {
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