export class Shout {

    /**
     * Broadcast a Shout with keyword arguments.
     */
    public static publish = (name:string, kwargs:any = {}) => {
        const event = new CustomEvent(name, kwargs)
        window.dispatchEvent(event)
    }

    /**
     * Listen to a Shout with a certain name and perform the callback when it occurs.
     */
    public static subscribe = (name:string, callback:(kwargs:any)=>void) => {
        window.addEventListener(name, callback)
    }

}