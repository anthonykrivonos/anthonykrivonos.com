import React, { ReactNode, ComponentProps } from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import $ from 'jquery'

import { Article as ArticleInterface } from '../../models'
import { Wrapper, View, CacheImage, Tag, Footer, Button } from '../../components'
import { Page } from '../Page'
import { Navigation, DeviceUtil } from '../../utils'
import './Article.sass'

interface ArticleProps {
    article?: ArticleInterface
    isPreview?: boolean
}

export class Article extends Page<ArticleProps> {

    constructor(props:any) {
        super(props)
        DeviceUtil.onReady(() => {
            $('.article.container').css('opacity', 0)
            $('.article.container').animate({
                opacity: 1
            }, 250)
        })
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
    }

    public renderDesktop = ():ReactNode => {
        const { article, isPreview } = this.props
        return (
            <Wrapper className={'w-100'}>
                <View className={`article-image-container article-image-container-cover w-100`}>
                    <CacheImage className={`article-image w-100 h-100`} src={article.image} alt={article.title} />
                </View>
                <View className={'article-container-offset bg-white'}>
                    <View className={'article container'}>
                        <View className={'mt-4 pt-4'}>
                            {
                                !isPreview &&
                                <Button
                                    onClick={() => Navigation.go('/')}
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
                                <ReactMarkdown
                                    source={article.body}
                                    escapeHtml={false}
                                    renderers={{
                                        heading: props => <View {...props} className={'font-header weight-bold'} style={{ fontSize: `${1.2 + 1/props.level}em` }} />,
                                        hr: () => <View className={'article-line bg-light w-100 mt-4 mb-3'} />,
                                    }}
                                />
                            </View>
                            <Footer />
                        </View>
                    </View>
                </View>
            </Wrapper>
        )
    }

    public renderMobile = ():ReactNode => {
        return (
            null
        )
    }

    public static defaultProps = {
        isPreview: false
    }

}