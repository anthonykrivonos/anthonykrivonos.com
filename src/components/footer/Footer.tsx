import React, { Component} from 'react'

import { View } from '../view'
import './Footer.sass'

export class Footer extends Component {

    public render = () => {
        return (
            <View className={'footer d-flex align-items-center justify-content-center w-100 text-center color-medium'}>
                <View>
                    <span role="img" aria-label="rocket">🚀</span> Designed and Developed by Anthony Krivonos in {new Date().getFullYear()}
                </View>
            </View>
        )
    }

}