import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from "react-router-dom";
import landingScreen from "./Screens/LandingScreen";
import Lobby from "./Screens/Lobby";
import Accounts from "./Screens/Accounts";
import GameRoom from "./Screens/GameRoom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={landingScreen} />
          <Route path="/Lobby" exact component={Lobby} />
          <Route path="/Accounts" exact component={Accounts} />
          <Route path="/GameRoom" exact component={GameRoom} />
        </Switch>
      </Router>
    );
  }
}
export default App;
