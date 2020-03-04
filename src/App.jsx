import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFound from "./components/common/NotFound";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/not-found" component={NotFound} />
            {/* <Route
              path="/movies"
              render={props => <ShowMovies {...props} user={currentUser} />}
            /> */}
            {/* <Route path="/register" component={RegisterForm} /> */}
            {/* <Redirect from="/" exact to="/movies" /> */}
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
