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
            <View onClick={onClick} className={'anchor-container position-relative clickable d-flex flex-row'} onMouseOver={this.onHover} onMouseOut={this.onHoverOut}>
                {
                    children.split(' ').map((word, i) => (
                        <View>
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
        this.setState({ underlined: true })
    }

    private onHoverOut = () => {
        this.setState({ underlined: false })
    }

    public static defaultProps = {
        underlineColor: colors.quaternary,
    }

}