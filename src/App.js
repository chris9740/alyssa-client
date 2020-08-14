import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Home from "./containers/Home/Home";
import Commands from "./containers/Commands/Commands";
import Verify from "./containers/Verify/Verify";

class App extends Component {
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/commands" component={Commands} />
					<Route path="/verify/:token" component={Verify} />
					<Route path="/discord" component={() => {
						window.location.href = "https://discord.gg/efBrHS";
						return null;
					}} />
					<Route render={() => <h1>404 not found</h1>} />
				</Switch>
			</Layout>
		)
	}
}

export default App;