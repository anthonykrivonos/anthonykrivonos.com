const $ = require("jquery")

export const onInitialClientRender = () => {
    $(document).ready(() => {
        console.log(`Welcome!`)
    })
}