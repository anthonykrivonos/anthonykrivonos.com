import React, { Component } from 'react'

import { View } from '../view'

export interface TagProps {
    name: string
}

export class Tag extends Component<TagProps> {

    public render = () => {
        const { name } = this.props
        return (
            <View inline className={'article-tag bg-light p-2 pt-2 pb-2 mr-2 unselectable'}>
                <View inline className={'font-bold text-upper h7'}>{name}</View>
            </View>
        )
    }

    public static defaultProps = {
        style: {}
    }

}