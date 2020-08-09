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
            if (this.state.isDesktop == null || this.state.isDesktop !== isDesktop) {
                this.setState({ isDesktop })
            }
        })
    }

    public renderDesktop = ():ReactNode => null

    public renderMobile = ():ReactNode => null

    private renderResponsive = ():ReactNode => {
        if (this.state.isDesktop === true) {
            const desktopContent = this.renderDesktop()
            if (desktopContent) {
                return desktopContent
            }
        } else if (this.state.isDesktop === false) {
            const mobileContent = this.renderMobile()
            if (mobileContent) {
                return mobileContent
            }
        }
        return null
    }

}
