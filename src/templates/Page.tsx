import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from '@reach/router'
import { DeviceUtil } from '../utils'

export class Page<T=any> extends Component<RouteComponentProps<T>> {

    public state = {
        isDesktop: null
    } as any

    constructor(props:any) {
        super(props)
        this.render = this.renderResponsive
        DeviceUtil.onReady(() => {
            const isDesktop = DeviceUtil.isM()
            this.setState({ isDesktop })
        })
        DeviceUtil.onResize(() => {
            const isDesktop = DeviceUtil.isM()
            if (!this.state.isDesktop || this.state.isDesktop !== isDesktop) {
                this.setState({ isDesktop })
            }
        })
    }

    public renderDesktop = ():ReactNode => null

    public renderMobile = ():ReactNode => null

    private renderResponsive = ():ReactNode => {
        const desktopContent = this.renderDesktop()
        const mobileContent = this.renderMobile()

        if (desktopContent && this.state.isDesktop) {
            return desktopContent
        } else if (mobileContent && this.state.isDesktop === false) {
            return mobileContent
        } else {
            return null
        }
    }

}
