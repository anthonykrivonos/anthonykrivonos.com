import React, { Component, CSSProperties } from 'react'

export interface ViewProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    children?: any
    inline?: boolean
}

export class View extends Component<ViewProps> {

    public state = {
        inline: false
    }

    public componentDidMount() {
        if (this.props.inline) {
            this.setState({ inline: true })
        }
    }

    public render = () => {
        const props: any = Object.assign({}, this.props)
        delete props.inline
        return (
            this.state.inline ? <span {...props} /> : <div {...props} />
        )
    }

    public static defaultProps = {
        style: {},
    }

}