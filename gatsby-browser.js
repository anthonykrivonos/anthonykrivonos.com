const $ = require("jquery")

export const onInitialClientRender = () => {
    $(document).ready(() => {
        console.log(`Welcome to the greatest portfolio website on earth, bro!`)
    })
}