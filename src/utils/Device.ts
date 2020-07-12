import $ from 'jquery'

export enum DeviceSize {
    
    LARGE = 1199.98,
    MEDIUM = 991.98,
    SMALL = 767.98,
    X_SMALL = 575.98,

}

export class DeviceUtil {

    public static getWidth = ():number => {
        if (typeof window !== 'undefined') {
            return window.innerWidth
        }
        return 0
    }

    public static getHeight = ():number => {
        if (typeof window !== 'undefined') {
            return window.innerHeight
        }
        return 0
    }

    public static isXL = ():boolean => {
        return DeviceUtil.getWidth() > DeviceSize.LARGE
    }

    public static isL = ():boolean => {
        return DeviceUtil.getWidth() > DeviceSize.MEDIUM
    }

    public static isM = ():boolean => {
        return DeviceUtil.getWidth() > DeviceSize.SMALL
    }

    public static isS = ():boolean => {
        return DeviceUtil.getWidth() > DeviceSize.X_SMALL
    }

    public static onReady = (func:()=>void):void => {
        if (typeof document !== 'undefined') {
            $(document).ready(() => func())
        }
    }

    public static onResize = (func:(width:number, height:number)=>void):void => {
        if (typeof window !== 'undefined') {
            $(window).resize(() => func(DeviceUtil.getWidth(), DeviceUtil.getHeight()))
        }
    }

}