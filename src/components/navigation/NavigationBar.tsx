import React, { Component } from 'react'

import { View } from '../view'
import { CacheImage } from '../image'
import { URL } from '../../models'
import { Button } from '../button'
import { Navigation } from '../../utils'
import { colors } from '../../constants'

const URLS = [
    {
        name: 'Resume',
        src: ''
    },
    {
        name: 'GitHub',
        src: 'https://github.com/anthonykrivonos'
    },
    {
        name: 'LinkedIn',
        src: 'https://linkedin.com/in/anthonykrivonos'
    },
    {
        name: 'Dribbble',
        src: 'https://dribbble.com/anthonykrivonos'
    },
] as URL[]

export class NavigationBar extends Component {

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
                    <View>
                        {
                            URLS.map(url => (
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
                </View>
            </View>
        )
    }

}