const React = require("react")

export const onRenderBody = ({ setHeadComponents }, pluginOptions) => {
    setHeadComponents([
        <script
            src="https://code.jquery.com/jquery-3.5.1.min.js"
            integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
            crossOrigin="anonymous">
        </script>
    ])
}