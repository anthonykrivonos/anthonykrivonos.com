import React, { Component, CSSProperties } from 'react'

export interface ViewProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: any
    inline?: boolean
}

export class View extends Component<ViewProps> {

    public render = () => {
        const props:ViewProps = Object.assign({}, this.props)
        const style:CSSProperties = Object.assign({}, this.props.style)
        if (this.props.inline){
            style.display = 'inline'
        }
        props.inline = undefined
        return (
            <div {...props} style={style} />
        )
    }

    public static defaultProps = {
        style: {},
    }

}