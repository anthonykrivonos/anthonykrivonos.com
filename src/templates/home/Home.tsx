import React, { ReactNode } from 'react'
import $ from 'jquery'

import { View, NavigationBar, ArticlePost, Footer } from '../../components'
import { Splash } from './components'
import { Article } from '../../models'
import { Page } from '../Page'
import { DeviceUtil } from '../../utils'
import './Home.sass'

const ARTICLES = [
    {
        title: 'ArticleArticleArticleArticleArticleArticleArticleArticle',
        subtitle: 'Sub',
        caption: 'Summer 2020',
        image: 'https://images.ctfassets.net/vz6nkkbc6q75/6thgltfrjwh0Ote53T0tO3/704777ab2e4c827d75edb57a8bf50d38/Tabs-Hero_402x.jpg?w=2000&fm=jpg',
        tags: [ 'Backend', 'Golang', 'Maps' ],
        body: '',
        slug: 'article-slug',
    }
] as Article[]

export class Home extends Page {

    constructor(props:any) {
        super(props)
        DeviceUtil.onReady(() => {
            $('.home.container').css('opacity', 0)
            $('.home.container').animate({
                opacity: 1
            }, 250)
        })
    }

    public renderDesktop = ():ReactNode => {
        return (
            <View className={'home container pt-4 pb-4'}>
                <NavigationBar />
                <Splash />
                <View className={'mt-4 mb-4 pt-4 pb-4'}>
                    {
                        ARTICLES.map((article, i) => (
                            <ArticlePost
                                key={`article-${i}`}
                                article={article}
                                side={i % 2 === 0 ? 'left' : 'right'}
                            />
                        ))
                    }
                </View>
                <Footer />
            </View>
        )
    }

    public renderMobile = ():ReactNode => {
        return (
            null
        )
    }

}


