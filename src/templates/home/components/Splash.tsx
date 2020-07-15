import React, { Component } from 'react'

import { View } from '../../../components'

import './Splash.sass'
import { addClasses } from '../../../constants'

interface SplashProps {
    isMobile?: boolean
}

export class Splash extends Component<SplashProps> {

    public render = () => {
        const isMobile = this.props.isMobile
        return (
            <View className={'splash-container d-flex flex-row align-items-center font-title weight-bold'}>
                <View className={isMobile ? 'h1 weight-regular' : 'display-4 weight-regular'}>
                    Design-oriented developer obsessed with <View inline className={'font-italic'}>solving people’s problems</View>.
                </View>
            </View>
        )
    }

}