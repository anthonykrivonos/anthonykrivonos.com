import React, { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { graphql } from 'gatsby'
import $ from 'jquery'
import ReactGA from 'react-ga'

import { Article as ArticleInterface } from '../../models'
import { Wrapper, View, CacheImage, Tag, Footer, Button } from '../../components'
import { Page } from '../Page'
import { Navigation, DeviceUtil } from '../../utils'
import './Article.sass'
import '../../App.sass'
import { addClasses } from '../../constants'
import { Link } from 'gatsby';

interface ArticleProps {
    article?: ArticleInterface
    isPreview?: boolean
    data?: any
}

export default class Article extends Page<ArticleProps> {

    private article: ArticleInterface

    constructor(props:any) {
        super(props)
        DeviceUtil.onReady(() => {
            $('.article.container').css('opacity', 0)
            $('.article.container').animate({
                opacity: 1
            }, 250)
        })
        this.article = this.getArticle()
    }

    public componentDidMount = () => {
        $(document).ready(() => {
            $('.article-image-container-cover').on('dragstart', () => false)
            $(document).scroll(function() {
                const scrollHeight = this.scrollingElement?.scrollTop || 0
                const opacity = Math.min(1, Math.max(0, (window.innerHeight - scrollHeight * 2) / window.innerHeight))
                const scale = 1 + Math.min(1, Math.max(0, scrollHeight / window.innerHeight))
                $('.article-image-container-cover').css('opacity', opacity)
                $('.article-image-container-cover').find('.article-image').css('transform', `scale(${scale})`)
                $('.article-image').css('opacity', 0)
                $('.article-image').css('opacity', 1)
            })
        })
        try {
			ReactGA.pageview(window.location.pathname + window.location.search)
        } catch {
            console.error('Could not record page view in Google Analytics')
        }
    }

    public renderDesktop = ():ReactNode => {
        const article = this.article
        const isPreview = this.props.isPreview
        return (
            <Wrapper className={'w-100'}>
                <View className={`article-image-container article-image-container-cover w-100`}>
                    <CacheImage className={`article-image w-100 h-100`} src={article.image} alt={article.title} />
                </View>
                <View className={'article-container-offset bg-white'}>
                    <ArticleInner isPreview={isPreview} article={article} isMobile={false} />
                </View>
            </Wrapper>
        )
    }

    public renderMobile = ():ReactNode => {
        const article = this.article
        const isPreview = this.props.isPreview
        return (
            <Wrapper className={'w-100'}>
                <View className={`article-image-container article-image-container-cover w-100`}>
                    <CacheImage className={`article-image w-100 h-100`} src={article.image} alt={article.title} />
                </View>
                <View className={'article-container-offset bg-white'}>
                    <ArticleInner isPreview={isPreview} article={article} isMobile={true} />
                </View>
            </Wrapper>
        )
    }

    private getArticle = ():ArticleInterface => {
        if (this.props.article) {
            return this.props.article
        }
        const articleFields = this.props.data.markdownRemark
        const article = articleFields.frontmatter
        article.slug = articleFields.fields.slug
        article.image = article.image.publicURL
        article.body = articleFields.rawMarkdownBody
        return article
    }

    public static defaultProps = {
        isPreview: false
    }

}

const ArticleInner = ({ isPreview, article, isMobile }) => (
    <View className={addClasses('article', isMobile ? 'container-fluid pl-3 pr-3' : 'container')}>
        <View className={'pt-4'}>
            {
                !isPreview &&
                <Link
                    to={'/'}
                    style={{ textDecoration: 'none' }}
                    children={<View className={'color-primary font-title weight-bold'}>{"↩ Go Back"}</View>}
                />
            }
            <View className={'font-header weight-black h1'}>{article.title}</View>
            <View className={'article-line bg-light mt-4 mb-3'} />
            <View className={'d-flex align-items-center'}>
                <View>
                    <View className={'font-title weight-bold h5'}>{article.subtitle}</View>
                    { article.caption && <View className={'text-upper weight-bold font-italic color-light'}>{article.caption}</View> }
                </View>
                { article.tags && <View className={'text-right flex-1'}>
                    {
                        article.tags.map(tag => (
                            <Tag key={`tag-${tag}`} name={tag} />
                        ))
                    }
                </View> }
            </View>
            <View className={'article-line bg-light w-100 mt-4 mb-4'} />
            <View className={'article-body'}>
                <ArticleMarkdown body={article.body} />
            </View>
            <Footer />
        </View>
    </View>
)

const ArticleMarkdown = ({ body }) => (
    <ReactMarkdown
        source={body}
        escapeHtml={false}
        renderers={{
            heading: props => <View {...props} className={'font-header weight-bold'} style={{
                fontSize: `${1.2 + 1/props.level}em`,
                marginTop: `${2.6/props.level}em`,
                marginBottom: `${0.8/props.level}em`,
            }} />,
            hr: () => <View className={'article-line bg-light w-100 mt-4 mb-3'} />,
            blockquote: props => <View {...props} className={'article-blockquote'} />,
            emphasis: props => <View inline {...props} className={'font-italic font-title weight-regular'} />,
        }}
    />
)

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            rawMarkdownBody
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
`
