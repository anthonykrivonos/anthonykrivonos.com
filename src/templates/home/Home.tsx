import React, { ReactNode } from 'react'
import $ from 'jquery'

import { View, Wrapper, NavigationBar, ArticlePost, Footer } from '../../components'
import { Splash } from './components'
import { Article } from '../../models'
import { Page } from '../Page'
import { DeviceUtil } from '../../utils'
import './Home.sass'

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
        const articles:Article[] = this.props.articles
        return (
            <Wrapper>
                <View className={'home container pt-4 pb-4'}>
                    <NavigationBar />
                    <Splash />
                    <View className={'mt-4 mb-4 pt-4 pb-4'}>
                        {
                            articles.map((article, i) => (
                                <ArticlePost
                                    key={`post-${i}`}
                                    article={article}
                                    side={i % 2 === 0 ? 'left' : 'right'}
                                />
                            ))
                        }
                    </View>
                    <Footer />
                </View>
            </Wrapper>
        )
    }

    public renderMobile = ():ReactNode => {
        const articles:Article[] = this.props.articles
        return (
            <Wrapper>
                <View className={'home container-fluid pt-4 pb-4 p'}>
                    <NavigationBar />
                    <View className={'mt-4 mb-4'}><Splash isMobile={true} /></View>
                    <View className={'mt-4 mb-4 pt-4 pb-4'}>
                        {
                            articles.map((article, i) => (
                                <ArticlePost
                                    key={`post-${i}`}
                                    article={article}
                                    side={'mobile'}
                                />
                            ))
                        }
                    </View>
                    <Footer isMobile={true} />
                </View>
            </Wrapper>
        )
    }

}
