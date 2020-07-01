import React, { Component } from "react";
import { Router } from "@reach/router"

import { Home, Article } from '../templates'

export class App extends Component {
	public render = () => {
		return (
			<Router>
                <Home path={'/'}/>
                <Article path={'/article/:slug'}/>
			</Router>
		)
	}
}

export default App