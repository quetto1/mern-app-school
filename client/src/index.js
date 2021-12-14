import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import WishRoute from "./components/wishRoute/WishRoute.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Router handles switching out and displaying different views in the APP
import Navigation from "./components/navigation/Navigation.js";
import AddWishRoute from "./components/addWishRoute/AddWishRoute.js";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation></Navigation>

      <Switch>
        <Route exact path="/">
          <App />
        </Route>

        <Route path="/add-wish-route">
          <AddWishRoute />
        </Route>

{/* ThisRoute has to go to the bottom */}
        <Route path="/:id">
          <WishRoute></WishRoute>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
