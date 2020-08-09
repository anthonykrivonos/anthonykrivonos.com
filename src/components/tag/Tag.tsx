import React, { Component } from 'react'

import { View } from '../view'

export interface TagProps {
    name: string
}

export class Tag extends Component<TagProps> {

    public render = () => {
        const { name } = this.props
        return (
            <View className={'article-tag bg-light p-2 mt-1 mb-1 mr-2 unselectable d-flex'}>
                <View inline className={'font-bold text-upper h7'}>{name}</View>
            </View>
        )
    }

    public static defaultProps = {
        style: {}
    }

}