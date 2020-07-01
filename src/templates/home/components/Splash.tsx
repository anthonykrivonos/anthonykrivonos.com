import React, { Component } from 'react'

import { View } from '../../../components'

import './Splash.sass'

export class Splash extends Component {

    public render = () => {
        return (
            <View className={'splash-container d-flex flex-row align-items-center'}>
                <View className={'font-title weight-bold display-4'}>
                    Design-oriented developer obsessed with <View inline className={'font-italic'}>solving people’s problems</View>.
                </View>
            </View>
        )
    }

}