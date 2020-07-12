import React, { Component } from 'react'

import { View } from '../../../components'

import './Splash.sass'
import { addClasses } from '../../../constants/util';

interface SplashProps {
    isMobile?: boolean
}

export class Splash extends Component<SplashProps> {

    public render = () => {
        const isMobile = this.props.isMobile
        return (
            <View className={'splash-container d-flex flex-row align-items-center'}>
                <View className={addClasses('font-title weight-bold', isMobile ? 'h1' : 'display-4')}>
                    Design-oriented developer obsessed with <View inline className={'font-italic'}>solving people’s problems</View>.
                </View>
            </View>
        )
    }

}