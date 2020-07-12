import React, { Component} from 'react'

import { View } from '../view'
import './Footer.sass'
import { addClasses } from '../../constants'

interface FooterProps {
    isMobile?: boolean
}

export class Footer extends Component<FooterProps> {

    public render = () => {
        const isMobile = this.props.isMobile
        return (
            <View className={addClasses('footer d-flex align-items-center justify-content-center w-100 text-center color-medium', isMobile ? 'mobile' : '')}>
                <View>
                    <span role="img" aria-label="rocket">🚀</span> Designed and Developed by Anthony Krivonos in {new Date().getFullYear()}
                </View>
            </View>
        )
    }

}