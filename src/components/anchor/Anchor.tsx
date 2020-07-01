import React, { Component } from 'react'

import { View } from '../view'
import { colors, addClasses } from '../../constants'
import { ViewProps } from '../view'

import './Anchor.sass'

export interface AnchorProps extends ViewProps {
    underlineColor?: string
    href?: string
    children: string
}

export class Anchor extends Component<AnchorProps> {

    public state = {
        underlined: false
    }

    public render = () => {
        const { children, className, underlineColor, href, onClick } = this.props
        const { underlined } = this.state
        return (
            <View onClick={onClick} className={'anchor-container position-relative clickable'} onMouseOver={this.onHover} onMouseOut={this.onHoverOut}>
                {
                    children.split('').map((char, i) => (
                        <View key={`${children}-${char}-${i}`} className={'position-relative'} inline>
                            <View inline className={addClasses(className || '', 'm-0 p-0')}>{char}</View>
                            { underlined && <View inline style={{ backgroundColor: underlineColor }} className={'anchor-underline w-100'}></View> }
                        </View>
                    ))
                }
            </View>
        )
    }

    private onHover = () => {
        this.setState({ underlined: true })
    }

    private onHoverOut = () => {
        this.setState({ underlined: false })
    }

    public static defaultProps = {
        underlineColor: colors.quaternary,
    }

}