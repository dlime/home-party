import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFound from "./components/common/NotFound";
import ShowPlaylist from "./components/ShowPlaylist";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/not-found" component={NotFound} />
          <Route path="/playlist" component={ShowPlaylist} />
          {/* <Route
              path="/movies"
              render={props => <ShowMovies {...props} user={currentUser} />}
            /> */}
          {/* <Route path="/register" component={RegisterForm} /> */}
          <Redirect from="/" exact to="/playlist" />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
