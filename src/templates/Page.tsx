import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from '@reach/router'
import { DeviceUtil } from '../utils'

export class Page<T=any> extends Component<RouteComponentProps<T>> {

    private id!:number

    constructor(props:any) {
        super(props)
        this.id = Date.now()
        this.render = this.renderResponsive
        DeviceUtil.onResize(() => {
            const isDesktop = DeviceUtil.isM()
            if (this.state.isDesktop !== isDesktop) {
                this.setState({ isDesktop })
            }
        })
    }

    public componentDidMount = () => {
        console.clear()
    }

    public componentDidUpdate = () => {
        console.clear()
    }

    public state = {
        isDesktop: null
    } as any

    public renderDesktop = ():ReactNode => {
        return null
    }

    public renderMobile = ():ReactNode => {
        return null
    }

    private renderResponsive = ():ReactNode => {
        const desktopContent = this.renderDesktop()
        const mobileContent = this.renderMobile()

        if (desktopContent && DeviceUtil.isM()) {
            return desktopContent
        } else if (mobileContent) {
            return mobileContent
        } else {
            return null
        }
    }

}
