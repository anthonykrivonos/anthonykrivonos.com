import React, { Component } from 'react'

import { View } from '../view'
import { colors, addClasses } from '../../constants'
import { ViewProps } from '../view'

import './Anchor.sass'
import { getRandomColor } from '../../constants/colors';

export interface AnchorProps extends ViewProps {
    href?: string
    children: string
}

export class Anchor extends Component<AnchorProps> {

    public state = {
        underlined: false,
        underlineColor: colors.primary,
    }

    public render = () => {
        const { children, className, href, onClick } = this.props
        const { underlined, underlineColor } = this.state
        return (
            <View onClick={onClick} className={'anchor-container position-relative clickable d-flex flex-row'} onMouseOver={this.onHover} onMouseOut={this.onHoverOut}>
                {
                    children.split(' ').map((word, i) => (
                        <View key={`outer-${word}-${i}`}>
                            {
                                word.split('').map((char, j) => (
                                    <View key={`inner-${char}-${j}`} className={'position-relative'} inline>
                                        <View inline className={addClasses(className || '', 'm-0 p-0')}>{char}</View>
                                        { underlined && <View style={{ backgroundColor: underlineColor }} className={'anchor-underline w-100'}></View> }
                                    </View>
                                ))
                            }
                            {
                                i !== children.length - 1 &&
                                <View inline>
                                    <View key={`inner-space-${i}`} className={'position-relative'} inline>
                                        <View inline className={addClasses(className || '', 'm-0 p-0')}>&nbsp;</View>
                                    </View>
                                </View>
                            }
                        </View>
                    ))
                }
            </View>
        )
    }

    private onHover = () => {
        this.setState({ underlined: true, underlineColor: getRandomColor() })
    }

    private onHoverOut = () => {
        this.setState({ underlined: false })
    }

}