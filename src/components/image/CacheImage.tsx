import React, { Component, CSSProperties } from 'react'
import { ImgProps } from 'react-image'

export interface CacheImageProps extends ImgProps {
    src: string
    alt: string
    className?: string
    style?: CSSProperties
}

export class CacheImage extends Component<CacheImageProps> {

    public render = () => {
        const src = (this.props as any).src
        return (
            <img {...this.props} src={src} />
        )
    }

    public static defaultProps = {
        style: {}
    }

}