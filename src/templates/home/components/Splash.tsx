import React, { Component } from 'react'

import { View } from '../../../components'

import './Splash.sass'

export class Splash extends Component {

    public render = () => {
        return (
            <View className={'splash-container d-flex flex-row align-items-center font-title weight-bold'}>
                <View className={'h1'}>
                    <View className={'weight-regular'}>
                        Design-oriented developer obsessed with <View inline className={'font-italic'}>solving people’s problems.</View>
                    </View>
                </View>
            </View>
        )
    }

}