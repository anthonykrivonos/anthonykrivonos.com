import React, { Component } from 'react'
import { StaticQuery, graphql } from 'gatsby'

import { View } from '../view'
import { CacheImage } from '../image'
import { URL } from '../../models'
import { Button } from '../button'
import { Navigation } from '../../utils'
import { colors } from '../../constants'

interface NavigationBarProps {
    data?: any
}

export class NavigationBar extends Component<NavigationBarProps> {

    public render = () => {
        return (
            <View className={'d-flex justify-content-start align-items-center'}>
                <View className={'mr-3'}>
                    <CacheImage style={{ width: '3em' }} src={'img/logo.png'} alt={'Logo'} />
                </View>
                <View>
                    <View className={'font-title weight-black h4 mt-3'}>
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
                            <View>
                                {
                                    data.allMarkdownRemark.edges.map(edge => ({
                                        name: edge.node.frontmatter.title,
                                        src: edge.node.frontmatter.url,
                                    }) as URL).map(url => (
                                        <Button
                                            key={url.name}
                                            text={url.name}
                                            onClick={() => Navigation.go(url.src)}
                                            textColor={colors.medium}
                                            className={'mr-2'}
                                        />
                                    ))
                                }
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }

}
