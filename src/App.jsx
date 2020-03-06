import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFound from "./components/common/NotFound";
import ShowPlaylist from "./components/ShowPlaylist";
import PlayerControls from "./components/PlayerControls";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
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
        </main>
        <PlayerControls />
      </React.Fragment>
    );
  }
}

export default App;