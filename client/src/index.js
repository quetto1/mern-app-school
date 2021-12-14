import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WishRoute from "./components/wishRoute/WishRoute.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Router handles switching out and displaying different views in the APP
import Navigation from "./components/navigation/Navigation.js"

ReactDOM.render(
  
  <React.StrictMode>
    <Router>
    <Navigation></Navigation>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:id">
          <WishRoute />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
