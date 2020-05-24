import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFound from "./components/common/NotFound";
import ShowPlaylist from "./components/ShowPlaylist";
import WorkInProgress from "./components/common/WorkInProgress";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/work-in-progress" component={WorkInProgress} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/playlist" component={ShowPlaylist} />
          <Redirect from="/" exact to="/playlist" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
