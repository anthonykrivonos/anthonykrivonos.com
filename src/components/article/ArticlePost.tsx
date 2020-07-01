import React, { Component } from 'react'

import { Article } from '../../models'

import { Anchor } from '../anchor'
import { View } from '../view'
import { CacheImage } from '../image'
import { Tag } from '../tag'

import './ArticlePost.sass'
import { addClasses } from '../../constants'
import { Navigation } from '../../utils'

export interface ArticleProps {
    side: 'left' | 'right'
    article: Article
}

export class ArticlePost extends Component<ArticleProps> {

    private imageId:number

    constructor(props:any) {
        super(props)
        this.imageId = Date.now()
    }

    public state = {
        isTransitioning: false,
    }

    public componentDidMount = () => {
        $('.article-image-container').on('dragstart', () => false)
    }

    public render = () => {
        const { article, side } = this.props
        return (
            <View className={'article-container'}>
                <View className={addClasses('row d-flex', side === 'left' ? 'flex-row' : 'flex-row-reverse')}>
                    <View className={'col-md-4 pr-4'}>
                        <Anchor onClick={this.openArticle} className={'font-header weight-black h2'}>{article.title}</Anchor>
                        <View className={'article-line bg-light mt-4 mb-3'} />
                        <View className={'font-title weight-bold h5'}>{article.subtitle}</View>
                        { article.caption && <View className={'text-upper weight-bold font-italic color-light'}>{article.caption}</View> }
                        <View className={'mt-3'}>
                            {
                                article.tags.map(tag => (
                                    <Tag key={`tag-${tag}`} name={tag} />
                                ))
                            }
                        </View>
                    </View>
                    <View className={'col-md-8 d-flex align-items-center justify-content-center'}>
                        <View  onMouseOver={this.onHover} onMouseOut={this.onHoverOut} onMouseDown={this.onClick} onMouseUp={this.onClickUp} className={`article-image-container article-image-${this.imageId} w-100`}>
                            <CacheImage className={`article-image article-image-${this.imageId} w-100 h-100`} src={article.image} alt={article.title} />
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    private onHover = () => {
        if (!this.state.isTransitioning) {
            $(`.article-image.article-image-${this.imageId}`).toggleClass('article-image-scaled', true)
        }
    }

    private onHoverOut = () => {
        if (!this.state.isTransitioning) {
            $(`.article-image.article-image-${this.imageId}`).toggleClass('article-image-scaled', false)
        }
    }

    private onClick = () => {
        const container = $(`.article-image-container.article-image-${this.imageId}`)
        container.toggleClass('article-image-clicked', true)
        this.openArticle()
    }

    private openArticle = () => {
        this.setState({ isTransitioning: true }, () => {
            $(`.article-image.article-image-${this.imageId}`).toggleClass('article-image-scaled', false)

            const container = $(`.article-image-container.article-image-${this.imageId}`)
            const containerCopy = container.clone()
            $(document.body).prepend(containerCopy)

            const containerBoundingBox = container.get()[0].getBoundingClientRect()
            containerCopy.css({
                position: 'fixed',
                left: `${containerBoundingBox.left}px`,
                top: `${containerBoundingBox.top}px`,
                height: `${containerBoundingBox.height}px`,
                width: `${containerBoundingBox.width}px`,
                'z-index': '2',
            })

            container.css({
                opacity: 0
            })

            containerCopy.animate({
                top: 0,
                left: 0,
                width: '100%',
                opacity: 1,
                borderRadius: 0
            }, 500)

            // Animate the page container
            $('.container').animate({
                opacity: 0,
            }, 500)

            setTimeout(() => Navigation.go(`/${this.props.article.slug}`), 500)
        })
    }

    private onClickUp = () => {
        $(`.article-image-container.article-image-${this.imageId}`).toggleClass('article-image-clicked', false)
    }

    public static defaultProps = {
        style: {},
        side: 'left',
    }

}