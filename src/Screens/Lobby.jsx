import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from "react-router-dom";

class Lobby extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.location.state.Email}</h1>
        <h1>{this.props.location.state.Password}</h1>
      </div>
    );
  }
}
export default withRouter(Lobby);
