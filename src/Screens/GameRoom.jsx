import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
} from "react-router-dom";

class GameRoom extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.location.state.nick}</h1>
        <h1>{this.props.location.state.room}</h1>
      </div>
    );
  }
}
export default withRouter(GameRoom);
