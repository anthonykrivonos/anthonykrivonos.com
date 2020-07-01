export class Navigation {
	
	public static go = (url:string, newTab:boolean|null = false, replace:boolean|null = false, title:string|null = null) => {
        if (replace) {
            window.history.pushState({}, '', url)
        } else {
            if (newTab) {
                window.open(url, '_blank')
            } else {
                window.location.href = url
            }
        }
        title && Navigation.setTitle(title)
    }
	
	public static getPath = () => {
        return window.location.pathname
    }

    public static setTitle = (title: string) => {
        document.title = title
    }

}
