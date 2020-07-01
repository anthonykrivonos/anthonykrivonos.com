import React, { Component } from 'react'
import * as t from 'prop-types'
import { colors } from '../../constants'
import { ReactSVG } from 'react-svg'

export class Icon extends Component {

    public static propTypes = {
        name: t.string.isRequired,
        fill: t.string,
        width: t.oneOfType([ t.string, t.number ]),
        height: t.oneOfType([ t.string, t.number ]),
        className: t.string,
        viewBox: t.string,
        onClick: t.func,
    }

    public static defaultProps = {
        fill: colors.white,
        width: 40,
        height: 40,
        onClick: () => {},
    }

    public render() {
        const { name, fill, width, height, className, onClick } = this.props as any
        return (
            <ReactSVG
                src={`assets/${name}`}
                afterInjection={(error, svg) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                }}
                beforeInjection={(svg) => {
                    svg.classList.add(className)
                    svg.setAttribute('fill', fill)
                    svg.setAttribute('width', width)
                    svg.setAttribute('height', height)
                }}
                evalScripts="always"
                fallback={() => <span>Error!</span>}
                loading={() => <span>Loading</span>}
                renumerateIRIElements={false}
                wrapper="span"
                className="wrapper-class-name"
                onClick={onClick}
            />
        )
    }



}