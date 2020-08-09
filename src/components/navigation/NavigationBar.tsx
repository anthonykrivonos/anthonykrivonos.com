import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { View } from '../view'
import { CacheImage } from '../image'
import { URL } from '../../models'
import { Button } from '../button'
import { Navigation } from '../../utils'
import { colors } from '../../constants'
import { Anchor } from '../anchor/Anchor';

interface NavigationBarProps {
    data?: any
}

export class NavigationBar extends Component<NavigationBarProps> {

    state = {
        mouseOver: false,
        currentRotation: 0,
    }

    public render = () => {
        const { currentRotation, mouseOver } = this.state
        return (
            <View className={'d-flex justify-content-start align-items-center'}>
                <View className={'mr-4'}>
                    <CacheImage onMouseEnter={() => this.setState({ mouseOver: true })} onMouseLeave={() => { this.setState({ mouseOver: false }); this.rotate()} } style={{ width: '5em', borderRadius: '2.5em', filter: `${mouseOver ? 'sepia() ' : ''}hue-rotate(${currentRotation}deg)` }} src={'img/pro.jpg'} alt={'Logo'} />
                </View>
                <View>
                    <View className={'font-title weight-black h4 mt-2'}>
                        Anthony Krivonos
                    </View>
                    <StaticQuery
                        query={graphql`
                            query {
                                allMarkdownRemark(filter: {frontmatter: {templateKey: {ne: "article"}}}, sort: {fields: frontmatter___priority}) {
                                    edges {
                                        node {
                                            frontmatter {
                                                title
                                                url
                                            }
                                        }
                                    }
                                }
                            }
                        `}
                        render={data => (
                            <View className={'d-flex align-items-left'}>
                                {
                                    data.allMarkdownRemark.edges.map(edge => ({
                                        name: edge.node.frontmatter.title,
                                        src: edge.node.frontmatter.url,
                                    }) as URL).map(url => (
                                        <View className={'mr-2'}>
                                            <Anchor key={url.name} onClick={() => Navigation.go(url.src)} className={'color-medium'}>{url.name}</Anchor>
                                        </View>
                                    ))
                                }
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }

    private rotate = () => {
        const currentRotation = Math.floor(Math.random() * 360) + 1
        this.setState({ currentRotation })
    }

}
